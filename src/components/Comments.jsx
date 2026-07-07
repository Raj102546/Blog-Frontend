import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";

export default function Comments() {
  const { token, API_URL } = useAuthContext();

  const [comments, setComments] = useState([]);

  const handleAddComments = async () => {
    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ msg: "comments" }),
      });
      const data = await res.json();
      setComments([...comments, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleAddComments}>Add</button>
      {comments.map((comment, index) => (
        <p key={index}>{JSON.stringify(comment.authData.role)}</p>
      ))}
    </>
  );
}
