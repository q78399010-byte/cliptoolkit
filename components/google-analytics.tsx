import Script from "next/script";
import { GoogleAnalyticsPageViews } from "@/components/google-analytics-page-views";
import { GA_TAG_ID } from "@/lib/google-analytics";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TAG_ID}', { send_page_view: false });
        `}
      </Script>
      <GoogleAnalyticsPageViews />
    </>
  );
}
