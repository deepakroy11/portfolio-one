import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default async function Home() {
  let skillsData = null;
  let basicDetailsData = null;
  let projectsData = null;

  try {
    skillsData = await fetch(`${process.env.API_URL}/settings/skill`).then(
      (res) => res.json()
    );
  } catch {
    skillsData = null;
  }

  try {
    projectsData = await fetch(`${process.env.API_URL}/settings/project`).then(
      (res) => res.json()
    );
    console.log("Projects API response:", projectsData);
  } catch (error) {
    console.log("Projects API error:", error);
    projectsData = null;
  }

  try {
    basicDetailsData = await fetch(
      `${process.env.API_URL}/settings/basic-details`
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
      <Skills skills={skillsData?.skills} />
      <Contact basicDetails={basicDetailsData?.basicDetails} />
    </div>
  );
}
