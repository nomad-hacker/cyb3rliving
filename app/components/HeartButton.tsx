"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
  size?: "small" | "large";
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
  size = "small",
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        className={`absolute ${
          size === "large"
            ? "carousel-heart-outline-large"
            : "carousel-heart-outline-small"
        } ${hasFavorited ? "fill-transparent" : "fill-white"}`}
      />
      <AiFillHeart
        className={`${
          size === "large"
            ? "carousel-heart-filled-large"
            : "carousel-heart-filled-small"
        } ${hasFavorited ? "fill-rose-500" : "fill-neutral-500/50"}`}
      />
    </div>
  );
};

export default HeartButton;
