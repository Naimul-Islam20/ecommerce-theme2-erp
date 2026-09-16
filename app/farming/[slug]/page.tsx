import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeritagePage } from "@/components/HeritagePage";
import { farms, getFarm } from "@/lib/farms";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return farms.map((farm) => ({ slug: farm.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const farm = getFarm(slug);
  return { title: farm?.title ?? "Farming Life", description: farm?.description };
}

export default async function FarmPage({ params }: Props) {
  const { slug } = await params;
  const farm = getFarm(slug);
  if (!farm) notFound();

  return (
    <HeritagePage
      eyebrow={`Farming Life • ${farm.title}`}
      title={farm.title}
      description={farm.description}
      kicker="Farming Life"
      heading={farm.description}
      intro={farm.intro}
      cta={`Explore ${farm.title} →`}
      cards={farm.cards}
      bandTitle="Local farming knowledge belongs in the story of every product."
      bandText="Farming Life connects the products on our marketplace with the landscapes, seasons and producers behind them."
    />
  );
}
