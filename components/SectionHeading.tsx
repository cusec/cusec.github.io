type SectionHeadingProps = {
  title: React.ReactNode;
  lede: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ title, lede, align = "left" }: SectionHeadingProps) {
  const className = `cusec-section-heading${
    align === "center" ? " cusec-section-heading--center" : ""
  }`;

  return (
    <div className={className}>
      <h2>{title}</h2>
      <p>{lede}</p>
    </div>
  );
}
