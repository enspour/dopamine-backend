export const fileAccesses = [
    "denied",
    "public",
    "private",
    "links & groups",
] as const;
export type FileAccess = (typeof fileAccesses)[number];
