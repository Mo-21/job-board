import authOptions from "@/app/auth/authOptions";
import { jobSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { Job } from "@prisma/client";
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

  const body: Job = await request.json();
  const validation = jobSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const {
    company,
    description,
    level,
    location,
    qualifications,
    skills,
    title,
  } = validation.data;

  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!job) {
    return NextResponse.json("Issue not found", { status: 404 });
  }

  const updatedIssue = await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      title,
      description,
      company,
      level,
      location,
      qualifications,
      skills,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const job = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!job) {
    return NextResponse.json("Job not found", { status: 404 });
  }

  await prisma.job.delete({
    where: {
      id: job.id,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
