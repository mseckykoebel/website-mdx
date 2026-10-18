import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "~/lib/posts";

import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Header } from "~/app/components/Header";
import { SectionHeading } from "~/app/components/SectionHeading";
import { EntryList } from "~/app/components/EntryList";

function Description({ ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="max-w-2xl mx-auto px-6" {...props}>
      <p className="text-body text-foreground">
        I am the CTO of{" "}
        <Link
          href="https://www.wizardperks.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          Wizard Perks
        </Link>
        , where we help employees and gig workers access non-public discounts.
      </p>

      {/*<p className="text-body text-foreground mt-6">
        Previously, I was the founder of{" "}
        <Link
          href="https://www.linkedin.com/company/pathize"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          Pathize Health
        </Link>
        , a telehealth platform for Long COVID care. We were Drive
        Capital&apos;s first{" "}
        <Link
          href="https://drivecapital.com/seed-program"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          seed investment
        </Link>{" "}
        in Chicago.
      </p>*/}

      <p className="text-body text-foreground mt-6">
        I write infrequently about life and startups.
      </p>
    </div>
  );
}

function PostsSection({ ...props }: ComponentPropsWithoutRef<"div">) {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto px-6 pt-10" {...props}>
      <SectionHeading>Writing</SectionHeading>
      <EntryList
        entries={posts.map((post) => ({
          href: `/posts/${post.slug}`,
          title: post.title,
          date: post.date,
        }))}
      />
      <Button variant="outline" size="sm" asChild className="mt-5">
        <Link href="/posts">View all</Link>
      </Button>
    </div>
  );
}

function PublicationsSection({ ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-10" {...props}>
      <SectionHeading>Publications</SectionHeading>
      <ul className="space-y-2">
        <li>
          <Link
            href="https://www.psychologytoday.com/us/blog/shouldstorm/202404/the-many-reasons-for-hope-in-long-covid"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium text-heading"
          >
            The Many Reasons for Hope in Long Covid
          </Link>
        </li>
        <li>
          <Link
            href="https://www.forbes.com/sites/gusalexiou/2023/10/18/pathize-app-uses-biometrics-to-help-long-covid-patients-manage-their-fatigue/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium text-heading"
          >
            Pathize App Uses Biometrics To Help Long Covid Patients Manage Their
            Fatigue
          </Link>
        </li>
        <li>
          <Link
            href="https://www.bizjournals.com/chicago/inno/stories/fundings/2023/01/24/health-tech-startup-jupiterdx-preseed.html"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium text-heading"
          >
            Health tech startup JupiterDX to launch platform for long Covid care
          </Link>
        </li>
        <li>
          <Link
            href="https://www.axios.com/pro/health-tech-deals/2022/06/16/flexpa-raises-9m-seed-health-data-sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium text-heading"
          >
            Flexpa raises $8.5M to build new infrastructure for patient access
            APIs
          </Link>
        </li>
      </ul>
    </div>
  );
}

function WorkSection({ ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-10" {...props}>
      <SectionHeading>Work</SectionHeading>

      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem
          value="wizard-perks"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/wizard.png"
                    alt="Big Leap Health"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={false}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Wizard Perks - CTO
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    January 2025 - Present
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2 space-y-3">
              <p className="text-body text-foreground">
                I&apos;ve been the CTO of Wizard Perks since January 2025.
              </p>

              <p className="text-body text-foreground">
                We help employees and gig workers access non-public discounts,
                specifically through their employer. We&apos;re profitable and
                growing, and are live with great partners like{" "}
                <Link
                  href="https://www.payactiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Payactiv
                </Link>{" "}
                and{" "}
                <Link
                  href="https://unifiservice.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  UNIFI
                </Link>
                . We&apos;re backed by{" "}
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Village Global
                </Link>
                .
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="big-leap"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/bigleaphealth.png"
                    alt="Big Leap Health"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={false}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Big Leap Health - Software Engineer
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    September 2024 - December 2024
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2 space-y-3">
              <p className="text-body text-foreground">
                I&apos;m passionate about mental health and briefly worked at
                Big Leap Health as a software engineer. I believe in psychedelic
                therapy in general and its potential to help get people unstuck.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="pathize-health"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/pathize.png"
                    alt="Pathize Health"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={false}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Pathize Health - Co-founder, CTO
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    November 2022 - April 2024
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2 space-y-3">
              <p className="text-body text-foreground">
                Pathize&apos;s bet was simple: Long COVID was one of the largest
                public health risks in the country. Nobody was paying attention
                to it.
              </p>

              <p className="text-body text-foreground">
                We built the first real-time activity tracker for
                energy-limiting conditions. It could track energy expenditure of
                everyday activities (washing dishes, walking the dog, etc.)
                instead of workouts.
              </p>

              <p className="text-body text-foreground">
                Before I left, we were working on a move into telehealth. The
                company was at $3K MRR, and had hundreds of happy paying users.
                I was the first time I was paid for software I had built.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="flexpa-dev"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/flexpa.png"
                    alt="Flexpa"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={false}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Flexpa - Software Developer
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    June 2022 - November 2022
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2 space-y-3">
              <p className="text-body text-foreground">
                I was the third developer hired at Flexpa after graduating from
                Northwestern.
              </p>

              <p className="text-body text-foreground">
                By the time I joined Flexpa, their product, &quot;Plaid for
                Healthcare&quot;, was in full swing.
              </p>

              <p className="text-body text-foreground">
                With the time I spent there, I made core contributions to the
                OAuth widget, as well as worked on a theming system.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="flexpa-intern"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/flexpa.png"
                    alt="Flexpa"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={false}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Flexpa - Software Developer (Intern)
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    June 2021 - December 2021
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <div className="space-y-3">
                <p className="text-body text-foreground">
                  My first internship was at Flexpa, where I learned how to
                  write quality code for the first time.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="brinc"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/brinc.png"
                    alt="Brinc"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={false}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Brinc - Web Developer
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    January 2020 - January 2021
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <div className="space-y-3">
                <p className="text-body text-foreground">
                  My first programming/web dev job was at BRINC Drones, back
                  when Blake was the only employee. At the time, he was working
                  out of his parents house.
                </p>

                <p className="text-body text-foreground">
                  BRINC recently raised a $125M Series B.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="hurds-farm"
          className="rounded-lg border px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src="/images/hurds.png"
                    alt="Hurds Family Farm"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    quality={50}
                    priority={true}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">
                    Hurds Family Farm
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    August 2015 - October 2015
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <div className="space-y-3">
                <p className="text-body text-foreground">
                  Technically my first job. I parked cars for about eight hours
                  a day, several days a week.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <Description />

      <PostsSection role="main" />
      {/* <WorkSection /> */}
      <PublicationsSection />
    </div>
  );
}
