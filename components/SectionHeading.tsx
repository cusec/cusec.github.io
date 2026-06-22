type SectionHeadingProps = {
  title: React.ReactNode;
  lede: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  title,
  lede,
  align = "left",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const className = `cusec-section-heading${
    align === "center" ? " cusec-section-heading--center" : ""
  }`;

  return (
    <div className={className}>
      <Heading>{title}</Heading>
      <p>{lede}</p>
    </div>
  );
}
