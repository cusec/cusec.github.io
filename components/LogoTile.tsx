import Image, { type StaticImageData } from "next/image";

type LogoTileProps = {
  name: string;
  url?: string;
  logo?: StaticImageData;
  variant?: "default" | "compact-left";
};

export function LogoTile({ name, url, logo, variant = "default" }: LogoTileProps) {
  const className = `cusec-logo-tile${
    variant === "compact-left" ? " cusec-logo-tile--compact-left" : ""
  }`;

  return (
    <div className={className} title={name}>
      {logo ? (
        <Image src={logo} alt={`${name} Logo`} quality={95} sizes="160px" />
      ) : (
        <span className="cusec-school-name-fallback">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {name}
            </a>
          ) : (
            name
          )}
        </span>
      )}
    </div>
  );
}
