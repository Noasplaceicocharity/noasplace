"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";

type VacancyMarkdownProps = {
  source: string;
  className?: string;
};

export default function VacancyMarkdown({ source, className }: VacancyMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw]}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
