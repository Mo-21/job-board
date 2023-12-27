"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, Heading } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { Session } from "next-auth";
import { ReactNode, useState } from "react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import ErrorCallout from "@/app/components/ErrorCallout";
import SelectMenu from "@/app/components/SkillsSelect";
import Spinner from "@/app/components/Spinner";
import styles from "@/app/styles/ProfileForm.module.css";
import {
  ProfileCreationFormType,
  profileCreationSchema,
} from "@/app/validationSchema";
import Education from "./EducationForm";
import Links from "./Links&Skills";
import PersonalInfo from "./PersonalInfo";
import Projects from "./ProjectsForm";
import WorkExperience from "./WorkExperienceForm";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  page: number;
  session: Session | undefined | null;
  params: { id: string };
}

const ProfileCompletionForm = ({ page, session, params }: Props) => {
  const [workBlock, setWorkBlock] = useState(1);
  const [educationBlock, setEducationBlock] = useState(1);
  const [projectBlock, setProjectBlock] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
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
    projects: [
      {
        title: "",
        description: "Very cool project",
        skills: ["HTML", "CSS"],
      },
    ],
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileCreationFormType>({
    resolver: zodResolver(profileCreationSchema),
    mode: "onChange",
    defaultValues,
  });

  const pages: { label: string; value: ReactNode }[] = [
    {
      label: "personal_info",
      value: (
        <PersonalInfo
          key="personalInfo"
          register={register}
          errors={errors}
          session={session}
        />
      ),
    },
    {
      label: "projects",
      value: (
        <Projects
          key="projects"
          register={register}
          errors={errors}
          control={control}
          projectBlock={projectBlock}
          setProjectBlock={setProjectBlock}
          setValue={setValue}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      label: "education",
      value: (
        <Education
          key="education"
          register={register}
          errors={errors}
          control={control}
          educationBlock={educationBlock}
          setEducationBlock={setEducationBlock}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      label: "work_experience",
      value: (
        <WorkExperience
          key="workExperience"
          register={register}
          errors={errors}
          control={control}
          workBlock={workBlock}
          setWorkBlock={setWorkBlock}
          defaultValues={defaultValues}
        />
      ),
    },
    {
      label: "links_skills",
      value: (
        <>
          <Box>
            <Heading mb="5">Skills</Heading>
            <SelectMenu setValue={setValue} />
            {errors.skills && (
              <ErrorCallout>{errors?.skills?.message}</ErrorCallout>
            )}
          </Box>
          <Links register={register} errors={errors} />
        </>
      ),
    },
  ];

  const router = useRouter();

  const onSubmit: SubmitHandler<ProfileCreationFormType> = async (data, e) => {
    e?.preventDefault();

    for (let i = 0; i < data.workExperience.length; i++) {
      const formattedWorkDated = {
        startDate: new Date(data.workExperience[i]?.startDate).toISOString(),
        endDate: new Date(data.workExperience[i]?.endDate).toISOString(),
      };
      data.workExperience[i].startDate = formattedWorkDated.startDate;
      data.workExperience[i].endDate = formattedWorkDated.endDate;
    }
    for (let i = 0; i < data.education.length; i++) {
      const formattedEduDated = {
        startDate: new Date(data.education[i]?.startDate).toISOString(),
        endDate: new Date(data.education[i]?.endDate).toISOString(),
      };
      data.education[i].startDate = formattedEduDated.startDate;
      data.education[i].endDate = formattedEduDated.endDate;
    }

    await axios
      .patch(`/api/register/profile/${params.id}`, data)
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
    <Card
      className={classNames({
        [styles.page_container]: true,
        [styles.active]: page === page,
      })}
    >
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_group}>
        <Box className={styles.input_container}>{pages[page - 1].value}</Box>

        {page === 5 && (
          <Button
            type="submit"
            color="green"
            disabled={isSubmitted}
            className={styles.next_button}
            onClick={() => setIsSubmitted(true)}
          >
            {isSubmitted && <Spinner />}
            Submit
          </Button>
        )}
      </form>
    </Card>
  );
};

export const inputClass =
  "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 h-9";

export interface FormProps {
  session?: Session | undefined | null;
  register: UseFormRegister<ProfileCreationFormType>;
  errors: FieldErrors<ProfileCreationFormType>;
  control?: Control<ProfileCreationFormType>;
  defaultValues?: {
    education: {
      school: string;
      degree: string;
      location: string;
      startDate: string;
      endDate: string;
    }[];
    workExperience: {
      title: string;
      company: string;
      description: string;
      location: string;
      startDate: string;
      endDate: string;
    }[];
    projects: {
      title: string;
      description: string;
      skills: string[];
    }[];
  };
}

export default ProfileCompletionForm;
