type HighlightProps = {
  children: React.ReactNode;
};

export function Highlight({ children }: HighlightProps) {
  return <mark className="cusec-highlight">{children}</mark>;
}
