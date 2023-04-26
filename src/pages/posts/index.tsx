import { GetStaticProps } from "next";
import React from "react";
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["posts"], fetchPosts); // IDE error on fetchPosts is bug

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function PostsPage() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 0 }) => fetchPosts({ limit: 10, skip: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.skip + 10,
    }
  );
  return (
    <div>
      posts:
      <ul>
        {data?.pages.map((data, indexList) =>
          data.posts.map((post, index) => (
            <li key={post.id + post.title + indexList + index}>
              <Link href="#">#{post.id} {post.title}</Link>
            </li>
          ))
        )}
      </ul>
      <button onClick={() => fetchNextPage()}>
        load more {isFetchingNextPage ? "loading..." : ""}
      </button>
    </div>
  );
}

export default PostsPage;
