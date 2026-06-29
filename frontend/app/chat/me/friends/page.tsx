"use client"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import useAddFriend from "@/features/friends/hooks/useAddFriend";

type FormData = {
    username: string;
  };

export default function Friends() {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const { mutate: addFriend, isPending, error } = useAddFriend();

    const onSubmit = (data: FormData) => {
        addFriend(data.username, {
          onSuccess: () => {
            reset();
            toast.success("Demande envoyée !");
          },
        });
      };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full h-full">
                <div>Ajouter</div>
                <div>Tu peux ajouter des amis avec leurs nom d'utilisateur Osmose</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="join">
                <div>
                    <label className="input validator join-item">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input {...register("username", {required: true})} className="input" type="text" placeholder="Tu peux ajouter des amis avec leurs nom d'utilisateur Osmose" required />
                    </label>
                </div>
                <button className="btn btn-neutral join-item"  disabled={isPending} >Envoyer demande d'amis</button>
            </form>
            {error && toast.error("Erreur lors de l'ajout")}
        </div>

    );
}