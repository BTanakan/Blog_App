import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div>
          {" "}
          <button>Post</button>
          <button>Draft</button>
        </div>
      </div>
    </div>
  );
}
