import {
  TeamMember,
  CommunityEvent,
  StudentProject,
  LearningResource,
  CoreTeamApplication,
  ContactSubmission,
} from "../types";
import {
  INITIAL_TEAM_MEMBERS,
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_RESOURCES,
} from "./initialData";

interface StoreState {
  team: TeamMember[];
  events: CommunityEvent[];
  projects: StudentProject[];
  resources: LearningResource[];
  applications: CoreTeamApplication[];
  contacts: ContactSubmission[];
  storageType: "development-mock" | "postgres";
}

// Initial sample applications so admin dashboard isn't completely empty on first launch
const SAMPLE_APPLICATIONS: CoreTeamApplication[] = [
  {
    id: "app-demo-1",
    fullName: "Rohan Verma",
    collegeEmail: "rohan.v@pitsujjain.ac.in",
    personalEmail: "rohan.codes@gmail.com",
    department: "Computer Science & Engineering",
    currentYear: "2nd Year",
    cgpa: 8.4,
    technicalSkills: "Python, Docker, AWS EC2, S3, FastAPI, Basic Linux administration",
    preferredPosition: "Cloud & AWS Lead",
    whyJoin: "Passionate about cloud architecture and want to conduct hands-on AWS workshops for junior batches at PITS.",
    projectLinks: "https://github.com/rohan-verma/cloud-microservice",
    linkedinUrl: "https://linkedin.com/in/rohanverma",
    status: "Shortlisted",
    createdAt: "2026-10-02T10:15:00Z",
    notes: "Demonstrated good understanding of VPC and containerization during preliminary check.",
  },
  {
    id: "app-demo-2",
    fullName: "Priya Sharma",
    collegeEmail: "priya.s@pitsujjain.ac.in",
    personalEmail: "priya.aiml@gmail.com",
    department: "Computer Science & Engineering (AI/ML)",
    currentYear: "3rd Year",
    cgpa: 8.9,
    technicalSkills: "PyTorch, LangChain, Amazon Bedrock SDK, Hugging Face, Next.js frontend",
    preferredPosition: "AI / Machine Learning Lead",
    whyJoin: "Building LLM agents on Bedrock and excited to mentor students on Generative AI hackathon challenges.",
    projectLinks: "https://github.com/priyasharma/pits-study-agent",
    linkedinUrl: "https://linkedin.com/in/priyasharma-ml",
    status: "In Review",
    createdAt: "2026-10-05T14:30:00Z",
    notes: "Strong project portfolio in Generative AI.",
  },
];

const SAMPLE_CONTACTS: ContactSubmission[] = [
  {
    id: "cnt-demo-1",
    name: "Dr. K. N. Sharma",
    email: "knsharma@pitsujjain.ac.in",
    subject: "Faculty Collaboration for Cloud Bootcamp",
    message: "Interested in coordinating with the AWS Student Builder Group for upcoming semester cloud curriculum labs in CSE department.",
    category: "Academic Collaboration",
    createdAt: "2026-10-04T09:00:00Z",
    isResolved: false,
  },
  {
    id: "cnt-demo-2",
    name: "Aman Gupta",
    email: "aman.g@pitsujjain.ac.in",
    subject: "AWS Certification Voucher Inquiry",
    message: "Wanted to know if student discounts apply for the AWS Certified Cloud Practitioner exam.",
    category: "Certification & Learning",
    createdAt: "2026-10-07T16:20:00Z",
    isResolved: true,
  },
];

// Global singleton in Node runtime to prevent re-initialization during HMR
declare global {
  var __SBG_STORE__: StoreState | undefined;
}

function getStore(): StoreState {
  if (!globalThis.__SBG_STORE__) {
    const isDbConnected = Boolean(process.env.DATABASE_URL);
    globalThis.__SBG_STORE__ = {
      team: [...INITIAL_TEAM_MEMBERS],
      events: [...INITIAL_EVENTS],
      projects: [...INITIAL_PROJECTS],
      resources: [...INITIAL_RESOURCES],
      applications: [...SAMPLE_APPLICATIONS],
      contacts: [...SAMPLE_CONTACTS],
      storageType: isDbConnected ? "postgres" : "development-mock",
    };
  }
  return globalThis.__SBG_STORE__;
}

export const dbService = {
  isConfigured: () => Boolean(process.env.DATABASE_URL),
  getStorageMode: () => getStore().storageType,

  // Applications
  getApplications: async (): Promise<CoreTeamApplication[]> => {
    return [...getStore().applications].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createApplication: async (
    data: Omit<CoreTeamApplication, "id" | "status" | "createdAt">
  ): Promise<CoreTeamApplication> => {
    const store = getStore();
    const newApp: CoreTeamApplication = {
      ...data,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    store.applications.unshift(newApp);
    return newApp;
  },

  updateApplicationStatus: async (
    id: string,
    status: CoreTeamApplication["status"],
    notes?: string
  ): Promise<CoreTeamApplication | null> => {
    const store = getStore();
    const app = store.applications.find((a) => a.id === id);
    if (!app) return null;
    app.status = status;
    if (notes !== undefined) app.notes = notes;
    return app;
  },

  deleteApplication: async (id: string): Promise<boolean> => {
    const store = getStore();
    const index = store.applications.findIndex((a) => a.id === id);
    if (index === -1) return false;
    store.applications.splice(index, 1);
    return true;
  },

  // Events
  getEvents: async (): Promise<CommunityEvent[]> => {
    return [...getStore().events];
  },

  createEvent: async (event: CommunityEvent): Promise<CommunityEvent> => {
    const store = getStore();
    store.events.unshift(event);
    return event;
  },

  updateEvent: async (id: string, updated: Partial<CommunityEvent>): Promise<CommunityEvent | null> => {
    const store = getStore();
    const index = store.events.findIndex((e) => e.id === id);
    if (index === -1) return null;
    store.events[index] = { ...store.events[index], ...updated };
    return store.events[index];
  },

  deleteEvent: async (id: string): Promise<boolean> => {
    const store = getStore();
    const index = store.events.findIndex((e) => e.id === id);
    if (index === -1) return false;
    store.events.splice(index, 1);
    return true;
  },

  // Team
  getTeam: async (): Promise<TeamMember[]> => {
    return [...getStore().team];
  },

  // Projects
  getProjects: async (): Promise<StudentProject[]> => {
    return [...getStore().projects];
  },

  createProject: async (project: StudentProject): Promise<StudentProject> => {
    const store = getStore();
    store.projects.unshift(project);
    return project;
  },

  // Resources
  getResources: async (): Promise<LearningResource[]> => {
    return [...getStore().resources];
  },

  // Contact
  getContacts: async (): Promise<ContactSubmission[]> => {
    return [...getStore().contacts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createContact: async (
    data: Omit<ContactSubmission, "id" | "createdAt" | "isResolved">
  ): Promise<ContactSubmission> => {
    const store = getStore();
    const newContact: ContactSubmission = {
      ...data,
      id: `cnt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      isResolved: false,
    };
    store.contacts.unshift(newContact);
    return newContact;
  },

  toggleContactResolved: async (id: string): Promise<ContactSubmission | null> => {
    const store = getStore();
    const item = store.contacts.find((c) => c.id === id);
    if (!item) return null;
    item.isResolved = !item.isResolved;
    return item;
  },
};
