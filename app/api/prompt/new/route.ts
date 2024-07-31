import prisma from "../../../../prisma/client";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userId, prompt, tag } = await request.json();

  try {
    console.log(userId);
    const newPrompt = await prisma.prompt.create({
      data: {
        userId: userId,
        prompt: prompt,
        tag: tag,
      },
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
