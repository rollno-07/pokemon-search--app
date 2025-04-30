import "./globals.css";
import { JetBrains_Mono } from "next/font/google";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  Weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Pokémon Search App",
  description: "Search and explore Pokémon by type and name.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
