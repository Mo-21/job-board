import ErrorCallout from "@/app/components/ErrorCallout";
import { Heading } from "@radix-ui/themes";
import {  inputClass } from "./ProfileCompletionForm";
import { RecruiterChildrenType } from "./RecruiterForm";

const PersonalInfo = ({ register, errors }: RecruiterChildrenType) => {
  return (
    <>
      <Heading mb="5">Personal Information</Heading>
      <input
        type="text"
        placeholder="Name"
        className={inputClass}
        {...register("name")}
      />
      {errors.name && <ErrorCallout>{errors?.name?.message}</ErrorCallout>}

      <textarea
        cols={30}
        rows={100}
        className={inputClass}
        placeholder="Bio"
        {...register("bio")}
      />
      {errors.bio && <ErrorCallout>{errors?.bio?.message}</ErrorCallout>}

      <input
        type="text"
        className={inputClass}
        placeholder="Location"
        {...register("location")}
      />
      {errors.location && (
        <ErrorCallout>{errors?.location?.message}</ErrorCallout>
      )}

      <input
        type="text"
        placeholder="Company"
        className={inputClass}
        {...register("company")}
      />
      {errors.company && (
        <ErrorCallout>{errors?.company?.message}</ErrorCallout>
      )}
    </>
  );
};

export default PersonalInfo;
