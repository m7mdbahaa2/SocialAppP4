
import axios from "axios";
import { Alert, Button, Checkbox, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import Link from "next/link";
import Login from './../Login/Login';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import AppButton from "../../Shared/AppButton/AppButton";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";


const schema = z
    .object({
        name: z.string({ message: "name should be string" }).min(3, { message: "should be more than 3 words" }),
        email: z.email({ message: '7ot emailat 3edla ya 7mada' }),
        password: z.string().min(8, { message: "password should be more than 8" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "password should be like Aa@123456" }),
        rePassword: z.string().min(8, { message: "password should be more than 8" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "password should be like Aa@123456" }),
        gender: z.enum(['male', 'female'], { message: "choose male or female" }),
        // gender: z.literal(['male', 'female'], { message: "choose male or female" }),
        dateOfBirth: z.string(),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "pass don't match",
        path: ["rePassword"]
    })

export default function Register() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    })

    const [apiError, setApiError] = useState(null)

    const navigate = useNavigate()

    async function onClick(data) {
        console.log(data);

        try {
            const { data: response } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, data)
            console.log(response);
            console.log(response.message);

            if (response.message === "success") {
                navigate('/login')
                setApiError(null)
            } else {
                throw new Error("invalid login date");

            }
        } catch (error) {
            console.log(error);
            setApiError(error.response.data.error)
        }

    }
    return (
        <div className=" max-w-lg mx-auto p-8 m-8 rounded-lg shadow-lg shadow-gray-500">

            <h1 className="font-bold text-3xl text-center pt-8 mb-8">Register</h1>
            <form
                onSubmit={handleSubmit(onClick)}
                className="flex flex-col gap-4">

                {/* ************************* ApiError ************************** */}
                {apiError && <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">
                        <p> {apiError}</p>

                    </span>
                </Alert>}

                {/* ************************* Email ************************** */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email">Your email</Label>
                    </div>
                    <TextInput {...register('email')} id="email" type="text" placeholder="Mohamed@Bahaa.com" shadow />
                    <p className="text-amber-400">{errors.email?.message}</p>
                </div>
                {/* ************************* Name ************************** */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name">Your Name</Label>
                    </div>
                    <TextInput {...register('name')} id="name" type="text" placeholder="Mohamed Bahaa" shadow />
                    <p className="text-red-600">{errors.name?.message}</p>
                </div>
                {/* ************************* Password ************************** */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password">Your Password</Label>
                    </div>
                    <TextInput {...register('password', { required: 'enter a valid password' })} id="password" type="password" placeholder="Enter your password" shadow />
                    <p className="text-blue-700">{errors.password?.message}</p>
                </div>
                {/* ************************* rePassword ************************** */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="rePassword">rePassword</Label>
                    </div>
                    <TextInput {...register('rePassword')} id="rePassword" type="password" placeholder="Confirm your password" shadow />
                    <p className="text-blue-600">{errors.rePassword?.message}</p>
                </div>
                {/* ************************* Date o birth ************************** */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="dateOfBirth">Enter your birthday date</Label>
                    </div>

<Datepicker />
                    {/* <TextInput {...register('dateOfBirth')} id="dateOfBirth" type="date" placeholder="Confirm your password" shadow /> */}
                </div>
                {/* ************************* Gender ************************** */}
                <Label htmlFor="gender">Gender</Label>
                <div className="flex gap-8 mb-6 ">
                    <div className="flex items-center gap-2">
                        <Radio id="male" {...register("gender")} value="male" />
                        <Label htmlFor="Male">Male</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio id="female" {...register("gender")} value="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                </div>
                <p className="text-gray-900">{errors.Gender?.message}</p>
                <AppButton isLoading={isSubmitting}>Register</AppButton>
            </form>
        </div >
    );
}
