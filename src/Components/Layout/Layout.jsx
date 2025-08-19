import React from 'react'
import { AppFooter } from '../Footer/Footer'
import { Outlet } from 'react-router-dom';
import AppNavbar from './../Navbar/Navbar';

export default function Layout() {
    return (
        <div>

            <AppNavbar />
            <Outlet />
            <AppFooter />
        </div>
    )
}
