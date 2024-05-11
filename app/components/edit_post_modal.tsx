import { useEffect, useState } from "react";
import { Post, PostResponse } from "../modal/post";
import axios from "axios";

async function getBlog(postId: string) {
  const response = await axios.get(
    `https://post-api.opensource-technology.com/api/posts/${postId}`
  );
  if (response.status !== 200) return;
  const _data = response.data as Post;
  return _data;
}

const EditPostModal = (props: {
  postId: string;
  setModalState: (arg0: boolean) => void;
  onPublishSave: () => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChangeTitle = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleChangeContent = (event: any) => {
    setTextAreaValue(event.target.value);
  };

  const onEdit = async (postId: String) => {
    try {
      const response = await axios.patch(
        `https://post-api.opensource-technology.com/api/posts/${postId}`,

        {
          title: inputValue,
          content: textAreaValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        console.log("success", response.data);
        props.setModalState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (postId: string) => {
    try {
      const response = await axios.delete(
        `https://post-api.opensource-technology.com/api/posts/${postId}`
      );

      if (response.status === 204) {
        console.log("success", response.data);
        props.onPublishSave();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initBlog = async () => {
    try {
      const result = await getBlog(props.postId);
      setInputValue(result?.title ?? "");
      setTextAreaValue(result?.content ?? "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initBlog();
  }, []);
  return (
    <>
      <div className="fixed inset-0 opacity-25 bg-black"></div>
      <div className="fixed inset-0 flex justify-center items-center z-10">
        <div className="bg-white">
          <div>
            <div className="flex items-center justify-center  text-2xl font-bold ">
              Edit Post
            </div>
            <div className="">
              <div className="flex justify-center">
                <div>
                  <p className="text-2xl font-bold">Title</p>
                  <input
                    className="border"
                    type="text"
                    value={inputValue}
                    onChange={handleChangeTitle}
                  />
                </div>
              </div>
              <div className=" mt-4 flex justify-center">
                <div>
                  <p className="text-2xl font-bold">Content</p>
                  <textarea
                    className="border"
                    value={textAreaValue}
                    onChange={handleChangeContent}
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => onEdit(props.postId)}
                className="border px-4 py-4 text-2xl font-bold"
              >
                Save
              </button>
              <button
                onClick={() => props.setModalState(false)}
                className="border px-4 py-4 text-2xl font-bold"
              >
                Cancle
              </button>
              <button
                onClick={() => onDelete(props.postId)}
                className="border px-4 py-4 text-2xl font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPostModal;
