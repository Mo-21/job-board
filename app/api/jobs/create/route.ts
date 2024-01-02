import { jobSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const recruiter = await getServerSession();

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
      recruiterId: recruiter?.user.id,
    },
  });

  return NextResponse.json({ status: 201 });
}
