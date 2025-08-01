import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <Button variant="ghost" asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <span>←</span>
            <span>🏠 Return home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
