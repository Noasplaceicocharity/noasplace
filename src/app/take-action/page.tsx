import { Metadata } from 'next';
import { getTakeActionItems } from '@/lib/notion';
import TakeActionClient from './TakeActionClient';

export const metadata: Metadata = {
  title: "Take Action | Noa's Place Halifax - SEND Advocacy West Yorkshire",
  description:
    "Take action with Noa's Place - surveys and letter campaigns to your MP. Make your voice heard on SEND and family support in Halifax & West Yorkshire.",
  keywords:
    "take action Noa's Place Halifax, SEND advocacy West Yorkshire, write to MP Calderdale, campaign Halifax, family support advocacy Yorkshire",
  openGraph: {
    title: "Take Action | Noa's Place Halifax - SEND Advocacy West Yorkshire",
    description:
      "Take action with Noa's Place - surveys and letter campaigns to your MP. Make your voice heard on SEND and family support.",
    url: 'https://noasplace.org.uk/take-action',
    type: 'website',
  },
  alternates: {
    canonical: 'https://noasplace.org.uk/take-action',
  },
};

export default async function TakeActionPage() {
  const items = await getTakeActionItems();
  const types = Array.from(new Set(items.map((i) => i.type))).sort();

  return <TakeActionClient items={items} types={types} />;
}
