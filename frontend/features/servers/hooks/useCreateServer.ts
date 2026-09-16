"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createServer,
    getServerIconUploadUrl,
    updateServerIcon,
} from "@/services/servers";
import { uploadFileToR2 } from "@/lib/uploadToR2";

type CreateServerInput = {
    name: string;
    icon?: File;
};

export default function useCreateServer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, icon }: CreateServerInput) => {
            // 1. Créer le serveur
            const server = await createServer(name);

            // 2. Si une icône a été sélectionnée
            if (icon) {
                const uploadUrl = await getServerIconUploadUrl(
                    server.id,
                    icon.type
                );

                // 3. Upload direct vers R2
                await uploadFileToR2(icon, uploadUrl);

                // 4. Finaliser côté backend
                return await updateServerIcon(server.id);
            }

            return server;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["servers"],
            });
        },
    });
}