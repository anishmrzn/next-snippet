"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    //this needs tobe a server action
    // "use server";
    // return { messgae: "Title must be longer" };

    if (typeof title !== "string" || title.length < 3) {
      return { messgae: "Title must be longer" };
    }
    if (typeof code !== "string" || code.length < 3) {
      return { messgae: "Title must be longer" };
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return {
        messgae: "something went worng",
      };
    }
  }
  redirect("/");
}
