import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  res: NextResponse,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: { userId: params.id },
      include: { creater: true },
    });
    console.log(prompts);
    return NextResponse.json({ data: prompts }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
