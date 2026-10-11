import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/site/blocks";
import { SITE } from "@/lib/site";

export const ACCESSIBILITY_UPDATED = "October 10, 2026";

export default function Accessibility() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Accessibility statement"
          lede={`We want everyone to be able to use klikcy.com, including people who use screen readers, keyboards, or zoom. Last updated ${ACCESSIBILITY_UPDATED}.`}
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "Accessibility" }]}
        />
        <section className="section">
          <div className="wrap">
            <div className="prose-k">
              <h2 className="!mt-0">The standard we aim for</h2>
              <p>
                We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. It&apos;s the same standard
                we build to for clients.
              </p>

              <h2>What we&apos;ve done</h2>
              <ul>
                <li>Pages use real headings, lists, and landmarks, so screen readers can navigate them.</li>
                <li>Everything can be reached with a keyboard, focus is always visible, and there&apos;s a skip link to the main content.</li>
                <li>Text colors meet AA contrast ratios. Our main link color, for example, is 6.1 to 1 against white.</li>
                <li>Nothing moves, flashes, or plays on its own, and we respect your device&apos;s reduced-motion setting.</li>
                <li>Every form field has a visible label, and errors say what went wrong and how to fix it.</li>
                <li>Expandable answers use the browser&apos;s built-in disclosure controls, which work with assistive technology.</li>
              </ul>

              <h2>Known limitations</h2>
              <p>
                We haven&apos;t had a formal third-party audit yet. Some content comes from third parties, such as Google Tag
                Manager, and is outside our direct control. If you find something that doesn&apos;t work for you, we want to
                hear about it.
              </p>

              <h2>Report a barrier</h2>
              <p>
                Email{" "}
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>{" "}
                with the page address and what happened. We reply within one business day, and if you need information from
                the site in another format, we&apos;ll provide it.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
