import React from "react";
import "./style.scss";

export default function(props) {
  const comments = props.data.posts.read();

  return (
    <div className="wrapper-comments">
      {comments.map((comment, index) => {
        return (
          <div className="comment-card">
            <div className="comment-data">{comment.body}</div>
            <div className="comment-by">{comment.email}</div>
          </div>
        );
      })}
    </div>
  );
}
