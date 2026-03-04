export interface Tool {
  name: string;
  slug: string;
  description: string;
  category: string;
}

export const tools: Tool[] = [
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format, validate, and beautify JSON data instantly in your browser.",
    category: "Formatters",
  },
  {
    name: "Base64 Encoder",
    slug: "base64-encoder",
    description: "Encode and decode Base64 strings quickly online.",
    category: "Encoders",
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa.",
    category: "Converters",
  },
  {
    name: "JSON to CSV Converter",
    slug: "json-to-csv",
    description: "Convert JSON arrays to CSV format for easy data export.",
    category: "Converters",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
