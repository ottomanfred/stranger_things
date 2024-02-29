import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useVerifyUserQuery,
} from "../postsApiSlice";
import { selectToken } from "../../Login/authSlice";

export default function SinglePost() {
  const { id } = useParams();
  const { data: posts, isLoading } = useGetPostsQuery();
  const post = posts?.find((post) => post._id === id);
  const [deletePost] = useDeletePostMutation();
  const { data: verification } = useVerifyUserQuery();

  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const deleteSinglePost = (id) => {
    deletePost(id);
    navigate("/");
  };

  return (
    <div>
      {isLoading ? (
        <p>Post is loading</p>
      ) : (
        <article className="post_card">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.price}</p>
          {token && post.author.username === verification ? (
            <button onClick={() => deleteSinglePost(post._id)}>Delete</button>
          ) : (
            <></>
          )}
        </article>
      )}
    </div>
  );
}
