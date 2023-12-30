import Spinner from "@/app/components/Spinner";
import { recruiterProfileCreationSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import Links from "./Links";
import PersonalInfo from "./PersonalInfo";

export type RecruiterType = z.infer<typeof recruiterProfileCreationSchema>;

const RecruiterForm = ({ page }: { page: number }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruiterType>({
    resolver: zodResolver(recruiterProfileCreationSchema),
    mode: "onChange",
  });

  const pages = [
    {
      label: "personal_info",
      value: <PersonalInfo errors={errors} register={register} />,
    },
    {
      label: "professional_info",
      value: <Links register={register} errors={errors} />,
    },
  ];

  const onSubmit: SubmitHandler<RecruiterType> = (data, e) => {
    e?.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {pages[page - 2]?.value}

      <Flex>
        {page === 3 && (
          <Button
            type="submit"
            color="green"
            className="flex-1"
            // disabled={isSubmitted}
            onClick={() => setIsSubmitted(true)}
          >
            {isSubmitted && <Spinner />}
            Submit
          </Button>
        )}
      </Flex>
    </form>
  );
};

interface RecruiterForm {
  name: string;
  location: string;
  company: string;
  links: {
    linkedin?: string | null | undefined;
    github?: string | null | undefined;
    portfolio?: string | null | undefined;
  };
  bio?: string | null | undefined;
}

export interface RecruiterChildrenType {
  register: UseFormRegister<RecruiterForm>;
  errors: FieldErrors<RecruiterForm>;
}

export default RecruiterForm;
