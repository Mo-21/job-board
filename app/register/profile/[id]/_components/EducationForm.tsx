import ErrorCallout from "@/app/components/ErrorCallout";
import { Heading, Card, Button } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { FormProps, inputClass } from "./profileCompletionForm";

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
                  placeholder="Start Date"
                  className={inputClass}
                  {...register(`education.${index}.startDate`, {
                    required: true,
                  })}
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
                  placeholder="End Date"
                  className={inputClass}
                  {...register(`education.${index}.endDate`, {
                    required: true,
                  })}
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

export default Education;
