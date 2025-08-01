import Link from "next/link";
import { getAllPosts } from "~/lib/posts";
import { Mail, Github, Twitter, Rss } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

function Header() {
  const name = "Mason Secky-Koebel";

  return (
    <header className="flex justify-between items-center p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{name}</h1>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Mail className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Github className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Twitter className="h-5 w-5" />
        </Button>
        <Link href="/rss" target="_blank">
          <Button variant="ghost" size="icon">
            <Rss className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}

function Description() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <p className="text-lg leading-relaxed text-gray-600">
        I graduated from{" "}
        <Link
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Northwestern
        </Link>
        . While there, I founded{" "}
        <Link
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Raiso
        </Link>
        , an AI organization focused on safety and education. I was intern #1,
        and a founding engineer at{" "}
        <Link
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Flexpa
        </Link>
        , an a16z and apollo-backed startup building plaid for healthcare claims
        data. We were recently named one of the most promising healthcare
        startups. I left Flexpa to co-found{" "}
        <Link
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Pathize Health
        </Link>
        , where we built a platform for Long COVID care.
      </p>

      <p className="text-lg leading-relaxed text-gray-600 mt-6">
        I am currently the founding engineer at{" "}
        <Link
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Wizard Perks
        </Link>
        , where we&apos;re building a modern perks platform (in Chicago 🐻). I
        write infrequently about technology and startups.
      </p>
    </div>
  );
}

function PostsSection() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
        Writing
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <h3 className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors underline">
                {post.title}
              </h3>
              <time className="text-sm text-gray-500">
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
                <div className="w-8 h-8 bg-purple-500 rounded flex-shrink-0 flex items-center justify-center">
                  <div className="text-white font-bold">WP</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Wizard Perks - Founding Engineer
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
                I&apos;m currently the founding engineer at Wizard Perks.
              </p>

              <p className="text-gray-600">
                Modern perks companies are still largely based on newsletters.
                We&apos;re building a modern alternative, with exclusive perks
                at national merchants. We&apos;re backed by{" "}
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
                If you&apos;re interested in working with us,{" "}
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  reach out
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
                <div className="w-8 h-8 bg-blue-500 rounded flex-shrink-0 flex items-center justify-center">
                  <div className="text-white font-bold">BL</div>
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
            <div className="pt-4 pb-2">
              <p className="text-gray-600">
                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  Yakov
                </Link>{" "}
                was an advisor and consultant at Pathize. After I left Pathize,
                he was at the top of my list of people to work with.
              </p>

              <p className="text-gray-600">
                BLH is working on clinical infrastructure/tooling that lets
                clinics that offer novel therapeutics (like ketamine,
                psilocybin, etc.) to scale their operations, and accept
                insurance.
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
                <div className="w-8 h-8 bg-green-200 rounded flex-shrink-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-full relative">
                    <div className="absolute inset-1 bg-green-200 rounded-full"></div>
                  </div>
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
                I co-founded Pathize Health late in 2022.
              </p>

              <p className="text-gray-600">
                The bet was simple: Long COVID and its associated comorbidities
                was the largest public health risk in the country.
              </p>

              <p className="text-gray-600">
                From this, the product became simple: build a symptom and
                real-time activity tracker, and then expand into tech-enabled
                services / telehealth.
              </p>

              <p className="text-gray-600">
                I spent twelve months straight building Pathize, created the
                user acquisition funnel, and took the company to a projected
                $75K in ARR. It was the first time someone paid for something I
                had made.
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
                <div className="w-8 h-8 bg-black rounded flex-shrink-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <div className="w-1.5 h-1.5 bg-white"></div>
                  </div>
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
                <div className="w-8 h-8 bg-black rounded flex-shrink-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <div className="w-1.5 h-1.5 bg-white"></div>
                  </div>
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
                  I was the third developer hired at Flexpa after graduating
                  from Northwestern.
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
                <div className="w-8 h-8 bg-gray-800 rounded flex-shrink-0 flex items-center justify-center">
                  <div className="text-white font-bold">BD</div>
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
                  I was the first web developer at Brinc Drones, back when Blake
                  was the only employee, and we were working out of his
                  parents&apos; house.
                </p>

                <p className="text-gray-600">
                  While that may not sound too impressive, he was 19 at the
                  time. He received private funding in September of 2020, and as
                  of writing, Brinc is worth $300M. While I basically just
                  maintained the website, this was my first proper foray into
                  startups.
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
                <div className="w-8 h-8 bg-red-100 rounded flex-shrink-0 flex items-center justify-center">
                  <div className="text-xs font-bold text-red-600">HFF</div>
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

                <p className="text-gray-600">
                  At this point in my life, getting a job and keeping one pushed
                  me far out of my comfort zone. I was a fairly introverted kid,
                  and had a hard time looking people in the eye. I actually used
                  to wear sunglasses so it was easier.
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
      <PostsSection />
      <WorkSection />
      <NewsSection />
    </div>
  );
}
