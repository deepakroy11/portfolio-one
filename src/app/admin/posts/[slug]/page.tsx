import EditPostPageClient from "./EditPostPageClient";

export const dynamic = "force-dynamic";
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

const fetchSinglePost = async (endpoint: string) => {
  const response = await fetch(`${baseUrl}/${endpoint}`, { cache: "no-store" });
  if (!response.ok) return { post: null };
  const data = await response.json();
  return data;
};

const fetchTaxonomy = async (endpoint: string) => {
  const response = await fetch(`${baseUrl}/api/taxonomy/${endpoint}`, { cache: "no-store" });
  if (!response.ok) return [];
  const data = await response.json();
  return data?.metas || [];
};

export default async function PostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, categories, tags] = await Promise.all([
    fetchSinglePost(`api/post/${encodeURIComponent(slug)}`),
    fetchTaxonomy("category"),
    fetchTaxonomy("tags"),
  ]);

  const data = {
    post: post.post,
    categories,
    tags,
  };

  return (
    <main className="flex-1 p-8 space-y-10">
      <EditPostPageClient data={data} />
    </main>
  );
}
