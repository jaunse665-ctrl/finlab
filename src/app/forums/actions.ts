"use server"

import { auth, prisma } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getTimeline() {
  const posts = await prisma.forumPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        }
      },
      replies: {
        orderBy: { createdAt: 'asc' },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            }
          }
        }
      }
    }
  });
  
  return posts;
}

export async function createPost(content: string, title: string = "Post") {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const post = await prisma.forumPost.create({
    data: {
      content,
      title, // Fallback title
      authorId: session.user.id,
    }
  });

  revalidatePath('/forums');
  return post;
}

export async function createReply(postId: string, content: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const reply = await prisma.forumReply.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
    }
  });

  revalidatePath('/forums');
  return reply;
}

export async function likePost(postId: string) {
  const session = await auth()
  if (!session?.user?.id) return;

  // We simply increment the likes count for now
  await prisma.forumPost.update({
    where: { id: postId },
    data: { likes: { increment: 1 } }
  });

  revalidatePath('/forums');
}

export async function likeReply(replyId: string) {
  const session = await auth()
  if (!session?.user?.id) return;

  await prisma.forumReply.update({
    where: { id: replyId },
    data: { likes: { increment: 1 } }
  });

  revalidatePath('/forums');
}
