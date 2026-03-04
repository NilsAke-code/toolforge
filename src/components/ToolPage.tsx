import Link from "next/link";
import type { Tool } from "@/lib/tools";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageProps {
  title: string;
  intro: React.ReactNode;
  toolUI: React.ReactNode;
  features?: string[];
  howToUse?: { step: number; text: string }[];
  example?: React.ReactNode;
  faq?: FAQ[];
  relatedTools?: Tool[];
}

export function ToolPage({
  title,
  intro,
  toolUI,
  features,
  howToUse,
  example,
  faq,
  relatedTools,
}: ToolPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          {title}
        </h1>
        <div className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {intro}
        </div>
      </div>

      <div className="mb-12">{toolUI}</div>

      {features && features.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Features
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {howToUse && howToUse.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            How to Use
          </h2>
          <ol className="space-y-3">
            {howToUse.map((s) => (
              <li key={s.step} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {s.step}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {s.text}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {example && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Example
          </h2>
          {example}
        </section>
      )}

      {faq && faq.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            FAQ
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-800"
              >
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.question}
                </summary>
                <p className="px-4 pb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Related Tools
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-blue-600 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-blue-400"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
