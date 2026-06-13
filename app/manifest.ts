import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CUSEC",
    short_name: "CUSEC",
    description: "Canadian University Software Engineering Conference",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f0e6",
    theme_color: "#0f172a",
  };
}
