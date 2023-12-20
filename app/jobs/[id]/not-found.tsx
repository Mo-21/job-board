import { Card, Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";

const NotFoundJobPage = () => {
  return (
    <Container>
      <Card>
        <Flex>
          <Heading>Job not found</Heading>
        </Flex>
      </Card>
    </Container>
  );
};

export default NotFoundJobPage;
