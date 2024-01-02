"use client";
import "easymde/dist/easymde.min.css";
import { jobSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Container, Select, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import Spinner from "@/app/components/Spinner";
import ErrorCallout from "@/app/components/ErrorCallout";
import { Job, Level } from "@prisma/client";
import SelectMenu from "@/app/components/SkillsSelect";
import axios from "axios";
import { useRouter } from "next/navigation";

export type JobType = z.infer<typeof jobSchema>;

const JobForm = ({ job }: { job?: Job | null }) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobType>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      await axios
        .post("/api/jobs/create", data)
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsSubmitting(false);
          router.push("/jobs");
          router.refresh();
        });
    } catch (error) {
      setError("Something went wrong");
    }
  });

  return (
    <Container className="space-y-4 max-w-xl mt-4 pl-4">
      {error && (
        <Callout.Root className="mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={job?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorCallout>{errors.title?.message}</ErrorCallout>

        <TextField.Root>
          <TextField.Input
            defaultValue={job?.company}
            placeholder="Company"
            {...register("company")}
          />
        </TextField.Root>
        <ErrorCallout>{errors.company?.message}</ErrorCallout>

        <TextField.Root>
          <TextField.Input
            defaultValue={job?.location}
            placeholder="Location"
            {...register("location")}
          />
        </TextField.Root>
        <ErrorCallout>{errors.location?.message}</ErrorCallout>

        <Select.Root
          required
          onValueChange={(value: Level) => setValue("level", value)}
        >
          <Select.Trigger defaultValue="Select Level" />
          <Select.Content>
            <Select.Item value="JUNIOR">Junior</Select.Item>
            <Select.Item value="MIDDLE">Middle</Select.Item>
            <Select.Item value="SENIOR">Senior</Select.Item>
            <Select.Item value="MANAGER">Manager</Select.Item>
          </Select.Content>
        </Select.Root>
        <ErrorCallout>{errors.level?.message}</ErrorCallout>

        <SelectMenu setJobsSkills={setValue} />
        <ErrorCallout>{errors.skills?.message}</ErrorCallout>

        <Controller
          name="description"
          control={control}
          defaultValue={job?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorCallout>{errors.description?.message}</ErrorCallout>

        <Controller
          name="qualifications"
          control={control}
          defaultValue={job?.qualifications}
          render={({ field }) => (
            <SimpleMDE placeholder="Qualifications" {...field} />
          )}
        />
        <ErrorCallout>{errors.description?.message}</ErrorCallout>
        <Button color="green">
          {job ? "Update Issue" : "Create Issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Container>
  );
};

export default JobForm;
