import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperProf - Trouvez votre professeur idéal",
  description: "Plateforme de mise en relation entre étudiants et professeurs particuliers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
