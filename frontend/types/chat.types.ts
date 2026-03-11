

type ChannelType = "TEXT" | "VOICE";
type ServerRole = "OWNER" | "ADMIN" | "MEMBER";
type FriendshipStatus = "PENDING" | "ACCEPTED" | "BLOCKED";
type AttachmentType = "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
type UserStatus = "online" | "offline" | "idle" | "dnd"; // dnd = do not disturb

export interface Server {
    id: string;
    name: string;
    icon?: string;
    ownerId: string;
}

export interface Channel {
    id: string;
    name: string;
    type: ChannelType;
    serverId: string;
}

export interface User {
    id: string;
    email: string;
    username: string;

    // Champs optionnels
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    avatar: string | null;
    birthday: string | null;

    status: UserStatus;

}

export type UserPreview = Pick<
  User,
  "id" | "username" | "avatar" | "status"
>

export type Friend = UserPreview;

export interface MessagePreview {
    id: string;
    content: string;
    attachmentType?: AttachmentType;
    createdAt: string;
}

export interface DMConversation {
    id: string;
    participant: UserPreview;
    lastMessage: MessagePreview | null
    unreadCount: number;
}
