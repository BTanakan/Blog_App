import { format } from "date-fns";

export default function BlogCardDaft({
  title,
  detail,
  date,
}: {
  title: string;
  detail: string;
  date: string;
}) {
  const dateDisplay = (date: string) => {
    return format(new Date(date), "dd-MM-yyyy HH:mm");
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
          <button className=" border-l-2 border-t-2  border-black px-4 text-lg">
            Publish
          </button>
          <button className=" border-l-2 border-t-2  border-black px-4 text-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
