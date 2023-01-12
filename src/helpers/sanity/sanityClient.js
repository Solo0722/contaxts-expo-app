import sanityClient from "@sanity/client";
import { SANITY_TOKEN } from "@env";

export const client = sanityClient({
  projectId: "df4ct477",
  dataset: "production",
  apiVersion: "2023-01-11",
  useCdn: true,
  token: SANITY_TOKEN,
});
