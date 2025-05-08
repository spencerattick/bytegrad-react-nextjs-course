import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const bookmarksContext = useContext(BookmarksContext);

  if (!bookmarksContext) {
    throw new Error("BookmarksContext is null. Ensure the provider is set up correctly.");
  }

  const { bookmarkedIds, handleToggleBookmark } = bookmarksContext;

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
