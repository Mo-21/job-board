"use client";
import {
  Button,
  Card,
  Heading,
  TextField,
  Flex,
} from "@radix-ui/themes";
import styles from "../styles/RegisterPage.module.css";

const Register = () => {
  return (
    <Flex
      style={{ height: "100vh" }}
      direction="column"
      justify="center"
      align="center"
    >
      <Card variant="surface" color="indigo" className={styles.card}>
        <Heading mb="3">Register</Heading>
        <form>
          <Flex gap="3" width="100%">
            <TextField.Input mb="3" size="2" placeholder="First Name" />
            <TextField.Input mb="3" size="2" placeholder="Last Name" />
          </Flex>
          <TextField.Input mb="3" size="2" placeholder="Email" />
          <TextField.Input mb="3" size="2" placeholder="Password" />
          <TextField.Input mb="3" size="2" placeholder="Repeat Password" />
          <Button>Join</Button>
        </form>
      </Card>
    </Flex>
  );
};

export default Register;
