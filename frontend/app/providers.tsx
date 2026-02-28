"use client"
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Providers({
    children
}: {
    children: React.ReactNode
} ) {
    return (
    <SessionProvider>
        {children}

    {/* Toast global */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        pauseOnFocusLoss={false}
      />
    </SessionProvider>
    )
}