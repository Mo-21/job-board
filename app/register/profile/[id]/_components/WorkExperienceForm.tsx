import ErrorCallout from "@/app/components/ErrorCallout";
import { Heading, Card, Button } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { FormProps, inputClass } from "./profileCompletionForm";

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

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Location"
                  className={inputClass}
                  {...register(`workExperience.${index}.location`)}
                />
                {errors.workExperience &&
                  errors?.workExperience[index]?.location && (
                    <ErrorCallout>
                      {errors?.workExperience[index]?.location?.message}
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

export default WorkExperience;
