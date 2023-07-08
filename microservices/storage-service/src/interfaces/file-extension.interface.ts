export const imageExtensions = ["png", "jpeg", "jpg", "gif"] as const;
export type ImageExtension = (typeof imageExtensions)[number];

export const audioExtensions = ["mp3"] as const;
export type AudioExtension = (typeof audioExtensions)[number];

export const videoExtensions = ["mp4", "mpeg"] as const;
export type VideoExtension = (typeof videoExtensions)[number];

export const fileExtensions = [
    ...imageExtensions,
    ...audioExtensions,
    ...videoExtensions,
] as const;
export type FileExtension = (typeof fileExtensions)[number];
