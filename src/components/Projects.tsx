import {
  Image,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@heroui/react";

type SkillsProps = {
  id: string;
  title: string;
  summary: string;
  image: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date
};

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: SkillsProps[];
  link: string;
};

export default function Projects({ projects }: { projects?: Project[] }) {
  console.log("Projects received:", projects);

  const defaultProjects: Project[] = [
    {
      id: 1,
      title: "Linkify",
      description:
        "Linkify is a web application for creating short links and generating QR codes. It features a React front end styled with Tailwind CSS and Hero UI, and is powered by a Node.js + Express back end for processing and link management.",
      image: "/projects/linkify-white.png",
      skills: [
        {
          id: "1",
          title: "React",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "2",
          title: "Tailwind",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "3",
          title: "Node",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
      link: "https://linkify.deepakroy.dev/",
    },
    {
      id: 2,
      title: "Finly",
      description:
        "Finly is a web application built with Next.js, Tailwind CSS, and Material UI that provides tools for performing various types of financial calculations.",
      image: "/projects/finly-white.png",
      skills: [
        {
          id: "4",
          title: "Next.js",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "5",
          title: "React",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "6",
          title: "Tailwind CSS",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "7",
          title: "Material UI",
          summary: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
      link: "https://linkify.deepakroy.dev/",
    },
  ];

  const projectList =
    projects && projects.length > 0 ? projects : defaultProjects;
  console.log("Using project list:", projectList);

  return (
    <section id="projects" className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 ">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {projectList.map((project) => (
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
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill) => (
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
        ))}
      </div>
    </section>
  );
}
