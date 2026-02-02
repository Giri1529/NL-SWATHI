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
    if (!db) return undefined;
    const profiles = await db.select().from(profile);
    return profiles[0];
  }

  async getEducation(): Promise<Education[]> {
    if (!db) return [];
    return await db.select().from(education);
  }

  async getExperience(): Promise<Experience[]> {
    if (!db) return [];
    return await db.select().from(experience);
  }

  async getSkills(): Promise<Skill[]> {
    if (!db) return [];
    return await db.select().from(skills);
  }

  async getAwards(): Promise<Award[]> {
    if (!db) return [];
    return await db.select().from(awards);
  }

  async getPublications(): Promise<Publication[]> {
    if (!db) return [];
    return await db.select().from(publications);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    if (!db) throw new Error("Database not available");
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async seedData(): Promise<void> {
    if (!db) return;
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
      orcid: "https://orcid.org/my-orcid?orcid=0000-0002-3695-0732",
      scopus: "https://www.scopus.com/authid/detail.uri?authorId=58336556300",
      researchid: "https://researchid.co/nl.swathi"
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
        link: "https://www.lcebyhkzz.cn//article/view/856/328.php",
        authors: "Swathi NL, et al."
      },
      {
        title: "Personalized Interventions for Managing Diabetes Distress and Improving Glycemic Control",
        journal: "World J Pharm Res",
        year: "2024",
        link: "https://www.wjpr.net/abstract_show/24219",
        authors: "Swathi NL, et al."
      },
      {
        title: "Precision Medicine and Epigenetics: Personalized Diabetes Care",
        journal: "IGI Global",
        year: "2024",
        link: "https://www.igi-global.com/chapter/precision-medicine-and-epigenetics/341073",
        authors: "Swathi NL, et al."
      },
      {
        title: "Targeting the Invasion Protein A from the Type Three Secretion System of Salmonella Typhi",
        journal: "Thesis",
        year: "2024",
        link: "https://zenodo.org/records/10826101",
        authors: "Swathi NL"
      },
      {
        title: "Mindfulness Training for Cardiovascular Health in Type 2 Diabetes",
        journal: "Current Problems in Cardiology",
        year: "2024",
        link: "https://doi.org/10.1016/j.cpcardiol.2024.102833",
        authors: "Gandhi, A., ... Swathi NL."
      }
    ]);
  }
}

export class MemStorage implements IStorage {
  private profile?: Profile;
  private education: Education[] = [];
  private experience: Experience[] = [];
  private skills: Skill[] = [];
  private awards: Award[] = [];
  private publications: Publication[] = [];
  private messages: Message[] = [];
  private nextMessageId = 1;

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async getEducation(): Promise<Education[]> {
    return this.education;
  }

  async getExperience(): Promise<Experience[]> {
    return this.experience;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getAwards(): Promise<Award[]> {
    return this.awards;
  }

  async getPublications(): Promise<Publication[]> {
    return this.publications;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = { ...message, id: this.nextMessageId++, createdAt: new Date() };
    this.messages.push(newMessage);
    return newMessage;
  }

  async seedData(): Promise<void> {
    if (this.profile) return;

    this.profile = {
      id: 1,
      name: "NL. Swathi",
      title: "Pharm D | PhD Scholar",
      bio: "Dedicated researcher specializing in molecular docking, virtual screening, and patient counseling. Experienced in clinical research, epidemiology, and medical writing. Passionate about advancing healthcare through precision medicine and innovative drug design.",
      email: "nlswathi2001@gmail.com",
      location: "Chittoor, Andhra Pradesh, India",
      linkedin: "https://linkedin.com/in/swathi-naraganti-06ba64203",
      orcid: "https://orcid.org/0000-0002-3695-0732",
      scopus: "https://www.scopus.com/authid/detail.uri?authorId=58336556300",
      researchid: "https://researchid.co/nl.swathi"
    };

    this.education = [
      { id: 1, degree: "PhD", institution: "Manipal College of Nursing, Manipal Academy of Higher Education", year: "Current", details: "Manipal, Karnataka, India" },
      { id: 2, degree: "Pharm D (Doctor Of Pharmacy)", institution: "Jawaharlal Nehru Technological University, Anantapuramu", year: "2025", details: "Chittoor, India" },
      { id: 3, degree: "Intermediate BiPc", institution: "Sri Surya Junior College", year: "2016", details: "Completed with 98.3%" }
    ];

    this.experience = [
      { id: 1, role: "Research Mentor and Article Editor", company: "The Good Research Project", period: "June 2024 - Present", description: "Led and coordinated multiple research projects, mentored junior researchers, and managed article review processes." },
      { id: 2, role: "Clinical Research Coordinator", company: "Kairos R and D solutions", period: "Dec 2023 - Present", description: "" },
      { id: 3, role: "Content Writer and Leader", company: "ThinkRoman", period: "Dec 2022 - Present", description: "Produced educational content focused on healthcare and research advancements." },
      { id: 4, role: "Public Health and Epidemiology Research Intern", company: "ICMR-NIE", period: "Oct 2024", description: "Conducted systematic review and meta-analysis in diabetes." },
      { id: 5, role: "Medical Writer and Research Trainee", company: "EJY Health", period: "Oct 2022 - July 2023", description: "" }
    ];

    this.skills = [
      { id: 1, category: "Computational Biology", items: ["Molecular Docking", "Virtual Screening", "Library Preparation", "Systems Biology"] },
      { id: 2, category: "Clinical & Research", items: ["Patient Counseling", "Clinical Research", "Systematic Review", "Epidemiology"] },
      { id: 3, category: "Tools & Software", items: ["SPSS", "SAS Programming", "Bioinformatics Tools", "MS Office"] },
      { id: 4, category: "Communication", items: ["Medical Writing", "Scientific Writing", "Public Speaking", "Project Management"] }
    ];

    this.awards = [
      { id: 1, title: "INSPIRE Award", issuer: "Andhra Pradesh Government", date: "Jul 2017", description: "Awarded to top 1% students after Intermediate Examination" },
      { id: 2, title: "Second Prize in Pharmaceutical Chemistry", issuer: "Bharath University", date: "Sep 2022", description: "Oral Presentation on In Silico Molecular Docking for Mycobacterium Tuberculosis" },
      { id: 3, title: "Rx Doctor Award", issuer: "Rx Doctor", date: "Dec 2023", description: "Honored for outstanding contributions to patient care" },
      { id: 4, title: "First Prize in Patient Information Leaflet", issuer: "International Conference", date: "Dec 2023", description: "Secured first place for creating an innovative patient information leaflet" },
      { id: 5, title: "Academic Excellence Award", issuer: "Sri Surya Junior College", date: "Jul 2017", description: "Top scorer in Intermediate BiPC in Chittoor Range" }
    ];

    this.publications = [
      { id: 1, title: "Review of Pancreatic Cells Trans Differentiation in Diabetes Treatment", journal: "Internet", year: "2022", link: "https://www.lcebyhkzz.cn//article/view/856/328.php", authors: "Swathi NL, et al." },
      { id: 2, title: "Personalized Interventions for Managing Diabetes Distress and Improving Glycemic Control", journal: "World J Pharm Res", year: "2024", link: "https://www.wjpr.net/abstract_show/24219", authors: "Swathi NL, et al." },
      { id: 3, title: "Precision Medicine and Epigenetics: Personalized Diabetes Care", journal: "IGI Global", year: "2024", link: "https://www.igi-global.com/chapter/precision-medicine-and-epigenetics/341073", authors: "Swathi NL, et al." },
      { id: 4, title: "Targeting the Invasion Protein A from the Type Three Secretion System of Salmonella Typhi", journal: "Thesis", year: "2024", link: "https://zenodo.org/records/10826101", authors: "Swathi NL" },
      { id: 5, title: "Mindfulness Training for Cardiovascular Health in Type 2 Diabetes", journal: "Current Problems in Cardiology", year: "2024", link: "https://doi.org/10.1016/j.cpcardiol.2024.102833", authors: "Gandhi, A., ... Swathi NL." }
    ];
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
