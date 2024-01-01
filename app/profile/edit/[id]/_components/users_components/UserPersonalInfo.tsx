import { UserType } from "@/app/validationSchema";
import { Heading } from "@radix-ui/themes";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { inputClass } from "../ProfileCompletionForm";
import ErrorCallout from "@/app/components/ErrorCallout";
import { ChildrenPropsType } from "./UserForm";

interface Props {
  register: UseFormRegister<UserType>;
  errors: FieldErrors<UserType>;
}

const UserPersonalInfo = ({ props }: ChildrenPropsType) => {
  const { register, errors } = props;

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
    </>
  );
};

export default UserPersonalInfo;
