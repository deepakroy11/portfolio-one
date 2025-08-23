import { Image, Link, Chip } from "@heroui/react";
import type { PostProps } from "@/app/blog/BlogPage";

type SinglePostProps = {
  post: PostProps;
};

const Post = ({ post }: SinglePostProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Post Image */}
      <div className="w-full md:w-1/3 flex justify-center items-center">
        <Image
          src={post.image}
          alt={post.title}
          width={300}
          height={200}
          // fallbackSrc="/fallback-image-300x200.png"
          isZoomed
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Post Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-1">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          By <Link href={`/blog?author=${post.author}`}>{post.author}</Link>,{" "}
          {post.date}
        </p>
        <div className="my-2">
          <Link href={`/blog?category=${post.category}`}>
            <Chip color="primary" variant="flat">
              {post.category}
            </Chip>
          </Link>
        </div>

        <p className="text-gray-700 dark:text-gray-300 my-2">{post.summary}</p>
        <div className="flex flex-wrap my-2 gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/?tag=${tag}`}>
              <Chip key={tag} color="default" variant="flat">
                {tag}
              </Chip>
            </Link>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary-600 hover:underline font-medium text-sm"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default Post;
