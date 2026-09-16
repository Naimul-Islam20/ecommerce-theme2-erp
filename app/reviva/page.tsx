import type { Metadata } from "next";
import { HeritagePage } from "@/components/HeritagePage";

export const metadata: Metadata = {
  title: "Reviva",
  description: "Intangible Heritage Products Deshojo Bazar.",
};

const cards = [
  "Traditional food knowledge",
  "Craft and making traditions",
  "Regional stories and techniques",
  "Community-led heritage preservation",
];

export default function RevivaPage() {
  return (
    <HeritagePage
      eyebrow="Reviva • Intangible Heritage"
      title="Reviva"
      description="Intangible Heritage Products"
      kicker="Intangible heritage"
      heading="Intangible Heritage Products"
      intro="Reviva is a dedicated space for intangible heritage products—crafts, food traditions, techniques, stories and cultural knowledge that live through people and practice."
      cta="Explore heritage products →"
      cards={cards}
      bandTitle="Keep heritage alive through living practice."
      bandText="Reviva connects products with the traditions, skills and cultural knowledge that give them meaning."
    />
  );
}
