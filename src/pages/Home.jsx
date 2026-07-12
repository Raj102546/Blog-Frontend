import { useAuthContext } from "../AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Home() {
  const { API_URL } = useAuthContext();
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const publishedPosts = posts.filter((post) => post.published);

  const [featured, ...rest] = publishedPosts;

  console.log(posts);
  return (
    <>
      <div className="bg-stone-50">
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-emerald-700">
            Est. 2026
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Notes worth writing down.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-stone-500">
            A small collection of essays, updates, and half-formed ideas —
            written by people who felt like sharing them.
          </p>
        </section>

        <div className="mx-auto h-px max-w-3xl bg-stone-200" />

        <div className="mx-auto max-w-3xl px-6 py-12">
          {loading && (
            <p className="text-center text-sm text-stone-400">Loading posts…</p>
          )}

          {error && (
            <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-serif text-xl text-stone-700">
                Nothing's been published yet.
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Log in as an author to write the first post.
              </p>
            </div>
          )}
          {featured && (
            <Link to={`/posts/${featured.id}`} className="group block">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-emerald-700">
                Latest
              </p>
              <h2 className="font-serif text-2xl font-semibold text-stone-900 transition group-hover:text-emerald-800 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 line-clamp-2 text-stone-600">
                {featured.content}
              </p>
              <p className="mt-3 text-sm text-stone-400">
                {new Date(featured.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Link>
          )}

          {rest.length > 0 && (
            <ul className="mt-12 divide-y divide-stone-200 border-t border-stone-200">
              {rest.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/posts/${post.id}`}
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
          )}
        </div>
      </div>
    </>
  );
}
