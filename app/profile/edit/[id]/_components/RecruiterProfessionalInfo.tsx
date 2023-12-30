import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RecruiterType } from "./RecruiterForm";
import ErrorCallout from "@/app/components/ErrorCallout";
import { inputClass } from "./ProfileCompletionForm";
import Links from "./Links";

interface InfoProps {
  register: UseFormRegister<RecruiterType>;
  errors: FieldErrors<RecruiterType>;
}

const RecruiterProfessionalInfo = ({ register, errors }: InfoProps) => {
  return (
    <>
      <div>
        <Links register={register} errors={errors} />
      </div>
    </>
  );
};

export default RecruiterProfessionalInfo;
