import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/site/ContactForm";
import { categories } from "@/lib/categories";
import { SITE } from "@/lib/site";
import { commitments } from "@/content/commitments";

const serviceOptions = [...categories.map((c) => c.name), "Not sure yet"];

const nextSteps = [
  { title: "We read it properly", body: "A person reads every message. If it's not something we do well, we'll say so and suggest who might." },
  { title: "We reply within one business day", body: "Usually with a few questions, or a time for a short video call." },
  { title: "You get a written scope and fixed quote", body: "What we'll deliver, how long it takes, and what it costs. No obligation." },
];

export default function Contact({ formToken }: { formToken: string }) {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="border-b border-line">
          <div className="wrap pb-12 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
            <h1 className="display mt-8 max-w-[16ch]">Tell us what you&apos;re working on.</h1>
            <p className="lede mt-6">
              A few sentences is plenty. We reply within one business day with questions or a suggested next step. If you
              prefer email, write to{" "}
              <a href={`mailto:${SITE.email}`} className="link">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
            <div>
              <div className="sheet p-6 sm:p-8">
                <h2 className="text-xl">New project inquiry</h2>
                <div className="mt-6">
                  <ContactForm serviceOptions={serviceOptions} email={SITE.email} formToken={formToken} />
                </div>
              </div>
            </div>

            <aside aria-labelledby="next-heading">
              <h2 id="next-heading" className="text-xl">
                What happens next
              </h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                    <span className="font-semibold tabular-nums text-teal" aria-hidden>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="muted mt-1 text-[0.95rem]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 border-t border-line pt-6 text-[0.95rem]">
                <p className="font-semibold">What you can count on</p>
                <ul className="ticks mt-3 text-slate">
                  {commitments.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-line pt-6 text-[0.95rem]">
                <p className="font-semibold">Where we work</p>
                <p className="muted mt-1">
                  Remotely, with businesses in all 50 states and Washington DC. Calls are scheduled in your time zone.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
