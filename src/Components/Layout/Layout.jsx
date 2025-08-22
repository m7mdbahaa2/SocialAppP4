import React from 'react'
import { AppFooter } from '../Footer/Footer'
import { Outlet } from 'react-router-dom';
import AppNavbar from './../Navbar/Navbar';
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
    return (
        <div>
            <Online>
                <AppNavbar />
                <Outlet />
                <AppFooter />
            </Online>
            <Offline>
                <h1 className='bg-red-600 flex justify-center align-middle h-full'>you are offline</h1>
            </Offline>
        </div>
    )
}
