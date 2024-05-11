"use client";
import axios from "axios";
import BlogCard from "./components/blog_card";
import BlogCardDaft from "./components/blog_card_daft";

import { useState, useEffect } from "react";
import { Post, PostResponse } from "./modal/post";
import CreatePostModal from "./create_post";
import Link from "next/link";
import Modal from "./create_post";

async function getBlogs() {
  const response = await axios.get(
    "https://post-api.opensource-technology.com/api/posts/?limit=20"
  );
  if (response.status !== 200) return;
  const _data = response.data as PostResponse;
  return _data;
}

async function getDaftPost() {
  const response = await axios.get(
    "https://post-api.opensource-technology.com/api/posts/draft/?limit=20"
  );
  if (response.status !== 200) return;
  const _data = response.data as PostResponse;
  return _data;
}

export default function Home() {
  const [postState, setPostState] = useState<Post[]>([]);
  const [modePostState, setModePostState] = useState(true);
  const [modalState, setModalState] = useState(false);

  const handlePublishSave = (value: Post) => {
    console.log(value);
    const filteredPostState = postState.filter((post) => post !== value);
    setPostState(filteredPostState);
  };
  const handleModalSave = (value: Post) => {
    console.log(value);
    setPostState((prevState) => [value, ...prevState]);
  };

  const onDartMode = () => {
    setModePostState(false);
    fetchDaftPost();
  };

  const onPostMode = () => {
    setModePostState(true);
    initBlog();
  };

  const fetchDaftPost = async () => {
    try {
      const result = await getDaftPost();
      setPostState(result?.posts ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const initBlog = async () => {
    try {
      const result = await getBlogs();
      setPostState(result?.posts ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initBlog();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="space-x-4">
          <button
            onClick={onPostMode}
            className={`border p-4 text-lg ${
              modePostState ? "bg-blue-300" : "bg-gray-300"
            }`}
          >
            Post
          </button>
          <button
            onClick={onDartMode}
            className={`border p-4 text-lg ${
              !modePostState ? "bg-blue-300" : "bg-gray-300"
            }`}
          >
            Draft
          </button>
        </div>

        <button onClick={() => setModalState(true)}>Create Draft</button>
      </div>
      <div className="mt-4 space-y-4">
        {modePostState &&
          postState.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              detail={post.content}
              date={post.created_at}
            ></BlogCard>
          ))}
        {!modePostState &&
          postState.map((post, index) => (
            <BlogCardDaft
              key={index}
              title={post.title}
              detail={post.content}
              date={post.created_at}
              id={post.id}
              onPublishSave={() => handlePublishSave(post)}
            ></BlogCardDaft>
          ))}
      </div>

      <div>
        {modalState && (
          <Modal onSave={handleModalSave} setModalState={setModalState}></Modal>
        )}
      </div>
    </div>
  );
}
