type ChannelType = "TEXT" | "VOICE";
type ServerRole = "OWNER" | "ADMIN" | "MEMBER";
type FriendshipStatus = "PENDING" | "ACCEPTED" | "BLOCKED";
type AttachmentType = "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
type UserStatus = "online" | "offline" | "idle" | "dnd"; // dnd = do not disturb

export interface Server {
    id: string;
    name: string;
    icon?: string;
}

export interface ServerDetails {
    id: string,
    name : string,
    icon: string | null,
    ownerId: string,
    createdAt?: Date | null,
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
    avatar: string;

    // Champs optionnels
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    birthday: string | null;

    //status à implémenter plus tard
}

export type UserPreview = Pick<
  User,
  "id" | "username" | "avatar" // status à ajouter plus tard
>

export type Friend = UserPreview;

export interface MessageDTO {
    id: string;
    content: string | null;
    senderId: string;

    sender: {
        id: string;
        username: string;
        avatar: string | null;
    };

    channelId: string;
    attachments: AttachmentDTO[];
    createdAt: string;
}

export interface AttachmentDTO {
    id: string;
    messageId: string;
    url: string;
    thumbnailUrl: string | null;
    type: AttachmentType;
    width: number | null;
    height: number | null;
    createdAt: string;
}

export type ChatUIStateData = {
    isDMSectionOpen: boolean;
    isServersSectionOpen: boolean;
    selectedDMId: string | null;
    selectedServerId: string | null;
    selectedChannelId: string | null;
    messageDraftByChannel: Record<string, string>;
    isSidebarOpen: boolean;
};

export interface MessagesPageDTO {
    messages: MessageDTO[];
    nextCursor: string | null;
}
