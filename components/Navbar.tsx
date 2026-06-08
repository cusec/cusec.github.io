"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks } from "@/lib/navLinks";

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="cusec-navbar" data-open={open ? "true" : "false"} aria-label={t("primary")}>
      <div
        className={`cusec-navbar__inner${pathname === "/" ? " cusec-navbar__inner--no-wordmark" : ""}`}
      >
        {pathname !== "/" && (
          <Link href="/" className="cusec-navbar__wordmark">
            CUSEC
          </Link>
        )}
        <button
          type="button"
          className="cusec-navbar__toggle"
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? t("close") : t("menu")}</span>
        </button>
        <ul className="cusec-navbar__links">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`cusec-navbar__link${active ? " cusec-navbar__link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            );
          })}
          <li>
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
}
