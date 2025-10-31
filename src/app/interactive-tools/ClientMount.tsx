"use client";

import MailchimpPopup from "@/components/MailchimpPopup";
import { usePathname } from "next/navigation";

export default function ClientMount({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInteractiveToolsIndex = pathname === "/interactive-tools";
  return (
    <>
      {children}
      {!isInteractiveToolsIndex && <MailchimpPopup triggerPercent={50} />}
    </>
  );
}


