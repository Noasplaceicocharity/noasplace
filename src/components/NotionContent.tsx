"use client";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";
import { NotionRenderer } from "react-notion-x";
import "@/styles/notion-overrides.css";

type NotionContentProps = {
  recordMap: any;
};

export default function NotionContent({ recordMap }: NotionContentProps) {
  return (
    <div className="notion-container">
      <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
    </div>
  );
}


