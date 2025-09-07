import { Button, Image, Link } from "@heroui/react";
import MotionBackground from "./MotionBackground";
import type { BasicDetails } from "@/types";

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
  // console.log(details);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
      <MotionBackground />
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src={
            details.profileImage
              ? `${process.env.NEXT_PUBLIC_BASE_URL}${details.profileImage}`
              : "/avatar.jpg"
          }
          alt="Your Avatar"
          className="w-40 h-40 rounded-full shadow-lg mb-6"
        />
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          Hi, I&apos;m {details.siteName}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          {details.tagLine}
        </p>
        <div className="flex gap-4 mt-8">
          <Button
            as={Link}
            href="#projects"
            size="lg"
            color="primary"
            variant="solid"
          >
            View My Work
          </Button>
          <Button as={Link} href="#contact" size="lg" variant="bordered">
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
