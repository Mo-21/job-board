"use client";
import { GlobeIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Card, Flex, TextField } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoginSkeleton = () => {
  return (
    <Flex justify="center" align="center" className="h-screen">
      <Card variant="classic">
        <Flex direction="column" mb="4">
          <form className="flex flex-col gap-2 h-40 w-60">
            <TextField.Root>
              <TextField.Slot>
                <GlobeIcon height="16" width="16" />
              </TextField.Slot>
              <Skeleton width="17rem" />
            </TextField.Root>

            <TextField.Root>
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
              <Skeleton width="17rem" />
            </TextField.Root>

            <Skeleton width="20rem" count={4} />
          </form>
        </Flex>

        <Flex gap="2" justify="center" align="center">
          <Skeleton width="20rem" />
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginSkeleton;
