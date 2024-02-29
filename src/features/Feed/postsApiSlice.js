import api from "../../store/api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (response) => response.data.posts,
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: { post },
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: "/posts/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    verifyUser: builder.query({
      query: (token) => "/test/me",
      transformResponse: (response) => response.data.user.username,
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useVerifyUserQuery } =
  postsApi;
