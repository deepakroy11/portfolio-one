"use client";

import { Divider, Link, Chip } from "@heroui/react";
import { useState, useEffect } from "react";
import MetaDataSkelton from "./MetaDataSkelton";

export interface MetaDataProps {
  meta_data: {
    categories: { name: string; count: number }[];
    authors: { name: string; count: number }[];
    tags: { name: string; count: number }[];
  };
}

const Sidebar = () => {
  const [metaData, setMetaData] = useState<MetaDataProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMetaData = async () => {
      const response = await fetch("/api/metadata");
      const data = await response.json();
      setIsLoading(false);
      setMetaData(data);
    };
    getMetaData();
  }, []);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <MetaDataSkelton />
        ) : (
          metaData?.meta_data?.categories.map((category) => (
            <Link href={`/blog?category=${category.name}`} key={category.name}>
              <Chip variant="bordered" color="primary" className="capitalize">
                {category.name} ({category.count})
              </Chip>
            </Link>
          ))
        )}
      </div>
      <Divider className="my-4" />
      <div>
        <h3 className="text-lg font-semibold mb-2">Tag Cloud</h3>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <MetaDataSkelton />
          ) : (
            metaData?.meta_data?.tags.map((tag) => (
              <Link href={`/blog?tag=${tag.name}`} key={tag.name}>
                <Chip variant="bordered" color="primary" className="capitalize">
                  {tag.name} ({tag.count})
                </Chip>
              </Link>
            ))
          )}
        </div>
      </div>
      <Divider className="my-4" />
      <div>
        <h3 className="text-lg font-semibold mb-2">Authors</h3>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <MetaDataSkelton />
          ) : (
            metaData?.meta_data?.authors.map((author) => (
              <Link href={`/blog?author=${author.name}`} key={author.name}>
                <Chip variant="bordered" color="primary" className="capitalize">
                  {author.name} ({author.count})
                </Chip>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
