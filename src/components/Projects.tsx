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


  const projectList = projects ?? [];

  return (
    <section id="projects" className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 ">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {projectList.length === 0 ? (
          <p className="text-center text-gray-600">No projects found.</p>
        ) : (
          projectList.map((project) => (
            <Card key={`${project.id}-${project.title}`} isBlurred>
              <CardHeader className="flex-col items-start">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover object-center p-5"
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
