import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "All Developer Tools",
  description:
    "Browse all free online developer tools. JSON formatter, Base64 encoder, timestamp converter and more.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
        All Tools
      </h1>
      <p className="mt-3 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
        Free developer utilities that run entirely in your browser. No sign-up
        required.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
