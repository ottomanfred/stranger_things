import { useState } from "react";
import { useAddPostMutation } from "./postsApiSlice";

/** Form for creating new posts */
export default function MakePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [addPost] = useAddPostMutation();

  const create = async (e) => {
    e.preventDefault();
    addPost({ title, description, price });
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <form onSubmit={create}>
      <label>
        Input post title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Input post message:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Input post price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button>Create</button>
    </form>
  );
}
