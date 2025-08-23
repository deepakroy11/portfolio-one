import { Card, CardBody, Image } from "@heroui/react";

type SkillsProps = {
  id: string;
  title: string;
  summary: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Skills({ skills }: { skills?: SkillsProps[] }) {
  const skillList = skills ?? [];

  return (
    <section id="skills" className="py-24 px-6 ">
      <h2 className="text-4xl font-bold text-center mb-16">Skills & Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {skillList.map((skill) => (
          <Card
            key={skill.id}
            className="text-center hover:shadow-lg transition-transform duration-300 group-hover:scale-110 hover:scale-110"
          >
            <CardBody className="flex flex-col items-center justify-center">
              <div className="text-4xl mb-3 ">
                {skill.image ? (
                  <Image
                    width={50}
                    className="rounded-none"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${skill.image}`}
                    alt={skill.title}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    {skill.title.charAt(0)}
                  </div>
                )}
              </div>
              <span className="font-medium">{skill.title}</span>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
