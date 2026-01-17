import { prisma } from "@/app/_libs/prisma";
import { NextResponse } from "next/server";

//GET
export type CategoriesIndexResponse = {
  categories: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json<CategoriesIndexResponse>(
      { categories },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

//POST
export type CreateCategoryRequestBody = {
  name: string;
};

export type CreateCategoryResponse = {
  id: number;
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // bodyの中からnameを取り出す
    const { name }: CreateCategoryRequestBody = body;
    // カテゴリーをDBに生成
    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json<CreateCategoryResponse>({
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
};
