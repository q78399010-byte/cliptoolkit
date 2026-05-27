import { StatusPage } from "@/components/status-page";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Page not found"
      body="The page may have moved, or the link may be incorrect. Use the homepage downloader or browse the guides below."
    />
  );
}
