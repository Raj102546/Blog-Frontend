import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../AuthContext";

export default function OpenPost() {
  const { token, loggedUser, API_URL } = useAuthContext();
  const { id } = useParams();
  const [post, setPost] = useState();
  const [addComment, setAddComment] = useState("");
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [currId, setCurrId] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await fetch(`${API_URL}/${id}/post`);
        const postData = await postRes.json();
        setPost(postData.post);

        const commentRes = await fetch(`${API_URL}/posts/${id}/comments`);
        const commentData = await commentRes.json();
        setComments(commentData.comments);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleChange = (e) => {
    setAddComment(e.target.value);
  };

  const handleAddComments = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to comment");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/posts/${id}/newComments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: addComment, postId: id }),
      });
      if (!res.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await res.json();
      setComments([...comments, {...data.comment, username: loggedUser.username}]);
      setAddComment("");
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(`${API_URL}/posts/${id}/deleteComment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentId: commentId }),
    });
    const data = await res.json();
    setComments(comments.filter((c) => c.id !== commentId));
    setToggle(false);
    console.log(data);
  };

  const handleConfirmBox = (id) => {
    setCurrId(id);
    setToggle(true);
  };

  return (
    <>
      {error && (
        <p className="mx-auto mt-6 max-w-2xl rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-24 text-center text-sm text-stone-400">
          Loading post…
        </p>
      ) : (
        <article className="mx-auto max-w-2xl px-6 py-16">
          <div className="mb-6 flex items-center gap-2">
            {!post.published && (
              <span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-medium text-stone-600">
                Draft
              </span>
            )}
            <span className="text-sm text-stone-400">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-8 h-px w-16 bg-emerald-700" />

          <p className="mt-8 whitespace-pre-wrap text-lg leading-relaxed text-stone-700">
            {post.content}
          </p>

          <section className="mt-16 border-t border-stone-200 pt-10">
            <h2 className="font-serif text-xl font-semibold text-stone-900">
              {comments.length > 0
                ? `${comments.length} ${comments.length === 1 ? "Comment" : "Comments"}`
                : "Comments"}
            </h2>

            <form
              onSubmit={handleAddComments}
              className="mt-6 flex items-start gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-medium text-white">
                {(loggedUser?.username || "?").charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-1 gap-2">
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment…"
                  onChange={handleChange}
                  value={addComment}
                  className="flex-1 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
                <button
                  type="submit"
                  disabled={!addComment.trim()}
                  className="shrink-0 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300"
                >
                  Send
                </button>
              </div>
            </form>
            {toggle && (
              <div
                onClick={() => setToggle(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 px-4 backdrop-blur-sm animate-fade-in"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl animate-fade-in-scale"
                >
                  <p className="text-sm text-stone-700">
                    <span className="block text-base font-medium text-stone-900">
                      Delete this comment?
                    </span>
                    <span className="mt-1 block">This can't be undone.</span>
                  </p>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={() => setToggle(false)}
                      className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteComment(currId)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {comments.length === 0 ? (
              <p className="mt-10 text-center text-sm text-stone-400">
                No comments yet — be the first to say something.
              </p>
            ) : (
              <ul className="mt-8 space-y-6">
                {comments.map((c) => (
                  <li key={c.id} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-200 text-sm font-medium text-stone-600">
                      {(c.username || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 rounded-lg bg-stone-100 px-4 py-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-stone-900">
                          {c.username || "Anonymous"}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(c.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-stone-700">{c.content}</p>
                    </div>
                    <button onClick={() => handleConfirmBox(c.id)}>
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </article>
      )}
    </>
  );
}
