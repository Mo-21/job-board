import ErrorCallout from "@/app/components/ErrorCallout";
import SelectMenu from "@/app/components/SkillsSelect";
import { Button, Card, Heading } from "@radix-ui/themes";
import { useFieldArray } from "react-hook-form";
import { inputClass } from "../ProfileCompletionForm";
import { ChildrenPropsType } from "./UserForm";

const Projects = ({ props }: ChildrenPropsType) => {
  const { control, errors, register, setValue, blocks, defaultValues } = props;
  const { projectBlock, setProjectBlock } = blocks.projects;

  const {
    fields: projectFields,
    append: appendProjectField,
    remove: removeProjectField,
  } = useFieldArray({
    name: "projects",
    control,
  });

  return (
    <>
      <Heading mb="5">Projects</Heading>
      {projectFields.map((item, index) => {
        return (
          <Card mt="3" key={item.id}>
            <section className="flex flex-col gap-2" key={item.id}>
              <input
                type="text"
                placeholder="Title"
                className={inputClass}
                {...register(`projects.${index}.title`)}
              />
              {errors.projects && errors?.projects[index]?.title && (
                <ErrorCallout>
                  {errors?.projects[index]?.title?.message}
                </ErrorCallout>
              )}

              <SelectMenu setValue={setValue} />
              {errors.projects && errors?.projects[index]?.skills && (
                <ErrorCallout>
                  {errors?.projects[index]?.skills?.message}
                </ErrorCallout>
              )}

              <textarea
                rows={30}
                cols={50}
                placeholder="Description"
                className={inputClass}
                {...register(`projects.${index}.description`)}
              />
              {errors.projects && errors?.projects[index]?.description && (
                <ErrorCallout>
                  {errors?.projects[index]?.description?.message}
                </ErrorCallout>
              )}

              {projectBlock > 1 && (
                <Button
                  type="button"
                  variant="solid"
                  color="red"
                  my="3"
                  className="w-28"
                  onClick={() => {
                    removeProjectField(index);
                    setProjectBlock(projectBlock - 1);
                  }}
                >
                  Delete
                </Button>
              )}

              {projectBlock < 2 && (
                <Button
                  type="button"
                  variant="solid"
                  color="green"
                  className="w-28"
                  my="3"
                  onClick={() => {
                    appendProjectField(defaultValues?.projects);
                    setProjectBlock(projectBlock + 1);
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

export default Projects;
