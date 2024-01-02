import { jobSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const recruiter = await getServerSession();

  if (!recruiter) return NextResponse.json("No User Found", { status: 400 });

  const currentRecruiter = await prisma.user.findUnique({
    where: {
      email: recruiter.user.email,
    },
  });

  const validation = jobSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
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

  await prisma.job.create({
    data: {
      company,
      description,
      level,
      location,
      qualifications,
      title,
      skills,
      recruiterId: currentRecruiter?.id,
    },
  });

  return NextResponse.json({ status: 201 });
}
