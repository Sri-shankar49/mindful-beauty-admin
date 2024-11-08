import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const LoginLayout: React.FC = () => {
    return (
        <div>
            {/* Header */}
            <Header />

            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />

        </div>
    )
}
