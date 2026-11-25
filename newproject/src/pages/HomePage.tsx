import { useEffect } from 'react';
import { AboutSection } from '../components/AboutSection';
import { CareerSection } from '../components/CareerSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { ContactSection } from '../components/ContactSection';
import { DocumentsSection } from '../components/DocumentsSection';
import { EducationSection } from '../components/EducationSection';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { Navbar } from '../components/Navbar';
import { ProjectsSection } from '../components/ProjectsSection';
import { SkillsSection } from '../components/SkillsSection';
import { SocialProfilesSection } from '../components/SocialProfilesSection';
import { DEFAULT_PORTFOLIO } from '../data/defaultPortfolio';

export function HomePage() {
  const { profile, education, skills, certificates, projects } = DEFAULT_PORTFOLIO;
  const vis = profile.section_visibility;

  useEffect(() => {
    document.title = `${profile.full_name} | ${profile.professional_title}`;
  }, [profile.full_name, profile.professional_title]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060D1A]">
      <Navbar fullName={profile.full_name} visibility={vis} />

      <main className="flex-1">
        {vis.hero && <HeroSection profile={profile} />}
        {vis.about && <AboutSection profile={profile} />}
        {vis.education && <EducationSection education={education} />}
        {vis.skills && <SkillsSection skills={skills} />}
        {vis.documents && <DocumentsSection profile={profile} />}
        {vis.certificates && <CertificatesSection certificates={certificates} />}
        {vis.projects && <ProjectsSection projects={projects} />}
        {vis.career && <CareerSection profile={profile} />}
        <SocialProfilesSection profile={profile} />
        {vis.contact && <ContactSection profile={profile} />}
      </main>

      <Footer profile={profile} />
    </div>
  );
}
