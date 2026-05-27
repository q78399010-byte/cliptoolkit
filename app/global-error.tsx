"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#080a0f",
            color: "#f7f8fb",
            fontFamily: "sans-serif",
            padding: "24px"
          }}
        >
          <section style={{ maxWidth: "560px", textAlign: "center" }}>
            <p style={{ color: "#2ee9a6", fontWeight: 800, letterSpacing: "0.2em" }}>500</p>
            <h1 style={{ fontSize: "42px", margin: "16px 0" }}>Service temporarily unavailable</h1>
            <p style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.7 }}>
              The application failed to render. Refresh the page, or try again in a few minutes.
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
