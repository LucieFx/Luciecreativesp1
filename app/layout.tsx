import type { Metadata, Viewport } from "next";
import { Sora, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: "400",
  style: "italic",
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: true,
  preload: true,
});



export const metadata: Metadata = {
  title: "Lucie Creatives — Video Editing & Web Development Agency",
  description:
    "Lucie Creatives is a premier video editing and web development agency specializing in cinematic video editing, high-performance web development, graphic design, and branding.",
  authors: [{ name: "Lucie Creatives" }],
  creator: "Lucie Creatives",
  metadataBase: new URL("https://luciecreatives.in"),
  openGraph: {
    title: "Lucie Creatives — Video Editing & Web Development Agency",
    description:
      "Full-stack agency delivering cinematic video editing, custom websites, high-performance web platforms, and iconic branding systems. 10x Growth. Expertly Managed.",
    url: "https://luciecreatives.in",
    siteName: "Lucie Creatives",
    images: [
      {
        url: "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835244/lucie-creatives/logo/lucie-creatives-og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Lucie Creatives Full-Stack Media & Branding Agency",
      },
      {
        url: "https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835243/lucie-creatives/logo/lucie-creatives-og-square.png",
        width: 1024,
        height: 1024,
        type: "image/png",
        alt: "Lucie Creatives Full Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucie Creatives — Video Editing & Web Development Agency",
    description: "Full-stack agency delivering cinematic video editing, custom websites, high-performance web platforms, and iconic branding systems.",
    images: ["https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto/v1789835244/lucie-creatives/logo/lucie-creatives-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};


import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema-structured-data";
import { MotionProvider, ScrollProgressBar, CursorFollower } from "@/components/motion";
import { MotionSafetyNet } from "@/components/MotionSafetyNet";

const organizationJsonLd = getOrganizationSchema();
const webSiteJsonLd = getWebSiteSchema();

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${instrumentSerif.variable} font-sans scroll-smooth bg-white text-ink`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta
          name="description"
          content="Lucie Creatives is a premier video editing and web development agency specializing in cinematic video editing, high-performance web development, graphic design, and branding."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Noscript: force all animated elements visible when JS is disabled */}
        <noscript>
          <style>{`
            [data-reveal], [data-split], [data-mask] {
              opacity: 1 !important;
              transform: none !important;
              clip-path: none !important;
              visibility: visible !important;
            }
          `}</style>
        </noscript>
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-[#8B1A1A] selection:text-white bg-white font-sans text-ink font-normal text-[15px] sm:text-[16px] leading-[1.6]">
        <MotionProvider>
          <MotionSafetyNet />
          <ScrollProgressBar />
          <CursorFollower />
          <SmoothScroll>{children}</SmoothScroll>
          {modal}
        </MotionProvider>
      </body>
    </html>
  );
}
