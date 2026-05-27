"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { softDeleteSeoPage, upsertSeoPage } from "@/lib/db/admin-queries";

function parseFaqs(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...answerParts] = line.split("|");
      return {
        question: question?.trim() ?? "",
        answer: answerParts.join("|").trim()
      };
    })
    .filter((faq) => faq.question && faq.answer);
}

function parseSchemaJson(value: string) {
  if (!value.trim()) {
    return {};
  }

  return JSON.parse(value);
}

export async function saveSeoPageAction(formData: FormData) {
  const id = String(formData.get("id") ?? "") || undefined;
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const h1 = String(formData.get("h1") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const pageType = String(formData.get("pageType") ?? "landing").trim();
  const published = formData.get("published") === "on";
  const faqs = parseFaqs(String(formData.get("faqs") ?? ""));
  const schemaJson = parseSchemaJson(String(formData.get("schemaJson") ?? ""));

  if (!slug || !title || !description) {
    throw new Error("Slug, title, and description are required.");
  }

  await upsertSeoPage({
    id,
    slug,
    title,
    description,
    h1,
    content,
    pageType,
    schemaJson,
    published,
    faqs
  });

  revalidatePath("/admin/seo-pages");
  redirect("/admin/seo-pages");
}

export async function deleteSeoPageAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (id) {
    await softDeleteSeoPage(id);
  }

  revalidatePath("/admin/seo-pages");
  redirect("/admin/seo-pages");
}
