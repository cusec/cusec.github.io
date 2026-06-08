import { LogoTile } from "@/components/LogoTile";
import type { School } from "@/lib/schoolsData";

export function SchoolCard({ school }: { school: School }) {
  return (
    <article className="cusec-archive-item cusec-school-archive-item cusec-school-archive-item--mosaic">
      <div className="cusec-archive-item__header">
        <div className="cusec-archive-item__brand cusec-school-archive-item__brand">
          {school.logo ? (
            <a href={school.url} target="_blank" rel="noopener noreferrer">
              <LogoTile name={school.name} logo={school.logo} variant="compact-left" />
            </a>
          ) : (
            <h3>
              <a
                href={school.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                {school.name}
              </a>
            </h3>
          )}
        </div>
      </div>
    </article>
  );
}
