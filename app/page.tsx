import { db } from "@/db";
import Link from "next/link";
export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between p-2 items-center border rounded"
      >
        {snippet.title}
        <div>View</div>
      </Link>
    );
  });
  return (
    <div className="mt-10">
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-1">{renderedSnippets}</div>
    </div>
  );
}
