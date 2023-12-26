import authOptions from "@/app/auth/authOptions";
import {
  ProfileCreationFormType,
  profileCreationSchema,
} from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json("Not Authorized", { status: 401 });
  }

  const body: ProfileCreationFormType = await request.json();
  const validation = profileCreationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const {
    links,
    bio,
    location,
    skills,
    education,
    name,
    workExperience,
    projects,
  } = body;

  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user) {
    return NextResponse.json("No User Found", { status: 404 });
  }

  await prisma.user.updateMany({
    where: {
      id: user.id,
    },
    data: {
      name: name,
      bio,
      location,
      links: {
        github: links.github,
        linkedin: links.github,
        website: links.portfolio,
      },
      skills: skills,
      accountComplete: true,
    },
  });

  workExperience.map(async (work) => {
    await prisma.work_Experience.create({
      data: {
        title: work.title,
        description: work.description,
        userId: user.id,
        company: work.company,
        location: work.location,
        startDate: work.startDate,
        endDate: work.endDate,
      },
    });
  });

  projects.map(async (project) => {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        skills: project.skills,
        userId: user.id,
      },
    });
  });

  education.map(async (edu) => {
    await prisma.education.create({
      data: {
        degree: edu.degree,
        school: edu.school,
        location: edu.location,
        startDate: edu.startDate,
        endDate: edu.endDate,
        userId: user.id,
      },
    });
  });

  return NextResponse.json("Success", { status: 201 });
}
