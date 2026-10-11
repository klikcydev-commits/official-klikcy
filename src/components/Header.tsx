import { categories } from "@/lib/categories";
import { getServicesByCategory } from "@/lib/services";
import { caseStudies } from "@/content/proof";
import HeaderClient, { type MenuGroup } from "./HeaderClient";

/**
 * Server wrapper: builds the menu here so the full service catalog (long-form copy)
 * never ships to the browser. The client component only receives names and slugs.
 */
const MENU: MenuGroup[] = categories.map((c) => ({
  category: { slug: c.slug, name: c.name },
  services: getServicesByCategory(c.slug).map((s) => ({ slug: s.slug, name: s.name })),
}));

export default function Header() {
  return (
    <HeaderClient
      menu={MENU}
      total={MENU.reduce((n, g) => n + g.services.length, 0)}
      showWork={caseStudies.length > 0}
    />
  );
}
