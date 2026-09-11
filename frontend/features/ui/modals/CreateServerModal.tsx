"use client";

import Modal from "./Modal";
import { useForm } from "react-hook-form";
import useCreateServer from "@/features/servers/hooks/useCreateServer";
import { uploadFileToR2 } from "@/lib/uploadToR2";
import { createServer,
        getServerIconUploadUrl,
        updateServerIcon
 } from "@/services/servers";

type CreateServerForm = {
    name: string;
    icon?: FileList;
};


export default function CreateServerModal() {

    const createServerMutation = useCreateServer();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateServerForm>();

    const onClose = () => {
        reset();
    };

    const onSubmit = async (data: CreateServerForm) => {
        try {
            const fileIcon = data.icon?.[0];
    
            await createServerMutation.mutateAsync({
                name: data.name,
                icon: fileIcon,
            });
    
            reset();
    
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal id="create-server-modal" title="Créer un serveur" onClose={onClose}> 
            <form onSubmit={handleSubmit(onSubmit)}>

                <p className="flex justify-center items-center px-2 text-sm">Donne une personnalité à ton serveur en choisissant un nom et une icône. Tu pourras toujours les modifier plus tard.</p>

                <fieldset className="fieldset mt-3">
                    <legend className="fieldset-legend">Choisir une image</legend>
                    <input 
                    id="serverImageInput"
                    type="file"
                    accept="image/*"
                    {...register("icon")} 
                    className="file-input file-input-ghost"/>
                    <label className="label">Max size 2MB</label>
                </fieldset>


                <input
                    {...register("name")}
                    type="text"
                    placeholder="Nom du serveur"
                    className="input input-bordered w-full"
                />

                {errors.name && (
                    <p className="text-error">
                        {errors.name.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Création..." : "Créer"}
                </button>
            </form>
        </Modal>
    )
}