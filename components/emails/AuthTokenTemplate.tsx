import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DerashAuthEmailProps {
  userFirstname: string;
  token: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const DerashAuthEmail = ({
  userFirstname,
  token
}: DerashAuthEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The Derash team welcomes you!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/derash-logo.png`}
          width="170"
          height="50"
          alt="Derash"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Derash, the perfect food delivery platform for food enthusiasts, restaurant business gurus, and go-getter drivers.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`http://localhost:3000/authenticate/${token}`}>
            Authenticate your account
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Derash team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

DerashAuthEmail.PreviewProps = {
  userFirstname: "Yunus",
  token: '123456',
} as DerashAuthEmailProps;

export default DerashAuthEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
