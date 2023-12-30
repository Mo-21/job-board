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
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export type RecruiterType = z.infer<typeof recruiterProfileCreationSchema>;

interface Props {
  page: number;
  params: { id: string };
}

const RecruiterForm = ({ page, params }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruiterType>({
    resolver: zodResolver(recruiterProfileCreationSchema),
    mode: "onChange",
  });

  const router = useRouter();

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

  console.log(errors);

  const onSubmit: SubmitHandler<RecruiterType> = async (data, e) => {
    e?.preventDefault();
    console.log(data);
    const res = await axios
      .patch(`/api/register/profile/recruiters/${params.id}`, data)
      .catch((err) => {
        console.log(err);
        toast.error(
          "Something went wrong, please check your entries one more time"
        );
      })
      .finally(() => {
        setIsSubmitted(false);
        // router.push(`/profile/${params.id}`);
      });

    console.log(res);
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
      <Toaster />
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
