// Same card as the Open Graph one. Next's metadata loader reads these exports
// statically, so they're declared here rather than re-exported through.
import { site } from "@/config/site";
import opengraphImage from "./opengraph-image";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default opengraphImage;
