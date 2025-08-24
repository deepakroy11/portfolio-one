import { Button, Image, Link } from "@heroui/react";
import MotionBackground from "./MotionBackground";

// You can place this type in a types file or at the top of your component file

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

export default function Hero({
  basicDetails,
}: {
  basicDetails?: BasicDetails;
}) {
  const defaultDetails = {
    siteName: "Developer",
    tagLine: "Full Stack Developer & UI/UX Designer",
    profileImage: "avatar.jpg",
  };

  const details = basicDetails || defaultDetails;
  console.log(details);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
      <MotionBackground />
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src={details.profileImage || "/avatar.jpg"}
          alt="Your Avatar"
          className="w-40 h-40 rounded-full shadow-lg mb-6"
        />
        <h1 className="text-5xl font-bold">Hi, I&apos;m {details.siteName}</h1>
        <p className="mt-4 text-xl">{details.tagLine}</p>
        <Button
          as={Link}
          href="#projects"
          size="lg"
          color="primary"
          variant="solid"
        >
          View My Work
        </Button>
      </div>
    </section>
  );
}
