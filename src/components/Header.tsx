import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { services, getServicesByCategory } from "@/lib/services";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Klikcy home">
          <span className="text-2xl font-extrabold tracking-tight gradient-text">Klikcy</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/about" className="px-3 py-2 text-sm font-medium text-navy-deep hover:text-primary">About</NavLink>
          {categories.slice(0, 6).map((c) => (
            <div key={c.slug} className="group relative">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-deep hover:text-primary">
                {c.short} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full w-72 translate-y-1 rounded-2xl border border-border bg-white p-3 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="micro-label mb-2 px-2">{c.name}</div>
                {getServicesByCategory(c.slug).slice(0, 8).map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">
                    {s.name}
                  </Link>
                ))}
                <Link to={`/categories/${c.slug}`} className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-accent">
                  All {c.short} →
                </Link>
              </div>
            </div>
          ))}
          <NavLink to="/contact" className="px-3 py-2 text-sm font-medium text-navy-deep hover:text-primary">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden sm:inline-flex btn-primary !py-2 !px-4 text-sm">Strategy Call</Link>
          <button onClick={() => setOpen(true)} className="lg:hidden rounded-lg p-2 text-navy-deep" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-fade-in lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <span className="text-2xl font-extrabold gradient-text">Klikcy</span>
            <button onClick={() => setOpen(false)} className="rounded-lg p-2" aria-label="Close menu">
              <X className="h-6 w-6 text-navy-deep" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <Link to="/about" onClick={() => setOpen(false)} className="block py-3 text-2xl font-bold text-navy-deep">About</Link>
            {categories.map((c) => {
              const isOpen = openCat === c.slug;
              return (
                <div key={c.slug} className="border-b border-border/60 py-2">
                  <button
                    onClick={() => setOpenCat(isOpen ? null : c.slug)}
                    className={`flex w-full items-center justify-between py-2 text-2xl font-bold ${isOpen ? "text-primary" : "text-navy-deep"}`}
                  >
                    {c.name}
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${isOpen ? "border-primary bg-accent text-primary" : "border-border text-navy-deep"}`}>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-2 rounded-xl bg-accent/60 p-3">
                      {getServicesByCategory(c.slug).map((s) => (
                        <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-base text-navy-deep hover:bg-white">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link to="/contact" onClick={() => setOpen(false)} className="block py-3 text-2xl font-bold text-navy-deep">Contact</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-6 btn-primary w-full">Request a Strategy Call</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
