"use client";

import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Alert,
  Avatar,
  Skeleton,
} from "@heroui/react";
import Link from "next/link";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";

interface TaxonomyMeta {
  id: string;
  name: string;
  slug: string;
}

interface User {
  id: string;
  name: string;
  image: string;
}

interface PostWithData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  user: User;
  tags: TaxonomyMeta[];
  category: TaxonomyMeta[];
}

interface IncomingDataProps {
  success: boolean;
  posts: PostWithData[];
  error: string | undefined;
  isLoading: boolean;
}

const ListPostPageClient = ({ data }: { data: IncomingDataProps }) => {
  const { posts, error } = data;

  return (
    <>
      {error && <Alert color="danger" title={error} className="mb-2" />}

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {data.isLoading
          ? [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-content1 rounded-lg p-4 shadow-sm border space-y-3"
              >
                <div className="flex justify-between items-start">
                  <Skeleton className="h-4 w-8 rounded" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              </div>
            ))
          : (posts ?? []).map((post, index) => (
              <div
                key={post.slug}
                className="bg-content1 rounded-lg p-4 shadow-sm border"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm text-default-500">#{index + 1}</span>
                  <div className="flex gap-2">
                    <Link href={`/admin/posts/${post.slug}`}>
                      <Button isIconOnly size="sm" variant="flat">
                        <BsPencilSquare className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button isIconOnly size="sm" variant="flat" color="danger">
                      <BsTrash3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link href={`/admin/posts/${post.slug}`} color="secondary">
                    <h3 className="font-medium text-sm">{post.title}</h3>
                  </Link>
                  <p className="text-xs text-default-500 line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="sm"
                      name={post.user.name}
                      src={post.user.image}
                    />
                    <span className="text-xs">{post.user.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.category.map((cat) => (
                      <Chip key={cat.id} size="sm">
                        {cat.name}
                      </Chip>
                    ))}
                    {post.tags.map((tag) => (
                      <Chip key={tag.id} size="sm" variant="flat">
                        {tag.name}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Table aria-label="collection table">
          <TableHeader>
            <TableColumn>SL</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Summary</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Author</TableColumn>
            <TableColumn>Tags</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>

          <TableBody
            emptyContent="No posts available."
            items={posts ?? []}
            isLoading={data.isLoading}
            loadingContent={
              <div className="flex justify-center p-4">Loading posts...</div>
            }
          >
            {(posts ?? []).map((post, index) => (
              <TableRow key={post.slug}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-48">
                  <Link href={`/admin/posts/${post.slug}`} color="secondary">
                    <div className="truncate">{post.title}</div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="truncate max-w-xs">{post.summary}</div>
                </TableCell>
                <TableCell>
                  <Chip size="sm">
                    {post.category.map((cat) => cat.name).join(",")}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-start gap-2">
                    <Avatar
                      size="sm"
                      showFallback
                      name={post.user.name}
                      src={post.user.image}
                    />
                    <span className="text-sm truncate">{post.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Chip key={tag.id} size="sm" variant="flat">
                        {tag.name}
                      </Chip>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Link href={`/admin/posts/${post.slug}`}>
                      <Button isIconOnly size="sm" variant="flat">
                        <BsPencilSquare className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button isIconOnly size="sm" variant="flat" color="danger">
                      <BsTrash3 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ListPostPageClient;
