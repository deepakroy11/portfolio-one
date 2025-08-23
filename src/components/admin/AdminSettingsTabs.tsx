"use client";

import { Tabs, Tab } from "@heroui/react";
import AdminBasicDetails from "@/components/admin/AdminBasicDetails";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import type {
  BasicDetails as BasicDetailsType,
  Project,
  Skill,
} from "@prisma/client";

type ProjectWithSkills = Project & {
  skills?: Skill[];
};

interface AdminSettingsTabsProps {
  basicDetails: BasicDetailsType | null;
  projects: ProjectWithSkills[];
  skills: Skill[];
  fallbackDetails: BasicDetailsType;
}

export default function AdminSettingsTabs({
  basicDetails,
  projects,
  skills,
  fallbackDetails,
}: AdminSettingsTabsProps) {
  return (
    <Tabs aria-label="Portfolio settings tabs" color="primary" radius="lg">
      <Tab key="basic-details" title="Basic Details">
        <AdminBasicDetails details={basicDetails ?? fallbackDetails} />
      </Tab>

      <Tab key="skills" title="Skills">
        <Skills skills={skills} />
      </Tab>

      <Tab key="projects" title="Projects">
        <Projects projects={projects} />
      </Tab>
    </Tabs>
  );
}
