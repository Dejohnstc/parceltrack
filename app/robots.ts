import type { MetadataRoute } from "next";

const siteUrl = "https://www.validxpress.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/api/",
        "/login/",
        "/register/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}