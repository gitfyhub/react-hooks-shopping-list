import React, { useState } from "react";
import "./App.css";

function Like({ like, index, completeLike, deleteLike }) {
  return (
    <div
      style={{ textDecoration: like.isCompleted ? "line-through" : "" }}
      className="like"
    >
      {like.text}
      <div>
        <button onClick={() => completeLike(index)}>Completed</button>
        <button onClick={() => deleteLike(index)}>Delete</button>
      </div>
    </div>
  );
}

function App() {
  const [likes, setLikes] = useState([
    {
      text: "apples",
      isCompleted: false
    },
    {
      text: "ice cream",
      isCompleted: true
    },
    {
      text: "cake",
      isCompleted: false
    }
  ]);

  function LikeForm({ addLike }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addLike(value);
      setValue("");
    };
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          placeholder="Add Likes"
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  }

  const addLike = text => {
    const newLikes = [...likes, { text }];
    setLikes(newLikes);
  };

  const deleteLike = index => {
    const newLikes = [...likes];
    newLikes.splice(index, 1);
    setLikes(newLikes);
  };

  const completeLike = index => {
    console.log('likes: ', [...likes])
    const newLikes = [...likes];
    newLikes[index].isCompleted = true;
    console.log('newLikes: ', newLikes[index]);
    setLikes(newLikes);
  };

  return (
    <div className="app">
      <div className="like-list">
        <h2>Shopping List</h2>
        <div>
          {likes.length === 0 ? "no likes man, add something below" : ""}
          {likes.map((like, index) => (
            <Like
              key={index}
              index={index}
              like={like}
              deleteLike={deleteLike}
              completeLike={completeLike}
            />
          ))}
        </div>
        <LikeForm addLike={addLike} />
      </div>
    </div>
  );
}

export default App;
