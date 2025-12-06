import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Noa's Place Halifax | Get in Touch West Yorkshire",
  description: "Contact Noa's Place Halifax - SEND support charity in West Yorkshire. Call 01422 415274 or email hello@noasplace.org.uk. Open Mon-Fri 9am-5pm. We'd love to hear from you.",
  keywords: "contact Noa's Place Halifax, SEND support contact West Yorkshire, charity contact Calderdale, Halifax family support phone, Noa's Place email address, West Yorkshire SEND services contact",
  openGraph: {
    title: "Contact Noa's Place Halifax | Get in Touch West Yorkshire",
    description: "Contact Noa's Place Halifax - SEND support charity in West Yorkshire. Call 01422 415274 or email hello@noasplace.org.uk. Open Mon-Fri 9am-5pm.",
    url: "https://noasplace.org.uk/contact",
    type: 'website',
  },
  alternates: {
    canonical: "https://noasplace.org.uk/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
