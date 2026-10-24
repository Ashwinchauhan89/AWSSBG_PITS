export type RoleCategory =
  | "Leadership"
  | "Technical"
  | "Operations"
  | "Outreach"
  | "Creative";

export interface LearningTopic {
  title: string;
  description: string;
}

export interface PracticalTask {
  title: string;
  objective: string;
  deliverables?: string[];
  awsServices?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: RoleCategory;
  isLead: boolean;
  bio: string;
  linkedinUrl?: string;
  githubUrl?: string;
  avatarUrl?: string;
  institution?: string;
  department?: string;
  year?: string;
  isVacant?: boolean;
  learningPath?: LearningTopic[];
  practicalTask?: PracticalTask;
  specialFocus?: string;
  tags?: string[];
  isAdditional?: boolean;
}


export type EventCategory =
  | "AWS Cloud"
  | "AI & Machine Learning"
  | "Generative AI"
  | "Web Development"
  | "Hackathons"
  | "Career & Community";

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  isOnline: boolean;
  status: "upcoming" | "ongoing" | "past";
  registrationOpen: boolean;
  registrationLink?: string;
  speakerName?: string;
  speakerRole?: string;
  tags: string[];
  capacity?: number;
  coverImage?: string;
  isProposed?: boolean;
}

export type ProjectCategory =
  | "Cloud Computing"
  | "AI & Machine Learning"
  | "Generative AI"
  | "Web Development"
  | "Open Source"
  | "Cybersecurity";

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  coverImage?: string;
  techStack: string[];
  contributors: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  architectureNotes?: string;
}

export type ResourceCategory =
  | "AWS & Cloud Fundamentals"
  | "Cloud Architecture"
  | "AI and Machine Learning"
  | "Generative AI"
  | "Web Development"
  | "DevOps and Deployment"
  | "Open Source and GitHub"
  | "Hackathon Preparation";

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  url: string;
  type: "Official AWS" | "Guide" | "Workshop" | "Interactive Lab" | "Repository" | "Whitepaper";
  isOfficialAws: boolean;
}

export type ApplicationStatus =
  | "Pending"
  | "In Review"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Accepted"
  | "Rejected";

export interface CoreTeamApplication {
  id: string;
  fullName: string;
  collegeEmail: string;
  personalEmail?: string;
  department: string;
  currentYear: string;
  cgpa: number;
  technicalSkills: string;
  preferredPosition: string;
  whyJoin: string;
  projectLinks?: string;
  linkedinUrl?: string;
  status: ApplicationStatus;
  createdAt: string;
  notes?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: string;
  createdAt: string;
  isResolved: boolean;
}
