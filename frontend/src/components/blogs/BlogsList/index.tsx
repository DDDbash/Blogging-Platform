"use client";

import dayjs from "dayjs";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useBlogsListQuery } from "@/hooks/queries/blog";
import { User } from "@/types/user";
import { MAX_CONTENT_LENGTH_IN_LIST } from "@/utils/constants";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteBlogDialog from "../DeleteBlogDialog";
import Pagination from "../Pagination";

type Props = {
  profile?: User | null;
};

const BlogsList = (props: Props) => {
  const { profile } = props;

  const [page, setPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(
    undefined,
  );

  const router = useRouter();

  const { data: blogsListQuery } = useBlogsListQuery({ page, limit: 5 });
  const blogsList = blogsListQuery?.data;

  return (
    <div className="flex flex-col gap-6">
      {blogsList?.map((blog) => {
        return (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="flex cursor-pointer flex-col rounded-lg px-6 py-3 shadow-lg transition-colors hover:bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Author: {blog.author.username}
              </span>

              {profile?.id === blog.author.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/blog/edit/${blog.id}`);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlogId(blog.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="flex h-full w-full justify-between gap-2">
              <div className="flex w-3/4 flex-col gap-3 pt-1">
                <div className="flex flex-col gap-1 lg:gap-2">
                  <h4>{blog.title}</h4>

                  <p>
                    {blog.content.length > MAX_CONTENT_LENGTH_IN_LIST
                      ? `${blog.content.slice(0, 144)}...`
                      : blog.content}
                  </p>
                </div>

                <span className="text-sm text-gray-600">
                  {dayjs(blog.createdAt).format("MMM D, YYYY")}
                </span>
              </div>

              <div className="relative h-auto w-1/4">
                <Image
                  src={blog.image}
                  alt="img"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        );
      })}

      {blogsListQuery && (
        <Pagination
          currentPage={blogsListQuery.meta.page}
          totalPages={blogsListQuery.meta.lastPage}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      )}

      <DeleteBlogDialog
        isOpen={isDeleteDialogOpen}
        selectedBlogId={selectedBlogId}
        onClose={() => {
          setSelectedBlogId(undefined);
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
};

export default BlogsList;
