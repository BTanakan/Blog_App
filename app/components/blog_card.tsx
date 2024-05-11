import { format } from "date-fns";
import { useState } from "react";
import EditPostModal from "./edit_post_modal";
import { Post } from "../modal/post";

export default function BlogCard({
  title,
  detail,
  date,
  id,
  onDelete,
}: {
  title: string;
  detail: string;
  date: string;
  id: string;
  onDelete: (postId: string) => void;
}) {
  const dateDisplay = (date: string) => {
    return format(new Date(date), "dd-MM-yyyy HH:mm");
  };
  const [modalEditState, setModalEditState] = useState(false);

  const handlePublishSave = (postId: string) => {
    onDelete(postId);
    setModalEditState(false);
  };

  return (
    <div className="border-2 border-black pl-4 pt-2 space-y-4">
      <p className=" font-bold text-2xl">{title}</p>
      <p>{detail}</p>
      <div className=" flex justify-between">
        <p>{dateDisplay(date)}</p>
        <button
          onClick={() => setModalEditState(true)}
          className=" border-l-2 border-t-2  border-black px-4 text-lg"
        >
          Edit
        </button>
      </div>
      <div>
        {modalEditState && (
          <EditPostModal
            onPublishSave={() => handlePublishSave(id)}
            postId={id}
            setModalState={setModalEditState}
          ></EditPostModal>
        )}
      </div>
    </div>
  );
}
