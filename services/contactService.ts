import { z } from "zod";
import { toast } from "react-hot-toast";
import { RefObject } from "react"; 
import { ContactPayload } from "../types";


//
const COOLDOWN_DURATION = 5 * 60 * 1000
const STORAGE_KEY =  "fn_last_submit_time"

// FORM SANITIZATION SCHEMA DEFINITION
export const contactValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚüÜ]*$/, { message: "Name can only contain letters and spaces." }),
  email: z
    .email({ message: "Please enter a valid email address." }),
  target_channel: z
    .enum(["telegram", "slack", "email", "discord"], { message: "Invalid target channel." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." })
});

interface SubmitFormOptions {
  formData: FormData;
  setStatus: (status: "idle" | "loading" | "success" | "error") => void;
  formRef: RefObject<HTMLFormElement | null>;
}

/**
 * Isolated business logic execution block handling input parsing, validation, and network transport
 */
export const executeFormSubmission = async ({ formData, setStatus, formRef }: SubmitFormOptions) => {
  setStatus("loading");
  const loadingToastId = toast.loading("Processing your message...");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

  if (!apiUrl) {
    setStatus("error");
    toast.error("Configuration Error: API Gateway URL is missing.", { id: loadingToastId });
    return;
  }

   const lastSubmitTime = localStorage.getItem(STORAGE_KEY);
  const currentTime = Date.now();

  if (lastSubmitTime) {
    const timePassed = currentTime - parseInt(lastSubmitTime, 10);
    
    if (timePassed < COOLDOWN_DURATION) {
      const remainingSeconds = Math.ceil((COOLDOWN_DURATION - timePassed) / 1000);
      const remainingMinutes = Math.ceil(remainingSeconds / 60);
      
      setStatus("error");
      toast.error(`Rate Limit: Please wait ${remainingMinutes} more minute(s) before sending another message.`, { id: loadingToastId });
      setTimeout(() => setStatus("idle"), 3000);
      return; 
    }
  }

  // 1. Extract and map raw input data fields
  const rawPayload = {
    name: (formData.get("name")?.toString() || "").trim(),
    email: (formData.get("email")?.toString() || "").trim(),
    target_channel: (formData.get("target_channel")?.toString() || "telegram"),
    message: (formData.get("message")?.toString() || "").trim(),
  };

  // 2. Perform validation checks
  const validationResult = contactValidationSchema.safeParse(rawPayload);

  if (!validationResult.success) {
    const firstErrorMessage = validationResult.error.issues[0]?.message || "Invalid input data.";
    setStatus("error");
    toast.error(`Validation Error: ${firstErrorMessage}`, { id: loadingToastId });
    setTimeout(() => setStatus("idle"), 3000);
    return;
  }

  // 3. Process secure and sanitized payload to API Endpoint
  try {
    const payload: ContactPayload = validationResult.data;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`API Request Failed. Status: ${response.status}`);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    
    setStatus("success");
    toast.success("Message transmitted successfully! I'll get back to you soon.", { id: loadingToastId });
    formRef.current?.reset(); 
    setTimeout(() => setStatus("idle"), 3000);
    
  } catch (error) {
    console.error("Form dispatch failed:", error);
    setStatus("error");
    toast.error("Failed to transmit message. Please try again later.", { id: loadingToastId });
    setTimeout(() => setStatus("idle"), 3000);
  }
};
