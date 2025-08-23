import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import type { Skill } from "@prisma/client";

export default async function Home() {
  let skillsData = null;
  let basicDetailsData = null;
  let projectsData = null;

  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    skillsData = await fetch(`${baseUrl}/api/settings/skill`).then(
      (res) => res.json()
    );
  } catch {
    skillsData = null;
  }

  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    projectsData = await fetch(`${baseUrl}/api/settings/project`).then(
      (res) => res.json()
    );
  } catch {
    projectsData = null;
  }

  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    basicDetailsData = await fetch(
      `${baseUrl}/api/settings/basic-details`
    ).then((res) => res.json());
  } catch {
    basicDetailsData = null;
  }

  return (
    <div>
      <Hero basicDetails={basicDetailsData?.basicDetails} />
      <About basicDetails={basicDetailsData?.basicDetails} />
      <Projects projects={projectsData?.projects} />
      {/* Debug: {JSON.stringify(projectsData)} */}
      <Skills
        skills={skillsData?.skills?.map((skill: Skill) => ({
          ...skill,
          createdAt: new Date(skill.createdAt),
          updatedAt: new Date(skill.updatedAt),
        }))}
      />
      <Contact basicDetails={basicDetailsData?.basicDetails} />
    </div>
  );
}
