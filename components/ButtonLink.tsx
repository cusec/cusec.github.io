import { Link } from "@/i18n/navigation";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function ButtonLink({ href, children }: ButtonLinkProps) {
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
      <a className="cusec-button-link" href={href}>
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
