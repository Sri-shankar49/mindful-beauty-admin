import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'

export const LoginLayout: React.FC = () => {
    return (
        <div>
            {/* Header */}
            <Header />

            <main>
                <Outlet />
            </main>

            {/* Footer */}

        </div>
    )
}
