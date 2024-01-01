import authOptions from "@/app/auth/authOptions";
import {
  RecruiterType,
  recruiterProfileCreationSchema,
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

  const body: RecruiterType = await request.json();
  const validation = recruiterProfileCreationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { links, bio, location, name, company } = body;

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
      company,
      role: "RECRUITER",
      links: {
        github: links.github,
        linkedin: links.github,
        website: links.portfolio,
      },
      accountComplete: true,
    },
  });

  return NextResponse.json("Success", { status: 201 });
}
