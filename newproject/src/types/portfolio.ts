export type SkillCategory = 'computer' | 'programming' | 'professional';
export type CertificateCategory = 'course' | 'kaggle';

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  education: boolean;
  skills: boolean;
  documents: boolean;
  certificates: boolean;
  projects: boolean;
  career: boolean;
  contact: boolean;
}

export interface DocumentVisibility {
  show_resume: boolean;
  show_cv: boolean;
  allow_resume_download: boolean;
  allow_cv_download: boolean;
}

export interface ProfileData {
  id: number;
  full_name: string;
  professional_title: string;
  typing_roles: string[];
  hero_summary: string;
  about_bio: string;
  professional_status: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  university: string;
  degree: string;
  admission_year: string;
  expected_graduation: string;
  current_semester: string;
  academic_background: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  workindia_url: string;
  profile_image_url: string;
  resume_url: string;
  cv_url: string;
  target_roles: string[];
  section_visibility: SectionVisibility;
  document_visibility: DocumentVisibility;
  updated_at?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  current_status: string;
  score_label: string;
  stream_or_details: string;
  sort_order: number;
  is_published: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  detail: string;
  sort_order: number;
  is_published: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: CertificateCategory;
  date_label: string;
  duration_label: string;
  description: string;
  image_url: string;
  secondary_image_url?: string;
  primary_image_label?: string;
  secondary_image_label?: string;
  level_label?: string;
  institute_label?: string;
  score_label?: string;
  sort_order: number;
  is_published: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  live_url: string;
  github_url: string;
  preview_label: string;
  sort_order: number;
  is_published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface PortfolioData {
  profile: ProfileData;
  education: EducationItem[];
  skills: SkillItem[];
  certificates: CertificateItem[];
  projects: ProjectItem[];
}
