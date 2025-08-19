import React, { useContext } from 'react'
import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { Link, NavLink } from 'react-router-dom';
// import { CounterContext } from '../Context/CounterContext';
import { AuthContext } from '../Context/AuthContext';

export default function AppNavbar() {

    // const { counter } = useContext(CounterContext)
    const { token, LogOut } = useContext(AuthContext)


    // console.log(counter);

    return (
        <div className="container mx-auto px-24">
            <Navbar>
                <NavbarBrand as={Link} to='/'>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kudo</span>
                </NavbarBrand>


                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </DropdownHeader>


                        {token ? <><DropdownItem as={Link} to='profile'>Profile</DropdownItem>
                            <DropdownDivider />
                            <DropdownItem as={Button} onClick={LogOut}>Sign out</DropdownItem>

                        </> : <><DropdownItem as={Link} to='login'>Login</DropdownItem>
                            <DropdownItem as={Link} to='register'>Register</DropdownItem>
                        </>}
                    </Dropdown>
                    <NavbarToggle />
                </div>


                {token && <NavbarCollapse>
                    <NavbarLink as={NavLink} to='/'>
                        Home
                    </NavbarLink>
                    <NavbarLink as={NavLink} to='posts' >Posts</NavbarLink>
                    <NavbarLink as={NavLink} to='counter' >Counter</NavbarLink>
                </NavbarCollapse>
                }
            </Navbar>
        </div>
    );
}
