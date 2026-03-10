"use client"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Providers({
    children
}: {
    children: React.ReactNode
} ) {
    const [queryClient] = useState(() => new QueryClient())
    return (
    <SessionProvider>
        <QueryClientProvider client={queryClient}>
            {children}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
                pauseOnFocusLoss={false}
            />
            
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}

        </QueryClientProvider>
    </SessionProvider>
    )
}