import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostsQuery, useDeletePostMutation } from "../postsApiSlice";
import { useVerifyUserQuery } from "../../Login/authSlice";
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
        <div>
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
          <Link to={`/`}>
            <p>Return to Main Feed</p>
          </Link>
        </div>
      )}
    </div>
  );
}
