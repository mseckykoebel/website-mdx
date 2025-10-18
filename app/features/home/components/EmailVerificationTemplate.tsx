import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

export function EmailVerificationTemplate({
  verificationUrl,
}: {
  verificationUrl: string;
}) {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto px-[40px] py-[40px]">
            {/* header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-black m-0">
                Confirm your email
              </Text>
            </Section>

            {/* main content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-black leading-[24px] mb-[24px]">
                Quickly confirm your email to sign up.
              </Text>
              <Text className="text-[16px] text-black leading-[24px] mb-[24px]">
                Thanks for subscribing!
              </Text>
              <Text className="text-[16px] text-black leading-[24px] mb-[24px]">
                - Mason
              </Text>

              {/* confirmation button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={verificationUrl}
                  className="bg-black text-white px-[32px] py-[12px] text-[16px] font-medium rounded-[8px] box-border"
                >
                  Confirm Email
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
                <br />
                {verificationUrl}
              </Text>

              <Text className="text-[10px] text-gray-600 leading-[16px] mb-[24px]">
                This confirmation link will expire in 24 hours for security
                purposes.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                River North
                <br />
                Chicago, IL 60642
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] mt-[8px] m-0">
                © 2025 Quinten Moser, LLC
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
