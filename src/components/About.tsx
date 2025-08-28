import { Button, Image, Link } from "@heroui/react";

type BasicDetails = {
  id: string;
  siteName: string;
  tagLine: string;
  aboutMe: string;
  aboutMeImage: string;
  profileImage: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
};

export default function About({
  basicDetails,
}: {
  basicDetails?: BasicDetails;
}) {
  const defaultAbout = {
    aboutMe:
      "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems.",
    aboutMeImage: "about-me.jpg",
  };

  const details = basicDetails || defaultAbout;

  return (
    <section id="about" className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <Image
            src={
              details.aboutMeImage
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/${details.aboutMeImage}`
                : "/about-me.jpg"
            }
            alt="About"
            isBlurred
            className="w-full rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{details.aboutMe}</p>
          <Button as={Link} color="primary" href="#contact" size="lg" className="mt-6">
            Let's Connect
          </Button>
        </div>
      </div>
    </section>
  );
}
