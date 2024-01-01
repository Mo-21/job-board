import UserImage from "@/app/components/UserImage";
import { prisma } from "@/prisma/client";
import { User } from "@prisma/client";
import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Table,
  Text
} from "@radix-ui/themes";
import Link from "next/link";

const RecruitersProfilePage = async ({
  params,
}: {
  params: { id: string };
}) => {
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

  const tables = [
    { label: "Personal Info", value: <PersonalInfo user={user} /> },
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
          <Button variant="solid">
            <Link href={`/profile/edit/${user.id}`}>Edit Profile</Link>
          </Button>
        </Flex>
        <Flex direction="column" gap="7" className="col-span-4">
          {tables.map((table) => (
            <Flex direction="column" gap="3" key={table.label}>
              <Heading size="5">{table.label}</Heading>
              {table.value}
            </Flex>
          ))}
        </Flex>
      </Grid>
    </Container>
  );
};

const PersonalInfo = ({ user }: { user: User }) => {
  return (
    <Table.Root className="col-span-3" color="green">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Company</Table.ColumnHeaderCell>
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
          <Table.Cell>
            <Text>{user.company}</Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default RecruitersProfilePage;
