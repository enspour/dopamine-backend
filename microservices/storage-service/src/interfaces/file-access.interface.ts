export const fileAccesses = ["public", "private"] as const;
export type FileAccess = (typeof fileAccesses)[number];
