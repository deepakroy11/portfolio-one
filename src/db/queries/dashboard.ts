import { db } from "@/db";

export const getDashboardStats = async () => {
  // Skip database calls during build
  if (process.env.SKIP_BUILD_VALIDATION === "true") {
    return {
      postsCount: 0,
      usersCount: 0,
      taxonomiesCount: 0,
      projectsCount: 0,
    };
  }

  const [postsCount, usersCount, taxonomiesCount, projectsCount] = await Promise.all([
    db.post.count(),
    db.user.count(),
    db.taxonomy.count(),
    db.project.count(),
  ]);

  return {
    postsCount,
    usersCount,
    taxonomiesCount,
    projectsCount,
  };
};

export const getRecentPosts = async (limit = 5) => {
  // Skip database calls during build
  if (process.env.SKIP_BUILD_VALIDATION === "true") {
    return [];
  }

  return db.post.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
      user: {
        select: { name: true },
      },
    },
  });
};

export const getRecentUsers = async (limit = 5) => {
  // Skip database calls during build
  if (process.env.SKIP_BUILD_VALIDATION === "true") {
    return [];
  }

  return db.user.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};