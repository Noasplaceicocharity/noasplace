export type DreamboardSpace = {
  id: string;
  image: { src: string; alt: string };
  title: string;
  description: string;
  features: string[];
};

export const dreamboardSpaces: DreamboardSpace[] = [
  {
    id: "kids-sensory",
    image: {
      src: "/dreamboard/Kids_sensory.jpg",
      alt: "Kids sensory room with soft play equipment and calming lights",
    },
    title: "Kids Sensory",
    description:
      "A safe, calming space designed specifically for children with sensory needs. Features include:",
    features: [
      "Soft play equipment and climbing frames",
      "Adjustable lighting and sound environments",
      "Tactile walls and interactive features",
      "Quiet corners for when it all gets too much",
    ],
  },
  {
    id: "adult-sensory",
    image: {
      src: "/dreamboard/adult_sensory.jpg",
      alt: "Adult sensory room designed for comfort and stimulation",
    },
    title: "Adult Sensory",
    description:
      "A dignified, age-appropriate space for adults to regulate, relax, and engage their senses:",
    features: [
      "Comfortable seating and relaxation areas",
      "Sensory equipment designed for adult users",
      "Customisable environment for individual needs",
      "Private spaces for one-to-one support",
    ],
  },
  {
    id: "indoor-playground",
    image: {
      src: "/dreamboard/indoor_playground.jpg",
      alt: "Indoor playground and soft play area",
    },
    title: "Indoor Playground",
    description:
      "An inclusive play space where children of all abilities can explore and have fun:",
    features: [
      "Accessible play equipment for all abilities",
      "Sensory-friendly zones and quiet areas",
      "Safe, padded surfaces throughout",
      "Adaptive equipment and support aids available",
    ],
  },
  {
    id: "event-spaces",
    image: {
      src: "/dreamboard/event_spaces.jpg",
      alt: "Flexible event and activity spaces",
    },
    title: "Event Spaces",
    description:
      "Flexible spaces for community activities, workshops, and celebrations:",
    features: [
      "Adaptable rooms for various group sizes",
      "Fully accessible facilities and equipment",
      "Sensory-aware environment controls",
      "Perfect for classes, groups, and family events",
    ],
  },
  {
    id: "community-cafe",
    image: {
      src: "/dreamboard/cafe_space.jpg",
      alt: "Welcoming community café space",
    },
    title: "Cafe",
    description: "More than just a café: a welcoming hub where everyone belongs:",
    features: [
      "Sensory-friendly environment with quiet zones",
      "Accessible menus and dietary options",
      "Family-friendly seating and facilities",
      "Regular community events and meetups",
    ],
  },
  {
    id: "charity-shop",
    image: {
      src: "/dreamboard/charity_shop.jpg",
      alt: "Our charity shop supporting the community",
    },
    title: "Charity Shop",
    description:
      "A sustainable way to support our community while finding treasures:",
    features: [
      "Quality pre-loved items at affordable prices",
      "Volunteer opportunities for all abilities",
      "Supported work experience placements",
      "Income generation to support our services",
    ],
  },
];

/** Links for The Hub navigation dropdown (anchors match `src/app/the-hub/page.tsx`). */
export const theHubDropdownLinks: { href: string; label: string }[] = [
  { href: "/the-hub#our-vision", label: "What we envision" },
  { href: "/the-hub#our-dreamboard", label: "Our dreamboard" },
  ...dreamboardSpaces.map((s) => ({ href: `/the-hub#${s.id}`, label: s.title })),
];
