import Link from "next/link";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group rounded-lg border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {tool.description}
      </p>
    </Link>
  );
}
