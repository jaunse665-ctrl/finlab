"use server"

import { prisma } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getPostIts() {
  try {
    return await prisma.networkingPost.findMany({
      orderBy: { createdAt: "asc" }
    });
  } catch (error) {
    console.error("Error fetching post-its:", error);
    return [];
  }
}

export async function createPostIt(data: { authorName: string, content: string, color: string, x: number, y: number }) {
  try {
    const post = await prisma.networkingPost.create({
      data
    });
    revalidatePath("/networking");
    return post;
  } catch (error) {
    console.error("Error creating post-it:", error);
    return null;
  }
}

export async function updatePostItPosition(id: string, x: number, y: number) {
  try {
    await prisma.networkingPost.update({
      where: { id },
      data: { x, y }
    });
    // We don't revalidate path here to avoid jitter during drag, 
    // the client handles its own optimistic UI and polling handles the rest.
    return true;
  } catch (error) {
    console.error("Error updating position:", error);
    return false;
  }
}

export async function deletePostIt(id: string) {
  try {
    await prisma.networkingPost.delete({
      where: { id }
    });
    revalidatePath("/networking");
    return true;
  } catch (error) {
    console.error("Error deleting post-it:", error);
    return false;
  }
}

export async function updatePostItContent(id: string, content: string) {
  try {
    await prisma.networkingPost.update({
      where: { id },
      data: { content }
    });
    revalidatePath("/networking");
    return true;
  } catch (error) {
    console.error("Error updating post-it content:", error);
    return false;
  }
}

export async function likePostIt(id: string) {
  try {
    await prisma.networkingPost.update({
      where: { id },
      data: { likes: { increment: 1 } }
    });
    return true;
  } catch (error) {
    console.error("Error liking post-it:", error);
    return false;
  }
}
