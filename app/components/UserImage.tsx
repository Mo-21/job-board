"use client";
import { Avatar, Responsive } from "@radix-ui/themes";
import { CldImage } from "next-cloudinary";
import React, { forwardRef } from "react";

interface Props {
  props: {
    image: string | null | undefined;
    class?: string;
    height?: number;
    width?: number;
    size?:
      | Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">
      | undefined;
    avatarClass?: string;
    cloudClass?: string;
  };
}

const UserImage = ({ props }: Props) => {
  return (
    <>
      {props.image?.startsWith("https") ? (
        <Avatar
          src={props?.image}
          fallback="?"
          variant="soft"
          radius="full"
          size={props.size}
          alt="user-image"
          className={`cursor-pointer ${props.avatarClass}`}
        />
      ) : (
        <CldImage
          width={props.width}
          height={props.height}
          crop="fill"
          className={`rounded-full cursor-pointer ${props.cloudClass}`}
          src={props?.image!}
          alt="user-image"
        />
      )}
    </>
  );
};

UserImage.displayName = "UserImage";

export default UserImage;
