"use client";

import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import Image from 'next/image';
import Link from 'next/link';

// Import the main NotionRenderer
const NotionRendererComponent = dynamic(
  () => import('react-notion-x').then((m) => m.NotionRenderer),
  { ssr: false }
);

interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
  fullPage?: boolean;
  darkMode?: boolean;
  previewImages?: boolean;
  rootPageId?: string;
  rootDomain?: string;
  mapPageUrl?: (pageId: string) => string;
  mapImageUrl?: (url: string, block: any) => string;
}

export function NotionRenderer({
  recordMap,
  fullPage = false,
  darkMode = false,
  previewImages = true,
  rootPageId,
  rootDomain,
  mapPageUrl,
  mapImageUrl,
}: NotionRendererProps) {
  if (!recordMap) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-800 mx-auto mb-4"></div>
          <p className="text-ink/60">Loading content...</p>
        </div>
      </div>
    );
  }

  const defaultMapImageUrl = (url: string, block: any) => {
    // For better performance with Next.js Image component
    if (url.startsWith('/')) {
      return `https://www.notion.so${url}`;
    }
    return url;
  };

  const defaultMapPageUrl = (pageId: string) => {
    return `/blog/${pageId}`;
  };

  return (
    <div className="notion-renderer">
      <NotionRendererComponent
        recordMap={recordMap}
        fullPage={fullPage}
        darkMode={darkMode}
        previewImages={previewImages}
        rootPageId={rootPageId}
        rootDomain={rootDomain}
        mapPageUrl={mapPageUrl || defaultMapPageUrl}
        mapImageUrl={mapImageUrl || defaultMapImageUrl}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
        // Custom styling options
        className="notion-page"
        bodyClassName="notion-body"
        header={null}
        footer={null}
        pageHeader={null}
        pageFooter={null}
        pageTitle={null}
        pageActions={null}
        pageCover={null}
      />
    </div>
  );
}

export default NotionRenderer;
