import { Button, Image } from "@heroui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectDetails() {
  const project = {
    title: "Creative Portfolio",
    description:
      "A sleek and modern portfolio site built with Next.js, Tailwind CSS, and Hero UI. It features smooth transitions, dark mode, and a CMS-powered blog.",
    image: "/project4.jpg",
    tech: ["Next.js", "Tailwind CSS", "Hero UI", "TypeScript", "Sanity CMS"],
    github: "https://github.com/yourusername/creative-portfolio",
    live: "https://yourportfolio.com",
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-tr from-gray-50 to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="w-full h-72 md:h-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
            isBlurred
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {project.title}
          </h1>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              as="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="bordered"
              endContent={<FaGithub />}
            >
              GitHub
            </Button>
            <Button
              as="a"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              endContent={<FaExternalLinkAlt />}
            >
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
