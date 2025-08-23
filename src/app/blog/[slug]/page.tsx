"use client";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import Markdown from "react-markdown";

import { useParams } from "next/navigation";
import type { PostProps } from "@/app/blog/BlogPage";

import { useEffect, useState } from "react";
import PostDetailSkelton from "@/components/common/PostDetailSkelton";
import SimilarPostSkelton from "@/components/common/SimilarPostSkelton";

const BlogSingle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<PostProps>();
  const [simlilarPosts, setSimlilarPosts] = useState<PostProps[]>();
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isSimilarPostLoading, setIsSimilarPostLoading] = useState(true);
  const img_url = post?.image;

  const getSimilarPosts = async (category: string) => {
    setIsSimilarPostLoading(true);
    const response = await fetch(`/api/blog/?category=${category}`);
    const data = await response.json();
    setSimlilarPosts(data.posts);
    setIsSimilarPostLoading(false);
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`/api/blog/${slug}/`);
      const data = await response.json();
      setPost(data);
      setIsPostLoading(false);
      getSimilarPosts(data?.category);
    };
    getPost();
  }, [slug]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {isPostLoading ? (
        <PostDetailSkelton />
      ) : (
        <>
          <div
            className={`relative w-full bg-cover bg-center flex items-center justify-center rounded-lg h-[400px]`}
            style={{ backgroundImage: `url(${img_url})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl font-bold">{post?.title}</h1>
              <div className="mt-5">
                <Link href={`/blog?category=${post?.category}`}>
                  <Chip
                    key={post?.category}
                    variant="bordered"
                    color="default"
                    className="ml-1"
                  >
                    {post?.category}
                  </Chip>
                </Link>
              </div>

              <Divider className="my-5" />
              <div className="mt-2 text-lg">
                {post?.tags.map((tag) => (
                  <Link href={`/blog/?tag=${tag}`} key={tag}>
                    <Chip className="ml-1" variant="solid" color="primary">
                      {tag}
                    </Chip>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold">{post?.title}</h1>
            <p className="text-gray-600 mt-2">
              By{" "}
              <Link href={`/blog?author=${post?.author}`}>{post?.author}</Link>,{" "}
              {post?.date}
            </p>

            <div className="mt-6 prose prose-lg max-w-none">
              <Markdown>{post?.description?.replace(/\\n/g, "\n")}</Markdown>
            </div>
          </div>
        </>
      )}

      <Divider className="my-5" />

      <h1 className="text-2xl font-semibold">Realated Post</h1>
      {isSimilarPostLoading ? (
        <SimilarPostSkelton />
      ) : (
        <div className="w-full px-4">
          <div className="flex flex-wrap -mx-4">
            {simlilarPosts &&
              simlilarPosts.map((post) => (
                <div
                  key={post?.slug}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
                >
                  <Card className="h-full">
                    <CardHeader className="w-full flex-col items-start">
                      <Image
                        src={`${post?.image}`}
                        alt="Similar post image"
                        className="w-full object-cover object-center h-36"
                      />
                    </CardHeader>
                    <CardBody>
                      <h1>{post?.title}</h1>
                      {/* <div className="my-2">
                        <Link href="#">
                          <Chip color="primary" variant="flat">
                            {post?.category}
                          </Chip>
                        </Link>
                      </div> */}
                      {/* <div className="my-4">{post?.summary}</div> */}
                      <div className="my-2 space-y-2 space-x-2">
                        {post?.tags.map((tag) => (
                          <Link href={`/blog/?tag=${tag}`} key={tag}>
                            <Chip color="default" variant="flat">
                              {tag}
                            </Chip>
                          </Link>
                        ))}
                      </div>
                    </CardBody>
                    <CardFooter>
                      <Link href={`/blog/${post?.slug}`}>View Post →</Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSingle;
