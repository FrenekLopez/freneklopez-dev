// DATA TYPES DEFINITIONS
// Standard specifications for core interface entities and transactional payloads


/**
 * Payload interface for incoming contact form inquiries
 */
export interface ContactPayload {
  name: string;
  email: string;
  target_channel: string;
  message: string;
}

/**
 * Standard data structure for categorical chronology (e.g., employment, academic history)
 */
export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

/**
 * Standard configuration properties for showcase elements
 */
export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  githubUrl: string;
}
