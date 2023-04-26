import React from 'react';
import sanityClient from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: "jlt9xban",
    dataset: "production",
    useCdn: true,
    apiVersion: '2021-10-21'
})
const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;