import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface PostsPageParams {
  skip: number;
  limit: number;
}

export interface Post {
  id: number;
  title: string;
}

export const fetchPosts = async (
  params: PostsPageParams = { skip: 0, limit: 10 }
) => {
  const { data } = await axios.get<{
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
  }>("https://dummyjson.com/posts", {
    params,
  });
  return data;
};
