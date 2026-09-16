export const permissions = {
    VIEW_CHANNEL: "VIEW_CHANNEL",
    SEND_MESSAGES: "SEND_MESSAGES",
    MANAGE_MESSAGES: "MANAGE_MESSAGES",
    MANAGE_CHANNEL: "MANAGE_CHANNEL",
    MANAGE_SERVER: "MANAGE_SERVER",
} as const;

export type Permission =
    typeof permissions[keyof typeof permissions];