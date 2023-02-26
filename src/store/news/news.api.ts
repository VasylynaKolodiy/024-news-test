import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {LIMIT} from "../../constants";
import {IPost} from "../../models/Interfaces";

type FetchBaseQueryMeta = { request: Request; response?: Response }

export const newsApi = createApi({
  reducerPath: 'news/Api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: build => ({

    getPosts: build.query({
      query: (pageNumber: string) => ({
        url: `/posts?_limit=${LIMIT}&_page=${pageNumber}`,
      }),
      transformResponse(response: IPost[], meta: FetchBaseQueryMeta) {
        return {data: response, totalCount: (meta.response?.headers.get('X-Total-Count'))}
      }
    }),

    deletePost: build.mutation({
      query: (postId: string) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),

  })
})
export const {
  useGetPostsQuery,
  useDeletePostMutation
} = newsApi