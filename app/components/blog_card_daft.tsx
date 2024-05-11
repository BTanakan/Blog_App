import axios from "axios";
import { format } from "date-fns";

export default function BlogCardDaft({
  title,
  detail,
  date,
  id,
}: {
  title: string;
  detail: string;
  date: string;
  id: string;
}) {
  const dateDisplay = (date: string) => {
    return format(new Date(date), "dd-MM-yyyy HH:mm");
  };

  const onPublish = async (postId: String) => {
    try {
      const response = await axios.patch(
        `https://post-api.opensource-technology.com/api/posts/${postId}`,

        {
          published: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        console.log("success", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (postId: String) => {
    try {
      const response = await axios.delete(
        `https://post-api.opensource-technology.com/api/posts/${postId}`
      );

      if (response.status === 204) {
        console.log("success", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-black pl-4 pt-2 space-y-4">
      <p className=" font-bold text-2xl">{title}</p>
      <p>{detail}</p>
      <div className=" flex justify-between">
        <p>{dateDisplay(date)}</p>
        <div>
          <button className=" border-l-2 border-t-2  border-black px-4 text-lg">
            Edit
          </button>
          <button
            onClick={() => onPublish(id)}
            className=" border-l-2 border-t-2  border-black px-4 text-lg"
          >
            Publish
          </button>
          <button
            onClick={() => onDelete(id)}
            className=" border-l-2 border-t-2  border-black px-4 text-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
