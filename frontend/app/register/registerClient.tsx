"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { registerSchema} from "@/lib/validations/auth.schema"
import { RegisterInput } from "@/types/auth.types"
import FormInput from "@/components/FormInput"
import Link from "next/link"
import Image from "next/image"
import { User, KeyRound, Mail, LockKeyhole } from "lucide-react";


export default function RegisterClient() {
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

    return(
        <div className="flex flex-col  justify-center items-center min-h-screen relative">
            <Image
            src="/images/background/fond2.webp"
            alt=""
            sizes="100vw"
            fill
            priority
            className="object-cover object-top -z-10"
        />
            <div className="flex flex-col items-center w-full min-h-screen justify-start pt-8 pb-15">
                 <Image 
                src="/images/logo/logo.png"
                alt="Logo"
                width={236}
                height={66}
                />
                <h1 className="text-3xl font-semibold
                bg-linear-to-r
                from-[#9DB7FF]
                via-[#C084FC]
                to-[#F472B6]
                bg-clip-text
                text-transparent mt-6 mb-6">Créer un compte</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center relative z-10  w-[40%] border px-7 py-5 bg-[#2c2655]/80 backdrop-blur-md border-none rounded-field">
                    <h3 className="text-2xl text-white font-bold mb-3">Inscription</h3>
                    <div  className="flex flex-col w-full space-y-4 mt-4">
                        <FormInput 
                            Icon={Mail}
                            placeholder="Adresse e-mail"
                            type="text"
                            error={errors.email}
                            registration={register("email")}
                            />
                        <FormInput 
                            Icon={User}
                            placeholder="Nom d'utilisateur"
                            type="text"
                            error={errors.username}
                            registration={register("username")}
                            />
                        <FormInput 
                            Icon={KeyRound}
                            placeholder="Mot de passe"
                            type="password"
                            error={errors.password}
                            registration={register("password")}
                        />
                        <FormInput 
                            Icon={LockKeyhole}
                            placeholder="Confirmer mot de passe"
                            type="password"
                            error={errors.confirmPassword}
                            registration={register("confirmPassword")}
                        />
                        <label className="flex justify-end gap-2 label px-1 text-end text-white/70 font-medium  hover:text-white
                             transition-all duration-200">
                            <input type="checkbox" className="checkbox" />
                            J'accepte les conditions d'utilisation
                        </label>
                    </div>
                    <button 
                    type="submit" 
                    className={`btn bg-[#6039a3] #8155d1 bg-linear-to-b 
                        from-[#8155d1] 
                        to-[#6039a3] 
                         py-6 w-full text-lg text-white mt-5 mb-3 shadow-lg 
                         hover:scale-[1.02] 
                         active:scale-[0.98]
                         transition-all duration-200 rounded-field
                    ${isSubmitting ? 'btn-disabled' : 'btn-active'}`}>
                       S'inscrire
                        {isSubmitting ??
                            <span className="loading loading-spinner loading-xs"></span>
                        }
                        </button>
                        <div className="divider font-semibold text-[#d2b9fc]/80">ou continuez avec</div>
                        <div className="flex gap-6 mt-5 mb-4">
                            <button className="btn bg-white text-[#6a6678] flex-1 text-lg h-14  hover:scale-[1.02] 
                         active:scale-[0.98]
                         transition-all duration-200 rounded-field">
                            <Image
                                src="/images/logo/google-icon.svg"
                                alt="GoogleIcon"
                                width={40}
                                height={40}
                            />
                            Google</button>
                            <button className="btn bg-white text-[#6a6678] flex-1 text-lg h-14  hover:scale-[1.02] 
                         active:scale-[0.98]
                         transition-all duration-200 rounded-field">
                            <Image
                                src="/images/logo/github-icon.svg"
                                alt="GithubIcon"
                                width={40}
                                height={40}
                            />
                            GitHub</button>
                        </div>
                        <div className="divider"></div>
                        <p className="w-full text-center justify-center text-[#d2b9fc]/80 pb-2">
                            Déjà un compte ?{" "}
                            <Link href={"/login"} 
                            className="hover:text-purple-300 font-bold hover:underline"> 
                            Connectez-vous
                            </Link>
                        </p>
                    </form>
                </div>
        </div>
    );
}