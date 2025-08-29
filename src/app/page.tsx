import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

import type { Skill } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function Home() {
  let skillsData = null;
  let basicDetailsData = null;
  let projectsData = null;

  try {
    const skills = await client.skill.findMany();
    skillsData = { success: true, skills };
  } catch {
    skillsData = null;
  }

  try {
    const projects = await client.project.findMany();
    projectsData = { success: true, projects };
  } catch {
    projectsData = null;
  }

  try {
    const basicDetails = await client.basicDetails.findFirst();
    basicDetailsData = { success: true, basicDetails };
  } catch {
    basicDetailsData = null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br">
        <Hero basicDetails={basicDetailsData?.basicDetails ?? undefined} />
        <About basicDetails={basicDetailsData?.basicDetails ?? undefined} />
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
    </main>
  );
}
