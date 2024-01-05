import { Card, Flex, Heading } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RegisterLoading = () => {
  return (
    <Flex
      style={{ height: "80vh" }}
      direction="column"
      justify="center"
      align="center"
    >
      <Card variant="surface" color="indigo">
        <Heading mb="3">Register</Heading>
        <form className="grid grid-rows-auto grid-cols-2">
          <Skeleton width="20rem" />
          <div className="flex flex-col justify-center w-auto col-start-2">
            <Skeleton width="20rem" count={5} />
          </div>

          <Skeleton width="20rem" />
        </form>
      </Card>
      <Toaster />
    </Flex>
  );
};

export default RegisterLoading;
