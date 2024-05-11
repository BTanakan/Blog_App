"use client";

import axios from "axios";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChangeTitle = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleChangeContent = (event: any) => {
    setTextAreaValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (inputValue && textAreaValue) {
        const response = await axios.post(
          "https://post-api.opensource-technology.com/api/posts",

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

        if (response.status === 201) {
          console.log("success", response.data);
        }

        setInputValue("");
        setTextAreaValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center  text-2xl font-bold ">
        New Post
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
        <button className="border px-4 py-4 text-2xl font-bold">Save</button>
        <button className="border px-4 py-4 text-2xl font-bold">Cancle</button>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={handleSubmit}
          className="border px-4 py-4 text-2xl font-bold"
        >
          Publish Now
        </button>
      </div>
    </div>
  );
}
