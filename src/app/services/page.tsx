import { permanentRedirect } from "next/navigation";

/**
 * `/services` was the original path for the capabilities page. The route was
 * renamed to `/capabilities` to match what the page actually contains and what
 * the navigation calls it; this redirect keeps every existing link, bookmark
 * and search result working instead of 404-ing.
 */
export default function ServicesRedirect() {
  permanentRedirect("/capabilities");
}
