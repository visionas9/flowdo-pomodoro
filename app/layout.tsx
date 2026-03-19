import "./globals.css";
import {
  Architects_Daughter,
  Chiron_GoRound_TC,
  Montserrat_Alternates,
} from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContextProvider from "./context";

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
    <html
      lang="en"
      className={`${ArchitectsDaughter.variable}, ${ChironGoRoundTC.variable}, ${MontserratAlternates.variable}`}
    >
      <ContextProvider>
        <body className="bg-darkb">
          <Header />
          <main> {children}</main>
          <Footer />
        </body>
      </ContextProvider>
    </html>
  );
}
