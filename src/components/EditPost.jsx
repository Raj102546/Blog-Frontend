import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";
import { useParams, Link, useNavigate } from "react-router";

export default function EditPost() {
  const navigation = useNavigate();
  const { token, API_URL } = useAuthContext();
  const { id } = useParams();
  const [post, setPost] = useState();
  const [editPost, setEditPost] = useState();
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}/post`);
        if (!res.ok) {
          setError("Fetch failed");
          console.log("Fetch failed");
        }
        const data = await res.json();
        setPost(data.post);
        setEditPost(data.post);
        console.log(data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditPost({ ...editPost, [name]: type == "checkbox" ? checked : value });
  };

  const handleEditPost = async (e) => {
    console.log("btn clicked");
    e.preventDefault();
    const res = await fetch(`${API_URL}/${id}/editPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(editPost),
    });
    if (!res.ok) {
      setError("Post method Failed");
    }
    const data = await res.json();
    console.log(data);
    navigation("/posts");
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}/deletePost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({postId : id}),
      });
      if (!res.ok) {
        console.log("failed");
      }
      navigation("/posts");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-center text-sm text-stone-400">Loading posts…</p>
      ) : (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-stone-900/40 px-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[70vh] w-full max-w-2xl flex-col rounded-xl bg-stone-50 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
              <h2 className="font-serif text-xl font-semibold text-stone-900">
                Edit your post
              </h2>
              <Link
                to="/posts"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Link>
            </div>
            {toggle && (
              <div className="animate-slide-down overflow-hidden border-b border-amber-200 bg-amber-50 z-50">
                <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">
                  <p className="text-sm text-stone-700">
                    <span className="font-medium text-stone-900">
                      Delete this post?
                    </span>{" "}
                    This can't be undone.
                  </p>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => setToggle(false)}
                      className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleEditPost}
              className="flex flex-1 flex-col overflow-hidden px-6 py-5"
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={editPost.title}
                  placeholder="Give your post a title"
                  required
                  className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="content"
                  className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  onChange={handleChange}
                  value={editPost.content}
                  placeholder="Write your post..."
                  required
                  className="w-full flex-1 resize-none rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
                <label
                  htmlFor="published"
                  className="flex items-center gap-2 text-sm text-stone-700"
                >
                  <input
                    type="checkbox"
                    name="published"
                    id="published"
                    onChange={handleChange}
                    checked={editPost.published}
                    className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  Publish
                </label>

                <div className="flex gap-3">
                  <Link to="/posts">
                    <button
                      type="button"
                      className="rounded-md px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setToggle(true)}
                    className="rounded-md px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
