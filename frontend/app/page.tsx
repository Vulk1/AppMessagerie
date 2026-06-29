"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {

  const {data : session, status} = useSession();
  if (status === "loading") {
    return <p>Chargement...</p>
  }
/*
  if (!session) {
    return <p>Non connecté</p>
  }

  const avatarUrl =
  `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL}/avatars/default/avatar1.png`;
  */
  return (

    <div className="flex flex-col min-h-screen relative">
      <Image
        src="/images/background/fond2.webp"
        alt=""
        sizes="100vw"
        fill
        priority
        className="object-cover object-top -z-10"
    />

    <div className="flex flex-col items-baseline min-h-screen px-[10%] py-[4%]">
      <div className="flex flex-col w-full">
            <Image 
              src="/images/logo/logo.png"
              alt="Logo"
              width={236}
              height={66}
              />
              <h1 className="text-4xl font-bold
                bg-linear-to-r
                from-[#9DB7FF]
                via-[#C084FC]
                to-[#F472B6]
                bg-clip-text
                text-transparent mt-6 mb-4">Connectez-vous. Discutez. Vibrez
              </h1>
              <p className="text-xl mb-7 font-roboto bg-linear-to-r
                from-[#ffffff]
                via-[#e4e2e7]
                to-[#beb9bc]
                bg-clip-text
                text-transparent">
                La plateforme pour vous et vos amis. La confidentialité sans compromis !
              </p>
              <div className="flex justify-baseline w-1/2 gap-2 ">
                <Link href="/register" 
                      className="btn border-0 bg-linear-to-b 
                        from-[#8155d1] 
                        to-[#6039a3] 
                        w-1/2 py-6 text-lg text-white shadow-lg 
                         hover:scale-[1.02] 
                         active:scale-[0.98]
                         transition-all duration-200 rounded-field">Commencer</Link>
                <Link 
                  href="/register"
                  className="btn btn-outline w-1/2 py-6  text-lg text-white  shadow-lg 
                  hover:scale-[1.02] 
                  active:scale-[0.98]
                  hover:text-[#6039a3] hover:bg-white hover:border-[#6039a3]
                  transition-all duration-200 rounded-field"
                  >
                  En savoir plus</Link> 
              </div>
      </div>
      <div className="w-full flex justify-baseline mt-8">
        <Image
          src="/images/illustrations/hero2.png"
          alt="IllustrationApplication"
          priority
          width={1200}
          height={800}
          className="w-full h-auto block"
      />
      </div>
    </div>
    




    </div>
  )
}
