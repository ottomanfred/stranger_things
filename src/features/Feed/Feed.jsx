import { useSelector } from "react-redux";
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useVerifyUserQuery,
} from "./postsApiSlice";
import { Link } from "react-router-dom";
import { selectToken } from "../Login/authSlice";
import MakePost from "./MakePost";

export default function Feed() {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const token = useSelector(selectToken);

  const { data: verification } = useVerifyUserQuery(token);

  return (
    <div className="feed_container">
      <ul className="feed">
        {!token ? (
            <div className="login_notification"><p>You must be logged in to see your make posts.</p></div>
        ) : (
          <MakePost />
        )}
        {isLoading ? (
            <li>Loading...</li>
        ) : (
          posts.map((post) => (
            <li className="post_card" key={post._id}>
              <Link to={`/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <p>{post.price}</p>
              {token && post.author.username === verification ? (
                <button onClick={() => deletePost(post._id)}>Delete</button>
              ) : (
                <></>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
