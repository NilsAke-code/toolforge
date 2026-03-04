"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Toast } from "@/components/Toast";

const SAMPLE_JSON = `{"name":"ToolForge","version":"1.0.0","description":"Fast and simple developer tools","features":["JSON Formatter","Base64 Encoder","Timestamp Converter"],"settings":{"theme":"dark","autoFormat":true,"indent":2},"author":{"name":"Developer","url":"https://toolforge.dev"}}`;

type IndentSize = 2 | 4;

export function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<IndentSize>(2);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [autoFormat, setAutoFormat] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const formatJSON = useCallback(
    (value?: string) => {
      const raw = value ?? input;
      if (!raw.trim()) {
        setOutput("");
        setError("");
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        setOutput(JSON.stringify(parsed, null, indent));
        setError("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Invalid JSON");
        setOutput("");
      }
    },
    [input, indent]
  );

  const validateJSON = useCallback(() => {
    if (!input.trim()) return;
    try {
      JSON.parse(input);
      setError("");
      setToast({ message: "Valid JSON", visible: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input]);

  const minifyJSON = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }, [input]);

  const copyOutput = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setToast({ message: "Copied!", visible: true });
    });
  }, [output]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    setError("");
    if (autoFormat) {
      try {
        const parsed = JSON.parse(SAMPLE_JSON);
        setOutput(JSON.stringify(parsed, null, indent));
      } catch {
        /* noop */
      }
    }
  }, [autoFormat, indent]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
    inputRef.current?.focus();
  }, []);

  // Load from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const example = params.get("example");
    const data = params.get("data");
    if (example === "nested") {
      setInput(SAMPLE_JSON);
      try {
        setOutput(JSON.stringify(JSON.parse(SAMPLE_JSON), null, indent));
      } catch {
        /* noop */
      }
    } else if (data) {
      try {
        const decoded = decodeURIComponent(data);
        setInput(decoded);
        const parsed = JSON.parse(decoded);
        setOutput(JSON.stringify(parsed, null, indent));
      } catch {
        /* noop */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "Enter") {
        e.preventDefault();
        formatJSON();
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        copyOutput();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [formatJSON, copyOutput]);

  // Auto-format on paste
  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      if (autoFormat && value.trim()) {
        try {
          const parsed = JSON.parse(value);
          setOutput(JSON.stringify(parsed, null, indent));
          setError("");
        } catch {
          // Don't show errors during typing
        }
      }
    },
    [autoFormat, indent]
  );

  const hasInput = input.trim().length > 0;

  return (
    <>
      {/* Action bar */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => formatJSON()}
          disabled={!hasInput}
          className="inline-flex h-8 items-center rounded-md bg-blue-600 px-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Format
        </button>
        <button
          onClick={validateJSON}
          disabled={!hasInput}
          className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Validate
        </button>
        <button
          onClick={minifyJSON}
          disabled={!hasInput}
          className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Minify
        </button>
        <button
          onClick={copyOutput}
          disabled={!output}
          className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Copy
        </button>

        <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-700" />

        <button
          onClick={loadSample}
          className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
        >
          Sample
        </button>
        <button
          onClick={clearAll}
          disabled={!hasInput && !output}
          className="inline-flex h-8 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
        >
          Clear
        </button>

        <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-700" />

        {/* Indent selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Indent:
          </span>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value) as IndentSize)}
            className="h-8 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>

        {/* Auto-format toggle */}
        <label className="ml-auto flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            checked={autoFormat}
            onChange={(e) => setAutoFormat(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-zinc-300 accent-blue-600"
          />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Auto-format
          </span>
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Editor panes */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label
            htmlFor="json-input"
            className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400"
          >
            Input JSON
          </label>
          <textarea
            ref={inputRef}
            id="json-input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste your JSON here..."
            spellCheck={false}
            className="h-80 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-blue-500 lg:h-96"
          />
        </div>
        <div>
          <label
            htmlFor="json-output"
            className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400"
          >
            Output
          </label>
          <textarea
            ref={outputRef}
            id="json-output"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            spellCheck={false}
            className="h-80 w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 lg:h-96"
          />
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-600">
        <kbd className="rounded border border-zinc-200 px-1 py-0.5 font-mono text-[10px] dark:border-zinc-700">
          Ctrl+Enter
        </kbd>{" "}
        Format &nbsp;
        <kbd className="rounded border border-zinc-200 px-1 py-0.5 font-mono text-[10px] dark:border-zinc-700">
          Ctrl+Shift+C
        </kbd>{" "}
        Copy
      </p>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
