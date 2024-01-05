import React from "react";
import {
  Html,
  Body,
  Preview,
  Container,
  Text,
  Link,
  Tailwind,
} from "@react-email/components";

const SuccessfulApp = () => {
  return (
    <Html>
      <Tailwind>
        <Body>
          <Preview>Welcome to Next.js</Preview>
          <Container className="bg-white p-4 font-sans text-gray-800">
            <Text>Dear User,</Text>
            <Text>
              Thank you for your interest in the role. We have received your
              application and we are currently reviewing your qualifications. We
              appreciate your patience as we evaluate all the candidates. We
              will contact you within the next to inform you of the next steps.
              If you have any questions, please feel free to contact us. Thank
              you again for applying and we hope to hear from you soon.
            </Text>
            <Text>Sincerely,</Text>
            <Text>You Job Board Team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default SuccessfulApp;
