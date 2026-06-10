import { Link } from "@/i18n/navigation";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
};

export function ButtonLink({ href, children, newTab }: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="cusec-button-link__arrow">
        -&gt;
      </span>
    </>
  );

  if (href.startsWith("#") || /^https?:\/\//.test(href)) {
    return (
      <a
        className="cusec-button-link"
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="cusec-button-link" href={href}>
      {content}
    </Link>
  );
}
