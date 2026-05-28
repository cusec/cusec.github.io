"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

const navLinks = [
  { href: "/past-speakers", key: "pastSpeakers" },
  { href: "/participant-schools", key: "participantSchools" },
  { href: "/historic-sponsors", key: "historicSponsors" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="cusec-navbar" data-open={open ? "true" : "false"} aria-label={t("primary")}>
      <div className="cusec-navbar__inner">
        <Link href="/" className="cusec-navbar__wordmark">
          CUSEC
        </Link>
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
