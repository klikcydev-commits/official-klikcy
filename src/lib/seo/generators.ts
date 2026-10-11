import type { Service } from "../services";
import type { State } from "../states";
import type { CityRef } from "../cities";
import type { Category } from "../categories";
import { getServicesByCategory, services } from "../services";
import { categories } from "../categories";
import {
  breadcrumbNode,
  faqNode,
  graph,
  itemListNode,
  ORG_ID,
  organizationNode,
  serviceNode,
  webPageNode,
  websiteNode,
  type FaqItem,
} from "../schema";
import { absoluteUrl } from "../site";
import { DEFAULT_OG_IMAGE, INDEX_ROBOTS, NOINDEX_ROBOTS, type SeoPayload } from "./metadata";
import { isIndexable, type PageKind } from "./indexing";
import { getLocalMarket } from "@/content/local-markets";

function payload(kind: PageKind, path: string, title: string, description: string, jsonLd?: object): SeoPayload {
  return {
    title,
    description,
    canonical: absoluteUrl(path),
    robots: isIndexable(kind) ? INDEX_ROBOTS : NOINDEX_ROBOTS,
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd,
  };
}

const home = { name: "Home", path: "/" };

export function getHomeSeo(faqs: FaqItem[]): SeoPayload {
  const title = "Web Development, SEO & AI Automation Agency | Klikcy";
  const description =
    "Klikcy builds fast websites, search visibility, and AI automation for U.S. businesses. Remote-first team, fixed quotes, and code and accounts you own.";
  return payload(
    "home",
    "/",
    title,
    description,
    graph(organizationNode(), websiteNode(), webPageNode({ path: "/", name: title, description }), faqNode("/", faqs)),
  );
}

export function getAboutSeo(faqs: FaqItem[]): SeoPayload {
  const title = "About Klikcy | Remote-First Web & Software Agency";
  const description =
    "Who we are and how we work: a remote team of developers, designers, and search specialists building websites, apps, and automation for U.S. businesses.";
  const path = "/about";
  return payload(
    "about",
    path,
    title,
    description,
    graph(
      organizationNode(),
      webPageNode({ path, name: title, description, type: "AboutPage", hasBreadcrumb: true, mainEntityId: ORG_ID }),
      breadcrumbNode(path, [home, { name: "About", path }]),
      faqNode(path, faqs),
    ),
  );
}

export function getContactSeo(): SeoPayload {
  const title = "Contact Klikcy | Get a Free Project Quote";
  const description =
    "Tell us about your website, app, SEO, or automation project. We reply within one business day with questions or a clear next step. No sales pressure.";
  const path = "/contact";
  return payload(
    "contact",
    path,
    title,
    description,
    graph(
      organizationNode(),
      webPageNode({ path, name: title, description, type: "ContactPage", hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "Contact", path }]),
    ),
  );
}

export function getAllServicesSeo(): SeoPayload {
  const title = "All Services | Web, SEO, AI, Apps & E-Commerce | Klikcy";
  const description =
    "Every Klikcy service in one place: websites, SEO and AEO, AI automation, apps and software, e-commerce, design, marketing, and hosting. 65 services, 8 practices.";
  const path = "/all-services";
  return payload(
    "all-services",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, type: "CollectionPage", hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "All services", path }]),
      itemListNode(
        path,
        services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
      ),
    ),
  );
}

export function getCategorySeo(category: Category): SeoPayload {
  const path = `/categories/${category.slug}`;
  return payload(
    "category",
    path,
    category.metaTitle,
    category.metaDescription,
    graph(
      webPageNode({ path, name: category.metaTitle, description: category.metaDescription, type: "CollectionPage", hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "All services", path: "/all-services" }, { name: category.name, path }]),
      itemListNode(
        path,
        getServicesByCategory(category.slug).map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
      ),
      faqNode(path, category.faqs),
    ),
  );
}

export function getServiceSeo(service: Service): SeoPayload {
  const path = `/services/${service.slug}`;
  const category = categories.find((c) => c.slug === service.category);
  const service_ = serviceNode(service);
  return payload(
    "service",
    path,
    service.metaTitle,
    service.metaDescription,
    graph(
      service_,
      webPageNode({
        path,
        name: service.metaTitle,
        description: service.metaDescription,
        hasBreadcrumb: true,
        mainEntityId: service_["@id"] as string,
      }),
      breadcrumbNode(path, [
        home,
        ...(category ? [{ name: category.name, path: `/categories/${category.slug}` }] : []),
        { name: service.name, path },
      ]),
      faqNode(path, service.faqs),
    ),
  );
}

export function getServiceAreasSeo(): SeoPayload {
  const title = "Where We Work | Serving All 50 States | Klikcy";
  const description =
    "Klikcy works remotely with businesses in all 50 states and Washington DC. See how remote projects run, which time zones we cover, and state-specific notes.";
  const path = "/service-areas";
  return payload(
    "service-areas",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, type: "CollectionPage", hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "Where we work", path }]),
    ),
  );
}

export function getStateAreaSeo(state: State): SeoPayload {
  const path = `/service-areas/${state.slug}`;
  const title = `Web Development & SEO for ${state.name} Businesses | Klikcy`;
  const city = state.cities.find((c) => c.toLowerCase() !== state.name.toLowerCase());
  const where = city ? ` in ${city} and beyond` : "";
  const description = `Websites, SEO, and AI automation for ${state.name} businesses${where}. Remote team, fixed quotes, clear timelines, and code you own.`;
  return payload(
    "state",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "Where we work", path: "/service-areas" }, { name: state.name, path }]),
    ),
  );
}

export function getCityAreaSeo(city: CityRef): SeoPayload {
  const path = `/service-areas/${city.state.slug}/${city.slug}`;
  const market = getLocalMarket(city.state.slug, city.slug);
  if (market) {
    // Hand-written priority market: indexed, with its own copy and FAQ markup.
    return {
      ...payload(
        "city",
        path,
        market.metaTitle,
        market.metaDescription,
        graph(
          webPageNode({ path, name: market.metaTitle, description: market.metaDescription, hasBreadcrumb: true }),
          breadcrumbNode(path, [
            home,
            { name: city.state.name, path: `/service-areas/${city.state.slug}` },
            { name: city.name, path },
          ]),
          faqNode(path, market.faqs),
        ),
      ),
      robots: INDEX_ROBOTS,
    };
  }
  const title = `Web Development & SEO in ${city.name}, ${city.state.abbr} | Klikcy`;
  const description = `Klikcy works remotely with ${city.name}, ${city.state.name} businesses on websites, SEO, AI automation, apps, and online stores.`;
  return payload(
    "city",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, hasBreadcrumb: true }),
      breadcrumbNode(path, [
        home,
        { name: city.state.name, path: `/service-areas/${city.state.slug}` },
        { name: city.name, path },
      ]),
    ),
  );
}

export function getServiceStateSeo(service: Service, state: State): SeoPayload {
  const path = `/${service.slug}/${state.slug}`;
  const title = `${service.name} in ${state.name} | Klikcy`;
  const description = `${service.shortDescription} Klikcy works remotely with ${state.name} businesses.`;
  return payload(
    "service-state",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, hasBreadcrumb: true }),
      breadcrumbNode(path, [
        home,
        { name: state.name, path: `/service-areas/${state.slug}` },
        { name: service.name, path },
      ]),
    ),
  );
}

export function getServiceCitySeo(service: Service, city: CityRef): SeoPayload {
  const path = `/${service.slug}/${city.state.slug}/${city.slug}`;
  const title = `${service.name} in ${city.name}, ${city.state.abbr} | Klikcy`;
  const description = `${service.shortDescription} Klikcy works remotely with businesses in ${city.name}, ${city.state.name}.`;
  return payload(
    "service-city",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, hasBreadcrumb: true }),
      breadcrumbNode(path, [
        home,
        { name: city.state.name, path: `/service-areas/${city.state.slug}` },
        { name: city.name, path: `/service-areas/${city.state.slug}/${city.slug}` },
        { name: service.name, path },
      ]),
    ),
  );
}

export function getNotFoundSeo(): SeoPayload {
  return payload(
    "not-found",
    "/404",
    "Page not found | Klikcy",
    "This page doesn't exist or has moved. Browse our services or get in touch and we'll point you in the right direction.",
  );
}

export function getWorkSeo(): SeoPayload {
  const title = "Our Work | Client Projects and Results | Klikcy";
  const description =
    "Real Klikcy projects: what each client needed, what we built, and the results we measured. Websites, search, automation, and software for U.S. businesses.";
  const path = "/work";
  return payload(
    "work",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, type: "CollectionPage", hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "Our work", path }]),
    ),
  );
}

export function getPrivacySeo(): SeoPayload {
  const title = "Privacy Policy | Klikcy";
  const description =
    "What information klikcy.com collects, why, who it's shared with, how long it's kept, and how to ask us to access or delete your data.";
  const path = "/privacy";
  return payload(
    "privacy",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "Privacy policy", path }]),
    ),
  );
}

export function getAccessibilitySeo(): SeoPayload {
  const title = "Accessibility Statement | Klikcy";
  const description =
    "How we build klikcy.com to be usable by everyone, the standard we aim for (WCAG 2.2 AA), known limitations, and how to report a barrier.";
  const path = "/accessibility";
  return payload(
    "accessibility",
    path,
    title,
    description,
    graph(
      webPageNode({ path, name: title, description, hasBreadcrumb: true }),
      breadcrumbNode(path, [home, { name: "Accessibility", path }]),
    ),
  );
}
