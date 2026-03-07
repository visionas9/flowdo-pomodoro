import "./globals.css";import {
  Architects_Daughter,
  Chiron_GoRound_TC,
  Montserrat_Alternates,
} from "next/font/google";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-quote",
});

const ChironGoRoundTC = Chiron_GoRound_TC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-main",
});

const MontserratAlternates = Montserrat_Alternates({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-numbers",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ArchitectsDaughter.variable}, ${ChironGoRoundTC.variable}, ${MontserratAlternates.variable}`}>
      <body>{children}</body>
    </html>
  );
}
