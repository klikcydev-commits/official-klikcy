import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, PageHero } from "@/components/site/blocks";
import { CaseStudyDetail } from "@/components/site/Proof";
import { caseStudies } from "@/content/proof";

/**
 * Lists real case studies from src/content/proof.ts. While the list is empty this page
 * is noindexed, left out of the sitemap, and not linked anywhere.
 */
export default function Work() {
  const studies = [...caseStudies].sort((a, b) => b.year - a.year);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Our work"
          lede="What each client needed, what we built, and what changed afterwards. Results are measured, not estimated, and every project is shared with the client's permission."
          breadcrumbs={[{ name: "Home", href: "/" }, { name: "Our work" }]}
        >
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </PageHero>

        <section className="section">
          <div className="wrap space-y-16">
            {studies.length > 0 ? (
              studies.map((s) => <CaseStudyDetail key={s.slug} study={s} />)
            ) : (
              <div className="prose-k">
                <p>
                  We&apos;re writing up our first case studies with clients now. In the meantime, see{" "}
                  <Link href="/all-services" className="link">
                    what we do
                  </Link>{" "}
                  or{" "}
                  <Link href="/contact" className="link">
                    ask us
                  </Link>{" "}
                  for examples relevant to your project.
                </p>
              </div>
            )}
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
