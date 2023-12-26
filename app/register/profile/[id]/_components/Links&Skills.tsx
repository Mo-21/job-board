import ErrorCallout from "@/app/components/ErrorCallout";
import { Flex, Heading } from "@radix-ui/themes";
import { inputClass, FormProps } from "./profileCompletionForm";

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

export default Links;
