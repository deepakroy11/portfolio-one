export type BasicDetails =
  | {
      id: string;
      siteName: string | null;
      tagLine: string | null;
      aboutMe: string | null;
      aboutMeImage: string | null;
      profileImage: string | null;
      contactEmail: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  | null
  | undefined;

export type Skill = {
  id: string;
  title: string;
  summary: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  image: string;
  skills?: Skill[];
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostProps = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  content?: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
};
