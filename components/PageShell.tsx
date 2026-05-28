type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return <main className="cusec-page-shell">{children}</main>;
}
