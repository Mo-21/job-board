"use client";
import styles from "@/app/styles/ProfileForm.module.css";
import { Box, Card } from "@radix-ui/themes";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, UseFormSetValue } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import RecruiterForm from "./RecruiterForm";
import RoleSelect from "./RoleSelect";
import UserForm from "./UserForm";

export type Role = "RECRUITER" | "JOB_SEEKER";

interface Props {
  setRoleValue: UseFormSetValue<{
    role: Role;
  }>;
  roleErrors: FieldErrors<{
    role: Role;
  }>;
  page: number;
  value: Role;
  params: { id: string };
}

export const ProfileCompletionForm = ({
  setRoleValue,
  roleErrors,
  value,
  page,
  params,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>();

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <Card
      className={classNames({
        [styles.page_container]: true,
        [styles.active]: page === currentPage,
      })}
    >
      <Box className={styles.form_group}>
        {currentPage === 1 && (
          <RoleSelect roleErrors={roleErrors} setRoleValue={setRoleValue} />
        )}
        {currentPage && currentPage > 1 && value === "RECRUITER" ? (
          <RecruiterForm params={params} page={page} />
        ) : value === "JOB_SEEKER" ? (
          <UserForm />
        ) : (
          ""
        )}
      </Box>
      <Toaster />
    </Card>
  );
};

export const inputClass =
  "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 h-9";

export interface FormProps {
  errors: FieldErrors<{ role: "RECRUITER" | "JOB_SEEKER" }>;
  defaultValues?: {
    education: Edu[];
    workExperience: Work[];
    projects: Project[];
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

interface Project {
  title: string;
  description: string;
  skills: string[];
}

function formatDatesInArray<T extends { startDate: string; endDate: string }>(
  array: T[]
): T[] {
  return array.map((item) => ({
    ...item,
    startDate: item.startDate ? new Date(item.startDate)?.toISOString() : null,
    endDate: item.endDate ? new Date(item.endDate)?.toISOString() : null,
  }));
}

export default ProfileCompletionForm;

// const [workBlock, setWorkBlock] = useState(1);
// const [educationBlock, setEducationBlock] = useState(1);
// const [projectBlock, setProjectBlock] = useState(1);
// const [isSubmitted, setIsSubmitted] = useState(false);

// const [isActive, setIsActive] = useState(false);

// const defaultValues = {
//   education: [
//     {
//       school: "Oxford",
//       degree: "Diploma",
//       location: "London",
//       startDate: new Date().toISOString(),
//       endDate: new Date().toISOString(),
//     },
//   ],
//   workExperience: [
//     {
//       title: "Intern",
//       company: "X",
//       description: "Very nice internship",
//       location: "Chicago",
//       startDate: new Date().toISOString(),
//       endDate: new Date().toISOString(),
//     },
//   ],
//   projects: [
//     {
//       title: "",
//       description: "Very cool project",
//       skills: ["HTML", "CSS"],
//     },
//   ],
// };

// const hasErrors =
//   Object.keys(errors).filter((key) => key !== "skills").length > 0;

// const keysWithErrors = Object.keys(errors).filter(
//   (key) =>
//     errors[key] !== undefined && errors[key] !== null && key !== "skills"
// );

// const value = getValues("role");

// const userPages = [
//   {
//     label: "projects",
//     value: (
//       <Projects
//         key="projects"
//         register={register}
//         errors={errors}
//         control={control}
//         projectBlock={projectBlock}
//         setProjectBlock={setProjectBlock}
//         setValue={setValue}
//         defaultValues={defaultValues}
//       />
//     ),
//   },
//   {
//     label: "education",
//     value: (
//       <Education
//         key="education"
//         register={register}
//         errors={errors}
//         control={control}
//         educationBlock={educationBlock}
//         setEducationBlock={setEducationBlock}
//         defaultValues={defaultValues}
//       />
//     ),
//   },
//   {
//     label: "work_experience",
//     value: (
//       <WorkExperience
//         key="workExperience"
//         register={register}
//         errors={errors}
//         control={control}
//         workBlock={workBlock}
//         setWorkBlock={setWorkBlock}
//         defaultValues={defaultValues}
//       />
//     ),
//   },
//   {
//     label: "links_skills",
//     value: (
//       <>
//         <Box>
//           <Heading mb="5">Skills</Heading>
//           <SelectMenu setValue={setValue} />
//           {errors.skills && (
//             <ErrorCallout>{errors?.skills?.message}</ErrorCallout>
//           )}
//         </Box>
//         <Links register={register} errors={errors} />
//       </>
//     ),
//   },
// ];

// const pages = [
//   {
//     label: "personal_info",
//     value: (
//       <PersonalInfo
//         key="personalInfo"
//         register={register}
//         errors={errors}
//         session={session}
//       />
//     ),
//   },
//   ...(value === "RECRUITER" ? recPages : userPages),
//   {
//     label: "last_page",
//     value: (
//       <>
//         {hasErrors
//           ? keysWithErrors.map((key) => (
//               <ErrorCallout
//                 key={key}
//               >{`You have errors in ${key}`}</ErrorCallout>
//             ))
//           : ""}
//         <Button
//           type="submit"
//           color="green"
//           // disabled={isSubmitted}
//           className={styles.next_button}
//           onClick={() => setIsSubmitted(true)}
//         >
//           {isSubmitted && <Spinner />}
//           Submit
//         </Button>
//       </>
//     ),
//   },
// ];

const onSubmit: SubmitHandler<{ role: "RECRUITER" | "JOB_SEEKER" }> = async (
  data,
  e
) => {
  e?.preventDefault();

  // data.workExperience = formatDatesInArray<Work>(data.workExperience);
  // data.education = formatDatesInArray<Edu>(data.education);
  // await axios
  //   .patch(`/api/register/profile/${params.id}`, data)
  //   .catch((err) => {
  //     console.log(err);
  //     toast.error(
  //       "Something went wrong, please check your entries one more time"
  //     );
  //   })
  //   .finally(() => {
  //     setIsSubmitted(false);
  //     router.push(`/profile/${params.id}`);
  //   });
  console.log(data);
};
