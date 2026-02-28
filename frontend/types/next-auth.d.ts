import "next-auth";

declare module "next-auth" {
    interface User {
      id: string;
      email: string;
      username: string;
      avatar: string;
    }
  
    interface Session {
      user: {
        id: string;
        username: string;
        email: string;
        avatar: string;
      } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      username: string;
      email: string;
      avatar: string;
    }
  }