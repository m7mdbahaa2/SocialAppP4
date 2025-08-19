import React, { useContext } from 'react'

import { Footer, FooterCopyright, FooterLink, FooterLinkGroup, NavbarLink } from "flowbite-react";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export function AppFooter() {
        const { token, LogOut } = useContext(AuthContext)
    
    return (
        <Footer container className='px-24'>
            <FooterCopyright by="Mohamed Bahaa™" year={2025} />
            <FooterLinkGroup>
                <>
                {token?                
<div className='flex items-center gap-4'>
                    <FooterLink as={Link} to='/'>Home</FooterLink>
                <FooterLink as={Link} to='profile'>Profile</FooterLink>

</div>                :
                <FooterLink as={Link} to='login'>Login</FooterLink>
                }
                </>
                {/* <FooterLink as={Link} to='counter' className='bg-blue-300 px-3 py-1'>Counter</FooterLink> */}

            </FooterLinkGroup>
        </Footer>
    );
}
