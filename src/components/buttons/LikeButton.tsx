import React from "react";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

function LikeButton() {
  const [like, setLike] = useState(false);
  const handleLikeClick = () => {
    setLike(!like);
  };
  return (
    <div className="rounded-full border bg-gray-300 w-6 h-6 grid place-items-center absolute top-[53%] right-1">
      <button onClick={handleLikeClick}>
        {like ? <span>❤️</span> : <AiOutlineHeart className="text-black" />}
      </button>
    </div>
  );
}

export default LikeButton;
