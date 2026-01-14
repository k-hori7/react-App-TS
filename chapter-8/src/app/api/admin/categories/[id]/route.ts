import { prisma } from "@/app/_libs/prisma";
import { NextRequest, NextResponse } from "next/server";

//GET

export type CategoryShowResponse = {
  category: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "カテゴリーが見つかりません。" },
        { status: 404 }
      );
    }

    return NextResponse.json<CategoryShowResponse>(
      { category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

//PUT

export type UpdateCategoryRequestBody = {
  name: string;
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ここでリクエストパラメータを受け取る
) => {
  const { id } = await params;
  const { name }: UpdateCategoryRequestBody = await request.json();

  try {
    // idを指定して、Categoryを更新
    await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

//DELETE

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    // idを指定して、Categoryを削除
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
