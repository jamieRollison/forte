import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { getLikes, addLike, removeLike } from "../api/api";

const LikeReact = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const userId = "63fac8d70f9689f99948eb83";

  useEffect(() => {
    getLikes(postId).then((likes) => {
      if (likes && likes.find((id) => id === userId)) {
        setIsLiked(true);
      }
    });
  }, []);

  const clickLike = () => {
    if (isLiked) {
      // Unlike the post
      removeLike(postId, userId);
    } else {
      // Like the post
      addLike(postId, userId);
    }

    setIsLiked(!isLiked);
  };

  return (
    <div className="h-100 w-100">
      {" "}
      {isLiked ? (
        <AiFillHeart className="fill-white" onClick={clickLike} />
      ) : (
        <AiOutlineHeart className="fill-white" onClick={clickLike} />
      )}{" "}
    </div>
  );
};

export default LikeReact;
