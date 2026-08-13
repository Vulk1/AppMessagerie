type UserStatus = "online" | "offline" | "idle" | "dnd"; // dnd = do not disturb

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

