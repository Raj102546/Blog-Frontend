import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";

export default function Posts () {
  const { token, API_URL, credentials } = useAuthContext();
  const [toggle, setToggle] = useState(false);
  const [newPosts, setNewPosts] = useState({
    title: "",
    content: "",
  });
  const [posts, setPosts] = useState([]);

  const handleChange = (e) => {
    setNewPosts({ ...newPosts, [e.target.name]: e.target.value });
  };

  const handleToggle = ()=>{
    if(token !== ""){
      setToggle(prev => !prev)
    }else{
      console.log("You must create an author account to use this feature")
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/posts`);
        const data = await res.json();
        console.log(data.posts);
        setPosts(data.posts);
        console.log("just set posts to:", data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  console.log(posts);
  const handlePosts = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      const res = await fetch(`${API_URL}/newPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPosts),
      });
      console.log("btn clicked");
      if (!res.ok) {
        throw new Error("Invalid Post");
      }
      const data = await res.json();
      console.log(data);
      console.log("posts state", posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleToggle}>Create Post</button>
      {toggle && (
        <form onSubmit={handlePosts}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={newPosts.title}
            required
          />
          <label htmlFor="content">Content: </label>
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
            value={newPosts.content}
            required
          ></textarea>
          <button type="submit">Create</button>
        </form>
      )}
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.created_at}</p>
          <p>{post.published}</p>
        </div>
      ))}
    </>
  );
}
