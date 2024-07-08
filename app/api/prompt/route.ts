import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        creater: true,
      },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
