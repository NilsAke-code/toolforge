import Link from "next/link";
import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="py-20 sm:py-28">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Developer tools that just work.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Free online tools for developers. Format JSON, encode Base64, convert
          timestamps and more &mdash; fast, private, and right in your browser.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/tools"
            className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Browse Tools
          </Link>
          <Link
            href="/tools/json-formatter"
            className="inline-flex h-10 items-center rounded-lg border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Try JSON Formatter
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Popular Tools
          </h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
