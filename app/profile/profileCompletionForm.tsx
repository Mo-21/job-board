"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Box, Heading, Flex, Button } from "@radix-ui/themes";
import classNames from "classnames";
import { useState, useEffect } from "react";
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldErrors,
  Control,
} from "react-hook-form";
import ErrorCallout from "../components/ErrorCallout";
import {
  ProfileCreationFormType,
  profileCreationSchema,
} from "../validationSchema";
import { Props } from "./ProfileCompletion";
import styles from "../styles/ProfileForm.module.css";
import { Session } from "next-auth";

const inputClass =
  "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 h-9";

interface FormProps {
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
      startDate: string;
      endDate: string;
    }[];
  };
}

const ProfileCompletionForm = ({ page, session }: Props) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [workBlock, setWorkBlock] = useState<number>(1);
  const [educationBlock, setEducationBlock] = useState(1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const defaultValues = {
    education: [
      {
        school: "",
        degree: "",
        location: "",
        startDate: Date.now().toLocaleString(),
        endDate: Date.now().toLocaleString(),
      },
    ],
    workExperience: [
      {
        title: "",
        company: "",
        description: "",
        startDate: Date.now().toLocaleString(),
        endDate: Date.now().toLocaleString(),
      },
    ],
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileCreationFormType>({
    resolver: zodResolver(profileCreationSchema),
    mode: "onChange",
    defaultValues,
  });

  return (
    <Card
      className={classNames({
        [styles.page_container]: true,
        [styles.active]: currentPage === page,
      })}
    >
      <form className={styles.form_group}>
        <Box className={styles.input_container}>
          {currentPage === 1 && (
            <PersonalInfo
              register={register}
              errors={errors}
              session={session}
            />
          )}

          {currentPage === 2 && (
            <Education
              register={register}
              errors={errors}
              control={control}
              educationBlock={educationBlock}
              setEducationBlock={setEducationBlock}
              defaultValues={defaultValues}
            />
          )}

          {currentPage === 3 && (
            <WorkExperience
              register={register}
              errors={errors}
              control={control}
              workBlock={workBlock}
              setWorkBlock={setWorkBlock}
              defaultValues={defaultValues}
            />
          )}

          {currentPage === 4 && <Links register={register} errors={errors} />}
        </Box>
      </form>
    </Card>
  );
};

const PersonalInfo = ({ session, register }: FormProps) => {
  return (
    <>
      <Heading mb="5">Personal Information</Heading>
      <input
        type="text"
        value={session?.user?.name!}
        placeholder="Name"
        className={inputClass}
      />
      <input
        type="email"
        value={session?.user?.email!}
        placeholder="Email"
        className={inputClass}
      />
      <textarea
        cols={30}
        rows={100}
        className={inputClass}
        placeholder="Bio"
        {...register("bio")}
      />
      <input
        type="text"
        className={inputClass}
        placeholder="Location"
        {...register("location")}
      />
    </>
  );
};

const Education = ({
  register,
  errors,
  control,
  defaultValues,
  educationBlock,
  setEducationBlock,
}: FormProps & {
  educationBlock: number;
  setEducationBlock: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    fields: educationFields,
    append: appendEducationField,
    remove: removeEducationField,
  } = useFieldArray({
    name: "education",
    control,
  });

  return (
    <>
      <Heading mb="5">Academic History</Heading>
      {educationFields.map((item, index) => {
        return (
          <Card mt="3" key={item.id}>
            <section key={item.id}>
              <input
                type="text"
                placeholder="Degree"
                className={inputClass}
                {...register(`education.${index}.degree`)}
              />
              {errors.education && errors?.education[index]?.degree && (
                <ErrorCallout>
                  {errors?.education[index]?.degree?.message}
                </ErrorCallout>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="School"
                  className={inputClass}
                  {...register(`education.${index}.school`)}
                />
                {errors.education && errors?.education[index]?.school && (
                  <ErrorCallout>
                    {errors?.education[index]?.school?.message}
                  </ErrorCallout>
                )}

                <input
                  type="text"
                  placeholder="School Location"
                  className={inputClass}
                  {...register(`education.${index}.location`)}
                />
                {errors.education && errors?.education[index]?.location && (
                  <ErrorCallout>
                    {errors?.education[index]?.location?.message}
                  </ErrorCallout>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <label className="mb-3 font-bold" htmlFor="start_date">
                  Start
                </label>
                <input
                  type="date"
                  name="start_date"
                  placeholder="Start Date"
                  className={inputClass}
                  {...(register(`education.${index}.startDate`),
                  { required: true })}
                />
                {errors.education && errors?.education[index]?.startDate && (
                  <ErrorCallout>
                    {errors?.education[index]?.startDate?.message}
                  </ErrorCallout>
                )}

                <label className="mb-3 font-bold" htmlFor="end_date">
                  End
                </label>
                <input
                  type="date"
                  name="end_date"
                  placeholder="End Date"
                  className={inputClass}
                  {...(register(`education.${index}.endDate`),
                  { required: true })}
                />
              </div>
              {errors.education && errors?.education[index]?.endDate && (
                <ErrorCallout>
                  {errors?.education[index]?.endDate?.message}
                </ErrorCallout>
              )}

              {educationBlock > 1 && (
                <Button
                  type="button"
                  variant="solid"
                  color="red"
                  my="3"
                  onClick={() => {
                    removeEducationField(index);
                    setEducationBlock(educationBlock - 1);
                  }}
                >
                  Delete
                </Button>
              )}

              {educationBlock < 2 && (
                <Button
                  type="button"
                  variant="solid"
                  color="green"
                  my="3"
                  onClick={() => {
                    appendEducationField(defaultValues?.education!);
                    setEducationBlock(educationBlock + 1);
                  }}
                >
                  Add new one
                </Button>
              )}
            </section>
          </Card>
        );
      })}
    </>
  );
};

const WorkExperience = ({
  register,
  errors,
  control,
  defaultValues,
  workBlock,
  setWorkBlock,
}: FormProps & {
  workBlock: number;
  setWorkBlock: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    fields: workExperienceFields,
    append: appendWorkExperienceField,
    remove: removeWorkExperienceField,
  } = useFieldArray({
    name: "workExperience",
    control,
  });

  return (
    <>
      <Heading mb="5">Work History</Heading>
      {workExperienceFields.map((item, index) => {
        return (
          <Card mt="3" key={item.id}>
            <section key={item.id}>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Title"
                  className={inputClass}
                  {...register(`workExperience.${index}.title`)}
                />
                {errors.workExperience &&
                  errors?.workExperience[index]?.title && (
                    <ErrorCallout>
                      {errors?.workExperience[index]?.title?.message}
                    </ErrorCallout>
                  )}

                <input
                  type="text"
                  placeholder="Company"
                  className={inputClass}
                  {...register(`workExperience.${index}.company`)}
                />
                {errors.workExperience &&
                  errors?.workExperience[index]?.company && (
                    <ErrorCallout>
                      {errors?.workExperience[index]?.company?.message}
                    </ErrorCallout>
                  )}
              </div>
              <div className="flex gap-2 items-center">
                <label className="mb-3 font-bold" htmlFor="start_date">
                  Start
                </label>
                <input
                  type="date"
                  name="start_date"
                  placeholder="Start Date"
                  className={inputClass}
                  {...(register(`workExperience.${index}.startDate`),
                  { required: true })}
                />
                {errors.workExperience &&
                  errors?.workExperience[index]?.startDate && (
                    <ErrorCallout>
                      {errors?.workExperience[index]?.startDate?.message}
                    </ErrorCallout>
                  )}

                <label className="mb-3 font-bold" htmlFor="end_date">
                  End
                </label>
                <input
                  type="date"
                  name="end_date"
                  placeholder="End Date"
                  className={inputClass}
                  {...(register(`workExperience.${index}.endDate`),
                  { required: true })}
                />
                {errors.workExperience &&
                  errors?.workExperience[index]?.endDate && (
                    <ErrorCallout>
                      {errors?.workExperience[index]?.endDate?.message}
                    </ErrorCallout>
                  )}
              </div>

              <div className="flex flex-col">
                <textarea
                  rows={30}
                  cols={50}
                  placeholder="Description"
                  className={inputClass}
                  {...register(`workExperience.${index}.description`)}
                />
                {errors.workExperience &&
                  errors?.workExperience[index]?.description && (
                    <ErrorCallout>
                      {errors?.workExperience[index]?.description?.message}
                    </ErrorCallout>
                  )}
              </div>

              {workBlock > 1 && (
                <Button
                  type="button"
                  variant="solid"
                  color="red"
                  my="3"
                  onClick={() => {
                    removeWorkExperienceField(index);
                    setWorkBlock(workBlock - 1);
                  }}
                >
                  Delete
                </Button>
              )}

              {workBlock < 2 && (
                <Button
                  type="button"
                  variant="solid"
                  color="green"
                  my="3"
                  onClick={() => {
                    appendWorkExperienceField(defaultValues?.workExperience!);
                    setWorkBlock(workBlock + 1);
                  }}
                >
                  Add new one
                </Button>
              )}
            </section>
          </Card>
        );
      })}
    </>
  );
};

const Links = ({ register, errors }: FormProps) => {
  return (
    <Flex direction="column">
      <Heading mb="5">Links</Heading>
      <input
        type="text"
        className={inputClass}
        placeholder="LinkedIn"
        {...register("links.linkedin")}
      />
      {errors.links && errors.links.linkedin && (
        <ErrorCallout>{errors.links.linkedin.message}</ErrorCallout>
      )}

      <input
        type="text"
        className={inputClass}
        placeholder="GitHub"
        {...register("links.github")}
      />
      {errors.links && errors.links.github && (
        <ErrorCallout>{errors.links.github.message}</ErrorCallout>
      )}

      <input
        type="text"
        className={inputClass}
        placeholder="Portfolio"
        {...register("links.portfolio")}
      />
      {errors.links && errors.links.portfolio && (
        <ErrorCallout>{errors.links.portfolio.message}</ErrorCallout>
      )}
    </Flex>
  );
};

export default ProfileCompletionForm;
