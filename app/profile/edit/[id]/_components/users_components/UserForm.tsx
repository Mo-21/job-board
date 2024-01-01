import ErrorCallout from "@/app/components/ErrorCallout";
import SelectMenu from "@/app/components/SkillsSelect";
import Spinner from "@/app/components/Spinner";
import { UserType, userProfileCreationSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import React, { useState } from "react";
import { Control, FieldErrors, SubmitHandler, UseFormRegister, UseFormSetValue, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Education from "./EducationForm";
import Projects from "./ProjectsForm";
import UserLinks from "./UserLinks";
import UserPersonalInfo from "./UserPersonalInfo";
import WorkExperience from "./WorkExperienceForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserForm = ({ userArrayProps, params, page }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userProfileCreationSchema),
    defaultValues,
  });

  const childrenProps: ChildrenPropsType = {
    props: {
      register,
      errors,
      control,
      blocks: userArrayProps,
      defaultValues,
      setValue,
    },
  };

  const userPages = [
    {
      label: "personal_info",
      value: <UserPersonalInfo props={childrenProps.props} />,
    },
    {
      label: "projects",
      value: <Projects props={childrenProps.props} />,
    },
    {
      label: "education",
      value: <Education props={childrenProps.props} />,
    },
    {
      label: "work_experience",
      value: <WorkExperience props={childrenProps.props} />,
    },
    {
      label: "links_skills",
      value: <SkillsAndLinks props={childrenProps.props} />,
    },
  ];

  const router = useRouter();

  const onSubmit: SubmitHandler<UserType> = async (data, e) => {
    e?.preventDefault();

    data.workExperience = formatDatesInArray<Work>(data.workExperience);
    data.education = formatDatesInArray<Edu>(data.education);

    await axios
      .patch(`/api/register/profile/users/${params.id}`, data)
      .catch((err) => {
        console.log(err);
        toast.error(
          "Something went wrong, please check your entries one more time"
        );
      })
      .finally(() => {
        setIsSubmitted(false);
        router.push(`/profile/${params.id}`);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userPages[page - 2]?.value}

      <Flex>
        {page === 7 && (
          <Button
            type="submit"
            color="green"
            className="flex-1"
            disabled={isSubmitted}
            onClick={() => setIsSubmitted(true)}
          >
            {isSubmitted && <Spinner />}
            Submit
          </Button>
        )}
      </Flex>
      <Toaster />
    </form>
  );
};

const SkillsAndLinks = ({ props }: ChildrenPropsType) => {
  const { setValue, errors } = props;
  return (
    <>
      <Box>
        <Heading mb="5">Skills</Heading>
        <SelectMenu setValue={setValue} />
        {errors.skills && (
          <ErrorCallout>{errors?.skills?.message}</ErrorCallout>
        )}
      </Box>
      <UserLinks props={props} />
    </>
  );
};

function formatDatesInArray<T extends { startDate: string; endDate: string }>(
  array: T[]
): T[] {
  return array.map((item) => ({
    ...item,
    startDate: item.startDate ? new Date(item.startDate)?.toISOString() : null,
    endDate: item.endDate ? new Date(item.endDate)?.toISOString() : null,
  }));
}

const defaultValues = {
  projects: [
    {
      title: "",
      description: "Very cool project",
      skills: ["HTML", "CSS"],
    },
  ],
  education: [
    {
      school: "Oxford",
      degree: "Diploma",
      location: "London",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  ],
  workExperience: [
    {
      title: "Intern",
      company: "X",
      description: "Very nice internship",
      location: "Chicago",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  ],
};

interface Props {
  userArrayProps: {
    education: {
      educationBlock: number;
      setEducationBlock: React.Dispatch<React.SetStateAction<number>>;
    };
    work: {
      workBlock: number;
      setWorkBlock: React.Dispatch<React.SetStateAction<number>>;
    };
    projects: {
      projectBlock: number;
      setProjectBlock: React.Dispatch<React.SetStateAction<number>>;
    };
  };
  params: { id: string };
  page: number;
}

export interface ChildrenPropsType {
  props: {
    register: UseFormRegister<UserType>;
    errors: FieldErrors<UserType>;
    control: Control<UserType>;
    blocks: Props["userArrayProps"];
    setValue: UseFormSetValue<UserType>;
    defaultValues: any;
  };
}

interface Work {
  title: string;
  company: string;
  description?: string | null;
  location: string;
  startDate: string;
  endDate: string;
}

interface Edu {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export default UserForm;
