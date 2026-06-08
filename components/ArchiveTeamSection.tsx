import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import type { ArchiveTeamMember } from "@/lib/archiveYearsData";

export async function ArchiveTeamSection({ team }: { team: ArchiveTeamMember[] }) {
  const t = await getTranslations("Archives");

  return (
    <section className="cusec-section cusec-archive-section">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("teamHeading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("teamLede")}
          align="left"
        />

        {team.length > 0 ? (
          <ul className="cusec-archive-team-grid">
            {team.map((member, index) => (
              <li key={`${member.name}-${index}`} className="cusec-archive-team-member">
                <p className="cusec-archive-team-member__name">{member.name}</p>
                <p className="cusec-archive-team-member__role">{member.role}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cusec-archive-placeholder">{t("noTeam")}</p>
        )}
      </div>
    </section>
  );
}
