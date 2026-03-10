"use client"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { loginSchema} from "@/lib/validations/auth.schema"
import { LoginInput } from "@/types/auth.types"
import Image from "next/image"
import { User, KeyRound } from "lucide-react";
import FormInput from "@/features/ui/components/FormInput"
import Link from "next/link"

  
export default function LoginClient() {

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
                text-transparent mt-6 mb-6">Connectez-vous à votre compte</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center relative z-10  w-[40%] border px-7 py-5 bg-[#2c2655]/80 backdrop-blur-md border-none rounded-field">
                    <h3 className="text-2xl text-white font-bold mb-3">Connexion</h3>
                    <div  className="flex flex-col w-full space-y-4 mt-4">
                        <FormInput 
                            Icon={User}
                            placeholder="E-mail ou Nom d'utilisateur"
                            type="text"
                            error={errors.identifier}
                            registration={register("identifier")}
                            />
                            <FormInput 
                                Icon={KeyRound}
                                placeholder="Mot de passe"
                                type="password"
                                error={errors.password}
                                registration={register("password")}
                            />
                            <Link href={"/forgot"} className="inline text-end text-white/70 font-medium  hover:text-white
                             transition-all duration-200">
                            Mot de passe oublié ?
                            </Link>
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
                        Se connecter
                        {isSubmitting ??
                            <span className="loading loading-spinner loading-xs"></span>
                        }
                        </button>
                        <div className="divider font-semibold text-[#d2b9fc]/80">ou continuez avec</div>
                        <div className="flex gap-6 mt-5 mb-4">
                            <button className="btn bg-white text-[#6a6678] flex-1 text-xl h-15  hover:scale-[1.02] 
                         active:scale-[0.98]
                         transition-all duration-200 rounded-field">
                            <Image
                                src="/images/logo/google-icon.svg"
                                alt="GoogleIcon"
                                width={35}
                                height={35}
                            />
                            Google</button>
                            <button className="btn bg-white text-[#6a6678] flex-1 text-xl h-15  hover:scale-[1.02] 
                         active:scale-[0.98]
                         transition-all duration-200 rounded-field">
                            <Image
                                src="/images/logo/github-icon.svg"
                                alt="GithubIcon"
                                width={35}
                                height={35}
                            />
                            GitHub</button>
                        </div>
                        <div className="divider"></div>
                        <p className="w-full text-center justify-center text-[#d2b9fc]/80 pb-2">
                            Pas encore de compte ?{" "}
                            <Link href={"/register"} 
                            className="hover:text-purple-300 font-medium hover:underline"> 
                            Inscrivez-vous
                            </Link>
                        </p>
                       
                    </form>
                    
                </div>
        </div>
    );
}