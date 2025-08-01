import { Button } from "~/components/ui/button";
import { Mail, Github, Twitter } from "lucide-react";
import Link from "next/link";

function Header() {
  const name = "Mason Secky-Koebel";

  return (
    <header className="flex justify-between items-center p-6">
      <h1 className="text-xl sm:text-2xl font-bold">{name}</h1>
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
      </div>
    </header>
  );
}

function Description() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <p className="text-lg leading-relaxed text-gray-500">
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

      <p className="text-lg leading-relaxed text-gray-500 mt-6">
        I am currently the founding engineer at{" "}
        <Link
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900 transition-colors"
        >
          Wizard Perks
        </Link>
        , where we&apos;re building a modern perks platform (in Chicago 🐻). I write
        infrequently about technology and startups.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <Description />
    </div>
  );
}
