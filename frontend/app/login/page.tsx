"use client"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { loginSchema} from "@/lib/validations/auth.schema"
import { LoginInput } from "@/types/auth.types"
import FormInput from "@/components/FormInput"


export default function Login() {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginInput) => {
        const res = await signIn("credentials", {
            identifier: data.identifier,
            password: data.password,
            redirect: false
    });

    if(res?.error) {
        toast.error(res.error || "Erreur lors de la connexion");
        return
    } else {
        router.refresh();
        router.push('/');
    }
    }

    return(
        <div className="flex flex-col justify-center items-center h-screen">
             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-[50%] border p-4 bg-base-200 border-base-300 rounded-box">
                <h1 className="text-4xl font-bold mb-3 text-secondary">Se connecter</h1>
                <div  className="flex flex-col w-full space-y-4 ">
                    <FormInput 
                        label="Nom d'utilisateur ou Email"
                        placeholder="Identifiant"
                        type="text"
                        error={errors.identifier}
                        registration={register("identifier")}
                        />
                        <FormInput 
                            label="Mot de passe"
                            placeholder="Mot de passe"
                            type="password"
                            error={errors.password}
                            registration={register("password")}
                        />
                </div>
                <button 
                type="submit" 
                className={`btn btn-secondary py-6 w-[80%] text-lg text-white mt-5 
                ${isSubmitting ? 'btn-disabled' : 'btn-active'}`}>
                    Se connecter
                    {isSubmitting ??
                        <span className="loading loading-spinner loading-xs"></span>
                    }
                    </button>
            </form>
        </div>
    );
}