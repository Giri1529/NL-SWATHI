import { 
  profile, education, experience, skills, awards, publications, messages,
  type Profile, type Education, type Experience, type Skill, type Award, type Publication, type Message,
  type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getEducation(): Promise<Education[]>;
  getExperience(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getAwards(): Promise<Award[]>;
  getPublications(): Promise<Publication[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Seed methods
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const profiles = await db.select().from(profile);
    return profiles[0];
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getAwards(): Promise<Award[]> {
    return await db.select().from(awards);
  }

  async getPublications(): Promise<Publication[]> {
    return await db.select().from(publications);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async seedData(): Promise<void> {
    const existingProfile = await this.getProfile();
    if (existingProfile) return;

    // Seed Profile
    await db.insert(profile).values({
      name: "NL. Swathi",
      title: "Pharm D | PhD Scholar",
      bio: "Dedicated researcher specializing in molecular docking, virtual screening, and patient counseling. Experienced in clinical research, epidemiology, and medical writing. Passionate about advancing healthcare through precision medicine and innovative drug design.",
      email: "nlswathi2001@gmail.com",
      location: "Chittoor, Andhra Pradesh, India",
      linkedin: "https://linkedin.com/in/swathi-naraganti-06ba64203",
      orcid: "0000-0002-3695-0732",
      scopus: "58336556300"
    });

    // Seed Education
    await db.insert(education).values([
      {
        degree: "PhD",
        institution: "Manipal College of Nursing, Manipal Academy of Higher Education",
        year: "Current",
        details: "Manipal, Karnataka, India"
      },
      {
        degree: "Pharm D (Doctor Of Pharmacy)",
        institution: "Jawaharlal Nehru Technological University, Anantapuramu",
        year: "2025",
        details: "Chittoor, India"
      },
      {
        degree: "Intermediate BiPc",
        institution: "Sri Surya Junior College",
        year: "2016",
        details: "Completed with 98.3%"
      }
    ]);

    // Seed Experience
    await db.insert(experience).values([
      {
        role: "Research Mentor and Article Editor",
        company: "The Good Research Project",
        period: "June 2024 - Present",
        description: "Led and coordinated multiple research projects, mentored junior researchers, and managed article review processes."
      },
      {
        role: "Clinical Research Coordinator",
        company: "Kairos R and D solutions",
        period: "Dec 2023 - Present",
        description: ""
      },
      {
        role: "Content Writer and Leader",
        company: "ThinkRoman",
        period: "Dec 2022 - Present",
        description: "Produced educational content focused on healthcare and research advancements."
      },
      {
        role: "Public Health and Epidemiology Research Intern",
        company: "ICMR-NIE",
        period: "Oct 2024",
        description: "Conducted systematic review and meta-analysis in diabetes."
      },
      {
        role: "Medical Writer and Research Trainee",
        company: "EJY Health",
        period: "Oct 2022 - July 2023",
        description: ""
      }
    ]);

    // Seed Skills
    await db.insert(skills).values([
      {
        category: "Computational Biology",
        items: ["Molecular Docking", "Virtual Screening", "Library Preparation", "Systems Biology"]
      },
      {
        category: "Clinical & Research",
        items: ["Patient Counseling", "Clinical Research", "Systematic Review", "Epidemiology"]
      },
      {
        category: "Tools & Software",
        items: ["SPSS", "SAS Programming", "Bioinformatics Tools", "MS Office"]
      },
      {
        category: "Communication",
        items: ["Medical Writing", "Scientific Writing", "Public Speaking", "Project Management"]
      }
    ]);

    // Seed Awards
    await db.insert(awards).values([
      {
        title: "INSPIRE Award",
        issuer: "Andhra Pradesh Government",
        date: "Jul 2017",
        description: "Awarded to top 1% students after Intermediate Examination"
      },
      {
        title: "Second Prize in Pharmaceutical Chemistry",
        issuer: "Bharath University",
        date: "Sep 2022",
        description: "Oral Presentation on In Silico Molecular Docking for Mycobacterium Tuberculosis"
      },
      {
        title: "Rx Doctor Award",
        issuer: "Rx Doctor",
        date: "Dec 2023",
        description: "Honored for outstanding contributions to patient care"
      },
      {
        title: "First Prize in Patient Information Leaflet",
        issuer: "International Conference",
        date: "Dec 2023",
        description: "Secured first place for creating an innovative patient information leaflet"
      },
      {
        title: "Academic Excellence Award",
        issuer: "Sri Surya Junior College",
        date: "Jul 2017",
        description: "Top scorer in Intermediate BiPC in Chittoor Range"
      }
    ]);

    // Seed Publications (Selected)
    await db.insert(publications).values([
      {
        title: "Review of Pancreatic Cells Trans Differentiation in Diabetes Treatment",
        journal: "Internet",
        year: "2022",
        authors: "Swathi NL, et al."
      },
      {
        title: "Personalized Interventions for Managing Diabetes Distress and Improving Glycemic Control",
        journal: "World J Pharm Res",
        year: "2024",
        authors: "Swathi NL, et al."
      },
      {
        title: "Precision Medicine and Epigenetics: Personalized Diabetes Care",
        journal: "IGI Global",
        year: "2024",
        authors: "Swathi NL, et al."
      },
      {
        title: "Targeting the Invasion Protein A from the Type Three Secretion System of Salmonella Typhi",
        journal: "Thesis",
        year: "2024",
        authors: "Swathi NL"
      },
      {
        title: "Currently Trending and Futuristic Biological Modalities in the Management of Different Types of Diabetes",
        journal: "J Popul Ther Clin Pharmacol",
        year: "2023",
        authors: "Ali A, ... Swathi NL, et al."
      }
    ]);
  }
}

export const storage = new DatabaseStorage();
