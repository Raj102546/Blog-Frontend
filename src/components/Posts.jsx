import { useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "../AuthContext";
import { Outlet, Link, Navigate } from "react-router";

export default function Posts() {
  const { token, loggedUser, API_URL, credentials } = useAuthContext();
  
  console.log(loggedUser);
  const [toggle, setToggle] = useState(false);
  const [newPosts, setNewPosts] = useState({
    title: "",
    content: "",
    published: false,
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPosts({ ...newPosts, [name]: type === "checkbox" ? checked : value });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/posts`);
        if (!res.ok) throw new Error("Couldn't load posts.");
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [API_URL]);

  const handleToggle = () => {
    if (loggedUser.role === "author") {
      setToggle((prev) => !prev);
    } else {
      setError("You must create an author account to use this feature");
      console.log("You must create an author account to use this feature");
    }
  };

  const closeModal = () => {
    setToggle(false);
    setNewPosts({ title: "", content: "", published: false });
  };

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
      setPosts([...posts, data.post]);
      closeModal();
      console.log(data);
      console.log("posts state", data.post);
    } catch (error) {
      console.log(error);
    }
  };

  const myPosts = posts.filter((post) => post.author_id == loggedUser.id);
  return (
    <>
     <div className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-10">
        <h1 className="font-serif text-2xl font-semibold text-stone-900">
          Your posts
        </h1>
        <button
          onClick={handleToggle}
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          + New post
        </button>
      </div>
       {toggle && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 px-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[70vh] w-full max-w-2xl flex-col rounded-xl bg-stone-50 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
              <h2 className="font-serif text-xl font-semibold text-stone-900">
                Write a new post
              </h2>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="rounded-md p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handlePosts} className="flex flex-1 flex-col overflow-hidden px-6 py-5">
              <div className="mb-4">
                <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={newPosts.title}
                  placeholder="Give your post a title"
                  required
                  className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
 
              <div className="flex flex-1 flex-col">
                <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  onChange={handleChange}
                  value={newPosts.content}
                  placeholder="Write your post..."
                  required
                  className="w-full flex-1 resize-none rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
 
              <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
                <label htmlFor="published" className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    name="published"
                    id="published"
                    onChange={handleChange}
                    checked={newPosts.published}
                    className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  Publish immediately
                </label>
 
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                  >
                    Create post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="mx-auto my-2 h-px max-w-3xl bg-stone-200" />

      <div className="mx-auto max-w-3xl px-6 py-12">
        {loading && (
          <p className="text-center text-sm text-stone-400">Loading posts…</p>
        )}

        {error && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && myPosts.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-serif text-xl text-stone-700">
              Nothing's been published yet.
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Log in as an author to write the first post.
            </p>
          </div>
        )}
        <ul className="mt-12 divide-y divide-stone-200 border-t border-stone-200">
          {myPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/editPosts/${post.id}`}
                className="group flex flex-col justify-between gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <h3 className="font-serif text-lg font-medium text-stone-900 transition group-hover:text-emerald-800">
                  {post.title}
                </h3>
                <span className="shrink-0 text-sm text-stone-400">
                  {new Date(post.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}