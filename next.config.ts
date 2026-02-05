import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      // Gamla PHP-sidor → nya sidor (301 permanent redirect för SEO)
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/harfiber.php", destination: "/butik", permanent: true },
      { source: "/foreefter.php", destination: "/fore-efter", permanent: true },
      { source: "/fragor-svar.php", destination: "/faq", permanent: true },
      { source: "/kopvillkor.php", destination: "/kopvillkor", permanent: true },
      { source: "/kontakt.php", destination: "/kontakt", permanent: true },
      { source: "/varukorg.php", destination: "/varukorg", permanent: true },
      { source: "/kassa.php", destination: "/kassa", permanent: true },
    ];
  },
};

export default nextConfig;
