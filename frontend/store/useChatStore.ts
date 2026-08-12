import { create } from "zustand";
import type { ChatUIStateData } from "@/types/chat.types";


type ChatUIStore = ChatUIStateData & {
    setOpenDMSection: (toOpen: boolean) => void;
    setServersSectionOpen: (toOpen: boolean) => void;
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

    isDMSectionOpen: true, // La Section DM est un "server interne" où sont stockés les DM
    isServersSectionOpen: false, // La Section Servers est la section où on affiche le contenu d'un server
    selectedDMId: null, // Sélection de la conversation privée
    selectedServerId: null, // Sélection du server
    selectedChannelId: null, // Sélection du channel
  
    messageDraftByChannel: {},
  
    isSidebarOpen: true,
  
    // -------------------
    // ACTIONS NAVIGATION
    // -------------------

    
    setOpenDMSection: (toOpen) => 
      set( (state) => ({
        isDMSectionOpen : toOpen,
        isServersSectionOpen : !toOpen,
      })),

    setServersSectionOpen: (toOpen) => 
        set( (state) => ({
          isServersSectionOpen : toOpen,
          isDMSectionOpen : !toOpen,
    }) ),

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