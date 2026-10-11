import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/site/blocks";
import { states } from "@/lib/states";
import { PRIVACY_REVIEWED, getPrivacyNote } from "@/lib/state-details";
import { marketLinks } from "@/lib/market-links";

const regions = ["Northeast", "South", "Midwest", "West"] as const;

const faqs = [
  {
    q: "Do you only work with businesses in certain states?",
    a: "No. We work with businesses anywhere in the United States. Every project runs remotely, so location doesn't change the price, the team, or the process.",
  },
  {
    q: "Can we meet in person?",
    a: "Our projects are designed to run remotely, over video calls and shared links. It's how we keep costs down and stay responsive. If an in-person meeting is important to you, mention it when you get in touch.",
  },
  {
    q: "How do remote projects work in practice?",
    a: "A video call to start, a written scope and fixed quote, a staging link you can open anytime, a short update every week, and a launch call. It's set up so you spend as little time managing the project as possible.",
  },
  {
    q: "Do state laws change how you build a website?",
    a: "Sometimes. Several states now have consumer privacy laws that affect cookie consent, tracking, and lead forms. We check which rules are likely to apply and set the site up accordingly, and we recommend confirming the details with your attorney.",
  },
];

export default function ServiceAreas() {
  const withLaws = states
    .map((s) => ({ state: s, note: getPrivacyNote(s) }))
    .filter((x) => x.note?.kind === "comprehensive")
    .sort((a, b) => a.note!.since - b.note!.since || a.state.name.localeCompare(b.state.name));

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="We work with businesses in every state."
          lede="Klikcy is a remote-first team. We don't have local offices, so we don't charge for them. Instead, every project runs over video calls, written scopes, and a staging link you can check anytime, scheduled inside your business hours."
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "Where we work" }]}
        >
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </PageHero>

        <section className="section border-b border-line" aria-labelledby="markets-heading">
          <div className="wrap ledger">
            <SectionHead
              id="markets-heading"
              title="Local pages"
              intro="Detailed pages for the cities where we get the most requests: local business context, how search works there, and rules that affect websites."
            />
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {marketLinks.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="link text-lg font-semibold">
                    {m.label}
                  </Link>
                  <span className="meta block">{m.state}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="states-heading">
          <div className="wrap">
            <h2 id="states-heading" className="h2">
              Find your state
            </h2>
            <p className="muted mt-4 max-w-2xl">
              Each state page covers time zones, the privacy rules that affect websites there, and the industries we most
              often help.
            </p>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map((r) => (
                <div key={r}>
                  <h3 className="text-lg">{r}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {states
                      .filter((s) => s.region === r)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((s) => (
                        <li key={s.slug}>
                          <Link href={`/service-areas/${s.slug}`} className="link">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist" aria-labelledby="laws-heading">
          <div className="wrap ledger">
            <SectionHead
              id="laws-heading"
              title="State consumer privacy laws"
              intro={`Broad consumer privacy laws that can affect cookie consent, tracking, and lead forms, including laws already signed that start in 2027 and 2028. Last reviewed ${PRIVACY_REVIEWED}; this list changes often.`}
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-left text-[0.95rem]">
                <thead>
                  <tr className="border-b border-ink">
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      State
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      Law
                    </th>
                    <th scope="col" className="py-3 font-semibold">
                      In effect
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {withLaws.map(({ state, note }) => (
                    <tr key={state.slug} className="border-b border-line">
                      <td className="py-3 pr-4">
                        <Link href={`/service-areas/${state.slug}`} className="link">
                          {state.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-slate">{note!.law}</td>
                      <td className="py-3 tabular-nums text-slate">{note!.takesEffect ? `From ${note!.takesEffect}` : note!.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="meta mt-4">General information, not legal advice.</p>
            </div>
          </div>
        </section>

        <Faq items={faqs} title="Working remotely with Klikcy" />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
