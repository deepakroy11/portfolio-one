import {
  Image,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@heroui/react";
import type { Skill } from "@prisma/client";

type Project = {
  id: string;
  title: string;
  summary: string;
  image: string;
  skills?: Skill[];
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Projects({
  projects,
}: {
  projects?: Project[];
  skills?: Skill[];
}) {
  // console.log("Base URL", process.env.NEXT_PUBLIC_BASE_URL);
  const projectList = projects ?? [];

  return (
    <section id="projects" className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 ">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projectList.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found.
            </p>
          </div>
        ) : (
          projectList.map((project) => (
            <Card
              key={`${project.id}-${project.title}`}
              isBlurred
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardHeader className="p-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${project.image}`}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills?.map((skill) => (
                    <Chip key={skill.id}>{skill.title}</Chip>
                  ))}
                </div>
              </CardBody>
              <CardFooter>
                <Link href={project.link} target="_black">
                  View Project →
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
