import Script from "next/script";

export function GoogleAnalytics() {
  const configuredId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const measurementId = configuredId && /^G-[A-Z0-9]+$/i.test(configuredId) ? configuredId : null;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
