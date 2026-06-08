import type { ReactNode } from "react";

export function ChartShell({
  id,
  title,
  footnote,
  children,
  className = "",
}: {
  id: string;
  title: string;
  footnote?: string;
  children: ReactNode;
  className?: string;
}) {
  const titleId = `${id}-title`;

  return (
    <section className={`cusec-summary-panel ${className}`} aria-labelledby={titleId}>
      <div className="cusec-summary-panel__copy">
        <h3 id={titleId}>{title}</h3>
      </div>
      {children}
      {footnote ? <p className="cusec-summary-panel__footnote">{footnote}</p> : null}
    </section>
  );
}
