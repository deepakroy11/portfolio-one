import PostPageClient from "./AddPostPageClient";

const fetchTaxonomy = async (endpoint: string) => {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/taxonomy/${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.metas || [];
};

export default async function PostAdd() {
  const [categories, tags] = await Promise.all([
    fetchTaxonomy("category"),
    fetchTaxonomy("tags"),
  ]);

  return <PostPageClient categories={categories} tags={tags} />;
}
