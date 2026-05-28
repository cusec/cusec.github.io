type SectionProps = {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
};

export function Section({ children, className = "", bleed = false }: SectionProps) {
  const classes = ["cusec-section", bleed ? "cusec-section--bleed" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      <div className="cusec-section__inner">{children}</div>
    </section>
  );
}
