import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) return NextResponse.json("User not found", { status: 400 });

  return NextResponse.json(user, { status: 200 });
}
