import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { tools } from "@/lib/tools";
import { JsonFormatterClient } from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter – Format & Validate JSON Online",
  description:
    "Free JSON formatter and validator. Beautify JSON instantly, validate syntax and copy formatted JSON.",
};

const UNFORMATTED = `{"name":"ToolForge","version":"1.0","features":["format","validate","minify"]}`;
const FORMATTED = `{
  "name": "ToolForge",
  "version": "1.0",
  "features": [
    "format",
    "validate",
    "minify"
  ]
}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Formatter",
  url: "https://toolforge.dev/tools/json-formatter",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free JSON formatter and validator. Beautify JSON instantly, validate syntax and copy formatted JSON.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a JSON formatter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A JSON formatter takes compact or unreadable JSON data and reformats it with proper indentation and line breaks, making it easy to read and debug.",
      },
    },
    {
      "@type": "Question",
      name: "Does formatting JSON change the data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Formatting only changes whitespace and indentation. The actual data, keys, values, and structure remain identical.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the JSON is invalid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formatter will display an error message describing the syntax issue, such as an unexpected token or missing bracket.",
      },
    },
  ],
};

export default function JsonFormatterPage() {
  const relatedTools = tools.filter(
    (t) => t.slug !== "json-formatter"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolPage
      title="JSON Formatter"
      intro={
        <p>
          Paste your JSON and instantly format, beautify, or validate it. This
          free online <strong>JSON formatter</strong> and{" "}
          <strong>JSON beautifier</strong> lets you pretty print JSON with
          customizable indentation. Use it as a <strong>JSON validator</strong>{" "}
          to check syntax errors, or minify JSON to reduce file size.
        </p>
      }
      toolUI={<JsonFormatterClient />}
      features={[
        "Format and beautify JSON",
        "Validate JSON syntax",
        "Minify JSON",
        "Copy formatted JSON",
        "Works instantly in the browser",
      ]}
      howToUse={[
        { step: 1, text: "Paste your JSON into the input field" },
        { step: 2, text: "Click Format JSON to beautify it" },
        { step: 3, text: "Copy the formatted result" },
      ]}
      example={
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Unformatted JSON
            </h3>
            <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {UNFORMATTED}
            </pre>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Formatted JSON
            </h3>
            <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {FORMATTED}
            </pre>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is a JSON formatter?",
          answer:
            "A JSON formatter takes compact or unreadable JSON data and reformats it with proper indentation and line breaks, making it easy to read and debug. It is also known as a JSON beautifier or JSON pretty printer.",
        },
        {
          question: "Does formatting JSON change the data?",
          answer:
            "No. Formatting only changes whitespace and indentation. The actual data, keys, values, and structure remain identical. Minifying reverses the process by removing unnecessary whitespace.",
        },
        {
          question: "What happens if the JSON is invalid?",
          answer:
            "The formatter will display an error message describing the syntax issue, such as an unexpected token or missing bracket. This helps you locate and fix the problem in your JSON data.",
        },
      ]}
      relatedTools={relatedTools}
    />
    </>
  );
}
