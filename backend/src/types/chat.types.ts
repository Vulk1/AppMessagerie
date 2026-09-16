import type { Request } from "express";
import { ChannelType, AttachmentType } from "../generated/prisma/enums.js";
export type UserStatus = "online" | "offline" | "idle" | "dnd"; // dnd = do not disturb

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    avatar: string;

    // Champs optionnels
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    birthday: Date | null;
}

export type UserPreview = Pick<
  UserProfile,
  "id" | "username" | "avatar"
>

export interface ServerDetails {
  id: string,
  name : string,
  icon: string | null,
  ownerId: string,
  createdAt?: Date | null,
}

export interface ServerPreview {
  id: string,
  name: string,
  icon: string | null
}

export interface Channel {
  id: string,
  name: string,
  serverId: string,
  createdAt?: Date | null,
  type : ChannelType
}


export type ResourceResolver<
    Params extends Record<string, string> = Record<string, string>
> = (
    req: Request<Params>
) => Promise<string | null>;


export interface Message {
  id: string;
  content: string | null;
  senderId: string;
  sender: {
    id: string;
    username: string;
    avatar: string | null;
  };
  channelId: string;
  attachments: Attachment[];
  createdAt: Date;
}

export interface Attachment {
  id: string;
  messageId: string;
  url: string;
  thumbnailUrl: string | null;
  type: AttachmentType;
  width: number | null;
  height: number | null;
  createdAt: Date;
}