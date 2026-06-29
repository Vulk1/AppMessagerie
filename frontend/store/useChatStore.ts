import { create } from "zustand";
import type { ChatUIStateData } from "@/types/chat.types";


type ChatUIStore = ChatUIStateData & {
    setSelectedDMId: (id: string | null ) => void;
    setSelectedServer: (id: string | null) => void;
    setSelectedChannel: (id: string | null) => void;
    setMessageDraft: (channelId: string, value: string) => void;
    toggleSidebar: () => void;
  };


  export const useChatStore = create<ChatUIStore>((set) => ({
    // -------------------
    // STATE INITIAL
    // -------------------
    selectedDMId: null,
    selectedServerId: null,
    selectedChannelId: null,
  
    messageDraftByChannel: {},
  
    isSidebarOpen: true,
  
    // -------------------
    // ACTIONS NAVIGATION
    // -------------------
    setSelectedDMId: (DMId) => 
        set( {
            selectedDMId: DMId
    }),

    setSelectedServer: (serverId) =>
      set({
        selectedServerId: serverId,
        selectedChannelId: null, // reset channel quand on change de server
    }),
  
    setSelectedChannel: (channelId) =>
      set({
        selectedChannelId: channelId,
    }),
  
    // -------------------
    // MESSAGE DRAFT (UX)
    // -------------------
    
    setMessageDraft: (channelId, value) =>
      set((state) => ({
        messageDraftByChannel: {
          ...state.messageDraftByChannel,
          [channelId]: value,
        },
      })),
  
    // -------------------
    // UI ACTIONS
    // -------------------
    toggleSidebar: () =>
      set((state) => ({
        isSidebarOpen: !state.isSidebarOpen,
      })),
  
    openSidebar: () =>
      set({
        isSidebarOpen: true,
      }),
  
    closeSidebar: () =>
      set({
        isSidebarOpen: false,
      }),
  }));