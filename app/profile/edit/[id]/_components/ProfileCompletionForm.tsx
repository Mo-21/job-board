"use client";
import styles from "@/app/styles/ProfileForm.module.css";
import { Box, Card } from "@radix-ui/themes";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import RoleSelect from "./RoleSelect";
import RecruiterForm from "./recruiter_components/RecruiterForm";
import UserForm from "./users_components/UserForm";

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

  const [workBlock, setWorkBlock] = useState(1);
  const [educationBlock, setEducationBlock] = useState(1);
  const [projectBlock, setProjectBlock] = useState(1);

  const userArrayProps = {
    education: {
      educationBlock,
      setEducationBlock,
    },
    work: {
      workBlock,
      setWorkBlock,
    },
    projects: {
      projectBlock,
      setProjectBlock,
    },
  };

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
          <UserForm
            params={params}
            page={page}
            userArrayProps={userArrayProps}
          />
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

export default ProfileCompletionForm;
