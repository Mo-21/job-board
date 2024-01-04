import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body: { userId: string; resumeId: string } = await request.json();

  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!job) {
    return NextResponse.json("Issue not found", { status: 404 });
  }

  await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      usersId: [body.userId],
    },
  });

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      resume: body.resumeId,
    },
  });

  return NextResponse.json({ status: 201 });
}
