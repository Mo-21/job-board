import Spinner from "@/app/components/Spinner";
import { RecruiterType, recruiterProfileCreationSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Links from "./Links";
import PersonalInfo from "./PersonalInfo";

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
      value: <PersonalInfo register={register} errors={errors} />,
    },
    {
      label: "professional_info",
      value: <Links register={register} errors={errors} />,
    },
  ];

  const onSubmit: SubmitHandler<RecruiterType> = async (data, e) => {
    e?.preventDefault();
    await axios
      .patch(`/api/register/profile/recruiters/${params.id}`, data)
      .catch((err) => {
        toast.error(
          "Something went wrong, please check your entries one more time"
        );
      })
      .finally(() => {
        setIsSubmitted(false);
        router.push(`/profile/${params.id}`);
      });
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
            disabled={isSubmitted}
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

export default RecruiterForm;
