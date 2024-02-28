import api from "./api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (response) => response.data.posts,
      providesTags: ["Posts"],
    }),
    getPostById: builder.query({
      query: (id) => "/posts/" + id,
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: "/recipes/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useDeletePostMutation,
} = postsApi;
