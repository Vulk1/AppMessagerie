"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { loginSchema, registerSchema} from "@/lib/validations/auth.schema"
import { LoginInput, RegisterInput } from "@/types/auth.types"
import FormInput from "@/components/FormInput"

export default function Register() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterInput) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_REGISTER_ROUTE!, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password,
                confirmPassword: data.confirmPassword
            })
        });

        if(!res.ok) {
            const errorData = await res.json();
            toast.error(errorData?.message ?? "Erreur lors de la création de compte");
            return
        }

        const authRes = await signIn("credentials", {
            identifier: data.email,
            password: data.password,
            redirect: false
        });

        if(authRes?.error) {
            toast.error(authRes.error);
            router.push('/login');
        } else {
            router.refresh();
            router.push('/');
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-[50%] border p-4 bg-base-200 border-base-300 rounded-box">
                <h1 className="text-4xl font-bold mb-3 text-secondary">Créer un compte</h1>
                <div className="flex flex-col w-full space-y-4">
                    <FormInput 
                    label="Nom d'utilisateur"
                    placeholder="Nom d'utilisateur"
                    type="text"
                    error={errors.username}
                    registration={register("username")}
                    />
                    <FormInput 
                    label="Email"
                    placeholder="email@gmail.com"
                    type="email"
                    error={errors.email}
                    registration={register("email")}
                    />
                    <FormInput 
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    type="password"
                    error={errors.password}
                    registration={register("password")}
                    />
                    <FormInput 
                    label="Confirmer le mot de passe"
                    placeholder="Confirmer le mot de passe"
                    type="password"
                    error={errors.confirmPassword}
                    registration={register("confirmPassword")}
                    />
                </div>
                <button 
                type="submit" 
                className={`btn btn-secondary py-6 w-[80%] text-lg text-white mt-5 
                ${isSubmitting ? 'btn-disabled' : 'btn-active'}`}>
                    Créer un compte
                    {isSubmitting ??
                        <span className="loading loading-spinner loading-xs"></span>
                    }
                    </button>
            </form>
        </div>

    );
}