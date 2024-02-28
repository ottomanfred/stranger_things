import { useSelector } from "react-redux";
import { useGetPostsQuery } from "./postsApiSlice";
import { Link } from "react-router-dom";
import { selectToken } from "../Login/authSlice";
import MakePost from "./MakePost";

export default function Feed() {
  const { data: posts, isLoading } = useGetPostsQuery();

  const token = useSelector(selectToken);

  return (
    <div className="feed_container">
      <ul>
        {!token ? (
          <p>You must be logged in to see your make posts.</p>
        ) : (
          <MakePost />
        )}
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          posts.map((post) => (
            <li key={post._id}>
              <Link to={`/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <p>{post.price}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
