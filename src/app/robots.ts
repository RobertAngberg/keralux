import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/kassa", "/checkout"],
      },
    ],
    sitemap: "https://keralux.se/sitemap.xml",
  };
}
