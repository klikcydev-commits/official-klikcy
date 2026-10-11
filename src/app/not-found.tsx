import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/lib/categories";
import { getNotFoundSeo } from "@/lib/seo";
import { seoToMetadata } from "@/lib/seo/next-metadata";

export const metadata: Metadata = seoToMetadata(getNotFoundSeo());

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="section">
        <div className="wrap ledger">
          <div>
            <p className="meta">Error 404</p>
            <h1 className="display mt-3">This page doesn&apos;t exist.</h1>
            <p className="lede mt-6">
              It may have moved, or the link may be wrong. Try one of these instead, or tell us what you were looking for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                Go to the homepage
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact us
              </Link>
            </div>
          </div>
          <nav aria-label="Services">
            <h2 className="text-lg">Services</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="link">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/all-services" className="link">
                  All services
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
