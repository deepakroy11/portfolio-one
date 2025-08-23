import { Suspense } from "react";
import BlogPage from "@/app/blog/BlogPage";
import PostSkelton from "@/components/common/PostSkelton";

const BlogPageWrapper = () => {
  return (
    <Suspense fallback={<PostSkelton />}>
      <BlogPage />
    </Suspense>
  );
};

export default BlogPageWrapper;
