import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "~/lib/posts";
import { getAllThoughts } from "~/lib/thoughts";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { NewsletterSection } from "~/app/features/home";
import { Header } from "~/app/components/Header";

function Description() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <p className="text-xl leading-relaxed text-gray-600">
        I am the CTO of{" "}
        <Link
          href="https://www.wizardperks.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Wizard Perks
        </Link>
        , where we help employees and gig workers access non-public discounts
        through their employer.
      </p>

      <p className="text-xl leading-relaxed text-gray-600 mt-6">
        I once raised $650K to build a{" "}
        <Link
          href="https://www.linkedin.com/company/pathize"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          telehealth platform for Long COVID care
        </Link>
        .
      </p>
    </div>
  );
}

function LatestBadge() {
  return <Badge variant="outline">Latest</Badge>;
}

function PostsSection() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Writing
      </h2>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <article key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors underline">
                  {post.title}
                </h3>
                {index === 0 && <LatestBadge />}
              </div>
              <time className="text-md text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          </article>
        ))}
      </div>
      <Button variant="outline" asChild className="mt-6">
        <Link href="/posts">View all</Link>
      </Button>
    </div>
  );
}

function ThoughtsSection() {
  const thoughts = getAllThoughts().slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Thoughts
      </h2>
      <div className="space-y-6">
        {thoughts.map((thought, index) => (
          <article key={thought.slug}>
            <Link href={`/thoughts/${thought.slug}`} className="group block">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors underline">
                  {thought.title}
                </h3>
                {index === 0 && <LatestBadge />}
              </div>
              <time className="text-md text-gray-500">
                {new Date(thought.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          </article>
        ))}
      </div>
      <Button variant="outline" asChild className="mt-6">
        <Link href="/thoughts">View all</Link>
      </Button>
    </div>
  );
}

function NewsSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">News</h2>
      <ul className="space-y-4">
        <li>
          <Link
            href="https://example.com/long-covid-hope"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            The Many Reasons for Hope in Long Covid
          </Link>
        </li>
        <li>
          <Link
            href="https://example.com/pathize-biometrics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            Pathize App Uses Biometrics To Help Long Covid Patients Manage Their
            Fatigue
          </Link>
        </li>
        <li>
          <Link
            href="https://example.com/jupiterdx-launch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            Health tech startup JupiterDX to launch platform for long Covid care
          </Link>
        </li>
        <li>
          <Link
            href="https://example.com/flexpa-raises"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            Flexpa raises $8.5M to build new infrastructure for patient access
            APIs
          </Link>
        </li>
        <li>
          <Link
            href="https://example.com/raiso-safety"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            RAISO Student Group Explores the Responsibility and Safety of AI
          </Link>
        </li>
        <li>
          <Link
            href="https://example.com/raiso-interview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            Responsible AI and RAISO with Bijal Mehta and Mason Secky-Koebel |
            AI with Alex
          </Link>
        </li>
        <li>
          <Link
            href="https://example.com/raiso-awareness"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            New student group spreads awareness of artificial intelligence
            ethics, big data injustices
          </Link>
        </li>
      </ul>
    </div>
  );
}

function WorkSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Work</h2>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="wizard-perks"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Wizard Perks - CTO
                  </div>
                  <div className="text-sm text-gray-500">
                    January 2025 - Present
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 space-y-4">
              <p className="text-gray-600">
                I&apos;ve been the CTO of Wizard Perks since January 2025.
              </p>

              <p className="text-gray-600">
                We help employees and gig workers access non-public discounts,
                specifically through their employer. We&apos;re a more modern
                (and less ugly){" "}
                <Link
                  href="https://www.perksatwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  Perks at Work
                </Link>
                . To date, we&apos;ve done over $300K in revenue, and are live
                with great partners like{" "}
                <Link
                  href="https://www.payactiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  Payactiv
                </Link>{" "}
                and{" "}
                <Link
                  href="https://unifiservice.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  UNIFI
                </Link>
                . We&apos;re backed by{" "}
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  Village Global
                </Link>
                .
              </p>

              <p className="text-gray-600">
                If you&apos;re interested in working with us, you can{" "}
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  reach out here
                </Link>
                .
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="big-leap"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Big Leap Health - Software Engineer
                  </div>
                  <div className="text-sm text-gray-500">
                    September 2024 - Present
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 space-y-4">
              <p className="text-gray-600">
                I&apos;m passionate about mental health and briefly worked at
                Big Leap Health as a software engineer. I believe in psychedelic
                therapy in general and its potential to help get people unstuck.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="pathize-health"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Pathize Health - Co-founder, CTO
                  </div>
                  <div className="text-sm text-gray-500">
                    November 2022 - April 2024
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 space-y-4">
              <p className="text-gray-600">
                Pathize&apos;s bet was simple: Long COVID was one of the largest
                public health risks in the country. Nobody was paying attention
                to it.
              </p>

              <p className="text-gray-600">
                We built the first real-time activity tracker for
                energy-limiting conditions. It could track energy expenditure of
                everyday activities (washing dishes, walking the dog, etc.)
                instead of workouts.
              </p>

              <p className="text-gray-600">
                Before I left, we were working on a move into telehealth. The
                company was at $3K MRR, and had hundreds of happy paying users.
                I was the first time I was paid for software I had built.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="flexpa-dev"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Flexpa - Software Developer
                  </div>
                  <div className="text-sm text-gray-500">
                    June 2022 - November 2022
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 space-y-4">
              <p className="text-gray-600">
                I was the third developer hired at Flexpa after graduating from
                Northwestern.
              </p>

              <p className="text-gray-600">
                By the time I joined Flexpa, their product, &quot;Plaid for
                Healthcare&quot;, was in full swing.
              </p>

              <p className="text-gray-600">
                With the time I spent there, I made core contributions to the
                OAuth widget, as well as worked on a theming system.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="flexpa-intern"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Flexpa - Software Developer (Intern)
                  </div>
                  <div className="text-sm text-gray-500">
                    June 2021 - December 2021
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <div className="space-y-4">
                <p className="text-gray-600">
                  My first internship was at Flexpa, where I learned how to
                  write quality code for the first time.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="brinc"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Brinc - Web Developer
                  </div>
                  <div className="text-sm text-gray-500">
                    January 2020 - January 2021
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <div className="space-y-4">
                <p className="text-gray-600">
                  My first programming/web dev job was at Brinc Drones, back
                  when Blake was the only employee. He was working out of his
                  parents&apos; house at the time.
                </p>

                <p className="text-gray-600">
                  As of writing, Brinc is worth $300M. While I basically just
                  maintained the website, this was my first proper foray into
                  the startup world.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="hurds-farm"
          className="border rounded-lg px-4 last:border-b"
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
                  <div className="font-semibold text-gray-900">
                    Hurds Family Farm
                  </div>
                  <div className="text-sm text-gray-500">
                    August 2015 - October 2015
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <div className="space-y-4">
                <p className="text-gray-600">
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
      <NewsletterSection />
      <ThoughtsSection />
      <PostsSection />
      <WorkSection />
      <NewsSection />
    </div>
  );
}
