export const imagesMimeTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
] as const;

export const videoMimeTypes = ["video/mp4", "video/mpeg"] as const;

export const audioMimeTypes = ["audio/mpeg"] as const;

export const mimeTypes = [
    ...imagesMimeTypes,
    ...videoMimeTypes,
    ...audioMimeTypes,
] as const;

export type MimeTypes = (typeof mimeTypes)[number];
