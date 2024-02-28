import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../postsApiSlice";

export default function SinglePost() {
  const { id } = useParams();
  const { data: posts, isLoading } = useGetPostsQuery();
  const post = posts?.find((post) => post._id === id);

  return (
    <div>
      {isLoading ? (
        <p>Post is loading</p>
      ) : (
        <article>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.price}</p>
        </article>
      )}
    </div>
  );
}
