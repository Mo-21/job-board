import authOptions from "@/app/auth/authOptions";
import JobList from "@/app/components/JobList";
import UserImage from "@/app/components/UserImage";
import { prisma } from "@/prisma/client";
import { Education, Project, User, Work_Experience } from "@prisma/client";
import {
  Badge,
  Container,
  Flex,
  Grid,
  Heading,
  Table,
  Text,
  Button,
} from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      education: {
        where: {
          userId: params.id,
        },
      },
      projects: {
        where: {
          userId: params.id,
        },
      },
      workExperience: {
        where: {
          userId: params.id,
        },
      },
    },
  });

  if (!user) return <Text>Not Found</Text>;

  const jobsApplied = await prisma.job.findMany({
    where: { usersId: { has: user.id } },
  });

  const tables = [
    { label: "Personal Info", value: <PersonalInfo user={user} /> },
    { label: "Skills", value: <Skills skills={user.skills} /> },
    { label: "Projects", value: <Projects projects={user.projects} /> },
    {
      label: "Education",
      value: <EducationHistory education={user.education} />,
    },
    { label: "Work Experience", value: <Work work={user.workExperience} /> },
  ];

  return (
    <Container my="5" px="5">
      <Grid
        columns={{
          initial: "1",
          md: "5",
        }}
      >
        <Flex direction="column" align="center" gap="5" className="col-span-1">
          <UserImage
            props={{
              image: user.image,
              size: "9",
              width: 100,
              height: 100,
            }}
          />
          <Text>{user.bio}</Text>
          {session?.user.id === user.id && (
            <Button variant="solid">
              <Link href={`/profile/edit/${user.id}`}>Edit Profile</Link>
            </Button>
          )}
        </Flex>
        <Flex direction="column" gap="7" className="col-span-4">
          {tables.map((table) => (
            <Flex direction="column" gap="3" key={table.label}>
              {table.value}
            </Flex>
          ))}
          {session?.user.id === user.id && (
            <>
              <Heading>Jobs Applied</Heading>
              <JobList jobs={jobsApplied} />
            </>
          )}
        </Flex>
      </Grid>
    </Container>
  );
};

const PersonalInfo = ({ user }: { user: User }) => {
  return (
    <>
      <Heading size="5">Personal Info</Heading>
      <Table.Root className="col-span-3" color="green">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>{user.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{user.email}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{user.location}</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
};

const Skills = ({ skills }: { skills: string[] }) => {
  if (skills.length === 0) return null;
  return (
    <>
      <Heading size="5">Skills</Heading>
      <Table.Root className="col-span-3" color="green">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Skills</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {skills.map((skill) => (
                <Badge mr="2" key={skill}>
                  {skill}
                </Badge>
              ))}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  );
};

const Projects = ({ projects }: { projects: Project[] }) => {
  if (projects.length === 0) return null;
  return (
    <>
      <Heading size="5">Projects</Heading>
      <Table.Root className="col-span-3" color="green">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Skills</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <Text>{project.title}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{project.description}</Text>
              </Table.Cell>
              <Table.Cell>
                {project.skills.map((skill) => (
                  <Badge mr="2" key={skill}>
                    {skill}
                  </Badge>
                ))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

const EducationHistory = ({ education }: { education: Education[] }) => {
  if (education.length === 0) return null;
  return (
    <>
      <Heading size="5">Education</Heading>
      <Table.Root className="col-span-3" color="green">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>School</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {education.map((edu) => (
            <Table.Row key={edu.id}>
              <Table.Cell>
                <Text>{edu.degree}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{edu.school}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{edu.location}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{edu.startDate.toISOString().split("T")[0]}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{edu.endDate.toISOString().split("T")[0]}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

const Work = ({ work }: { work: Work_Experience[] }) => {
  if (work.length === 0) return null;
  return (
    <>
      <Heading size="5">Work Experience</Heading>
      <Table.Root className="col-span-3" color="green">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>School</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {work.map((work) => (
            <Table.Row key={work.id}>
              <Table.Cell>
                <Text>{work.title}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{work.company}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{work.location}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{work.description}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{work.startDate.toISOString().split("T")[0]}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{work.endDate.toISOString().split("T")[0]}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ProfilePage;
