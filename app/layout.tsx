import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Job Search Survival",
  description: "Exploring the job search as a survival analysis problem — visualizing how long applications stay alive and what paths lead to interviews, tests, and offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
