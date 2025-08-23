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
  basicDetails: BasicDetails;
}) {
  return (
    <section id="about" className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <Image
            src={`${process.env.BASE_URL}/${basicDetails.aboutMeImage}`}
            alt="About"
            isBlurred
            className="w-full rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left space-y-5">
          <div>{basicDetails.aboutMe}</div>
          <Button as={Link} color="primary" href="#contact" size="lg">
            Lets Connet
          </Button>
        </div>
      </div>
    </section>
  );
}
