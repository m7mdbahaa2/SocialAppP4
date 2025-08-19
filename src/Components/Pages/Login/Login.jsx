
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import AppButton from "../../Shared/AppButton/AppButton";
import { useContext, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { CounterContext } from "../../Context/CounterContext";
import Tests from "../../Tests/Tests";
import { AuthContext } from "../../Context/AuthContext";


const schema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: "password cannot be shorter than 8 characters" }),
})

export default function Login() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), })
    const navigate = useNavigate()

    const [apiError, setApiError] = useState(null)

    const { setToken } = useContext(AuthContext)
    async function onClick(data) {
        console.log(data);

        try {
            const { data: response } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`, data)
            console.log(response);
            console.log(response.message);

            if (response.message === "success") {
                localStorage.setItem("token", response.token)
                setApiError(null)
                navigate('/')
                setToken(response.token)
            } else {
                setApiError(error.response.data.error)
                throw new Error("invalid login date");
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className=" max-w-lg mx-auto p-8 m-8 rounded-lg shadow-lg shadow-gray-500">

            <h1 className="font-bold text-3xl text-center pt-8 mb-8">Login</h1>
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
                    <TextInput {...register('email')} id="email" type="email" placeholder="Mohamed@Bahaa.com" shadow />
                    <p className="text-red-600">{errors.email?.message}</p>
                </div>
                {/* ************************* Password ************************** */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password">Your Password</Label>
                    </div>
                    <TextInput {...register('password', { required: 'enter a valid password' })} id="password" type="password" placeholder="Enter your password" shadow />
                    {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                </div>


                <AppButton isLoading={isSubmitting}>Login</AppButton>
                {/* <Button type="submit">Submit</Button> */}
            </form>
        </div >
    );
}
