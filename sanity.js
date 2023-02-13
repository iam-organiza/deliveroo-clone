import SanityClientConstructor, { sanityClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const sanityConfig = {
  projectId: "scplf0zv",
  dataset: "production",
  apiVersion: "2021-10-21", // use current UTC date - see "specifying API version"!
  // token: "sanity-auth-token", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
};
// const client = sanityClient(sanityConfig);


const sanityCilent = new SanityClientConstructor(sanityConfig);

const builder = imageUrlBuilder(sanityCilent)
export const urlFor = (source) => builder.image(source);

export default sanityCilent;
