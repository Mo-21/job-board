import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const jobs = await prisma.job.findMany({
    where: { recruiterId: session.user.id },
  });

  if (!jobs) return NextResponse.json({}, { status: 200 });

  return NextResponse.json(jobs, { status: 200 });
}
