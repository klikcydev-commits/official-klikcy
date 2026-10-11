import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/site/blocks";
import { SITE } from "@/lib/site";

/**
 * Describes what the site actually does today: contact form → email via SMTP,
 * Google Analytics 4 loaded through Google Tag Manager, IP-based rate limiting.
 * If tracking tags or data flows change, update this page before deploying.
 */
export const PRIVACY_UPDATED = "October 10, 2026";

const mail = (
  <a href={`mailto:${SITE.email}`} className="link">
    {SITE.email}
  </a>
);

export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Privacy policy"
          lede={`What this website collects, why, and what you can ask us to do with it. Last updated ${PRIVACY_UPDATED}.`}
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]}
        />
        <section className="section">
          <div className="wrap">
            <div className="prose-k">
              <h2 className="!mt-0">Who we are</h2>
              <p>
                This policy covers klikcy.com, run by Klikcy (&ldquo;we&rdquo;, &ldquo;us&rdquo;). If you have a question
                about it, email {mail}.
              </p>

              <h2>What we collect</h2>
              <h3>Information you give us</h3>
              <p>
                When you use our contact form we collect your name, email address, phone number, company name (optional),
                the type of help you&apos;re interested in, and your message. If you email us directly, we receive whatever
                you include in that email.
              </p>
              <h3>Information collected automatically</h3>
              <p>
                We use Google Analytics 4, loaded through Google Tag Manager, to see how the site is used: which pages are
                viewed, how visitors arrived, the type of device and browser, and an approximate location derived from your
                IP address. Google Analytics uses cookies to do this.
              </p>
              <p>
                Like any website, our server processes your IP address to deliver pages. Our contact form also uses it for a
                short time to block repeated automated submissions.
              </p>

              <h2>How we use it</h2>
              <ul>
                <li>To reply to your message and prepare a quote or proposal.</li>
                <li>To run the project if you become a client.</li>
                <li>To understand how the site is used so we can improve it.</li>
                <li>To keep the site secure and filter out spam.</li>
                <li>To meet legal obligations.</li>
              </ul>

              <h2>Who we share it with</h2>
              <p>
                We don&apos;t sell your personal information. We share it only with the service providers that help us run
                the site and our business, and only as much as they need:
              </p>
              <ul>
                <li>Our hosting provider, which stores and serves the website.</li>
                <li>Our email provider, which delivers contact form messages to our inbox.</li>
                <li>
                  Google, for Google Analytics and Google Tag Manager. Google&apos;s handling of this data is described in{" "}
                  <a href="https://policies.google.com/technologies/partner-sites" className="link" rel="noopener">
                    How Google uses information from sites that use its services
                  </a>
                  .
                </li>
              </ul>
              <p>We may also disclose information if the law requires it.</p>

              <h2>Cookies</h2>
              <p>
                Google Analytics sets cookies named <code>_ga</code> and <code>_ga_*</code> to tell visits apart. You can
                block or delete cookies in your browser settings, or install Google&apos;s{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" className="link" rel="noopener">
                  Analytics opt-out add-on
                </a>
                . The site works normally without them.
              </p>

              <h2>How long we keep it</h2>
              <p>
                We keep inquiry emails for as long as we need them to respond and for our business records. If you
                don&apos;t become a client and want your inquiry deleted, ask us and we will. Analytics data is kept for the
                limited period set in our Google Analytics account and then deleted automatically.
              </p>

              <h2>Your rights</h2>
              <p>
                Depending on where you live, including California and other states with consumer privacy laws, you may have
                the right to know what personal information we hold about you, to get a copy, to correct it, and to have it
                deleted. Email {mail} with your request. We&apos;ll confirm your identity, usually by replying to the email
                address we have on file, and respond within the time the law requires. If we can&apos;t meet a request,
                we&apos;ll explain why, and you can reply to appeal the decision.
              </p>

              <h2>Security</h2>
              <p>
                The site is served over HTTPS, and access to inquiries is limited to the people who need it. No method of
                transmission or storage is completely secure, so we can&apos;t guarantee absolute security.
              </p>

              <h2>Children</h2>
              <p>
                This site is meant for businesses and isn&apos;t directed at children under 13. We don&apos;t knowingly
                collect their information.
              </p>

              <h2>Changes</h2>
              <p>
                If we change how we handle personal information, we&apos;ll update this page and the date at the top.
              </p>

              <h2>Contact</h2>
              <p>Questions or requests about your information: {mail}.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
