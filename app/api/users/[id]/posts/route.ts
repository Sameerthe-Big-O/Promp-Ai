import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    console.log(params);

    if (params) {
      const prompts = await prisma.prompt.findMany({
        where: { userId: params.id },
        include: { creater: true },
      });
      console.log(prompts);
      return NextResponse.json({ data: prompts }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
