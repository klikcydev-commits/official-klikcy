import { permanentRedirect } from "next/navigation";

export default function ServicesIndexPage() {
  permanentRedirect("/all-services/");
}
