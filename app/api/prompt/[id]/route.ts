import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
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
    console.log("id is here", params.id);
    const prompts = await prisma.prompt.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json({ data: prompts }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const { prompt, tag } = await req.json();

    const prompts = await prisma.prompt.update({
      where: {
        id: params.id as string,
      },
      data: {
        prompt,
        tag,
      },
    });
    return NextResponse.json(
      { data: prompts, message: "Success" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export const DELETE = async (
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
    await prisma.prompt.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      { message: "successfully deleted" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
