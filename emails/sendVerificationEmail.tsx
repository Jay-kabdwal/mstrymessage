import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';


interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text> 
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}/*
This code defines a React component for rendering a verification email.
It uses various components from the `@react-email/components` library to structure the email's HTML content.

- `Html`: The root HTML element for the email.
- `Head`: Contains metadata for the email, such as the title and font definitions.
- `Font`: Specifies a custom font (Roboto) to be used in the email, with a fallback font (Verdana).
- `Preview`: Sets the preview text that appears in the email client's inbox before opening the email.
- `Section`: A logical grouping of content within the email.
- `Row`: Represents a row within a section, useful for layout.
- `Heading`: Renders a heading element (e.g., `<h2>`).
- `Text`: Renders a paragraph of text.

The `VerificationEmail` component takes `username` and `otp` (One-Time Password) as props.
It constructs an email that greets the user, provides the OTP, and includes a disclaimer.
*/
