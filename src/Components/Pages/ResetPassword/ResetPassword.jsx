import React, { useState } from 'react'
import AppButton from '../../Shared/AppButton/AppButton'
import { Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ResetPassword() {
    const [email, setEmail] = useState(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()


    const { mutate } = useMutation({
        mutationFn: resetPassword, onSuccess: (data) => {
            setEmail(data.email)
            console.log(data);
            toast.success("Password changed successfully");
        }, onError: (error) => {
            console.error(error);
            toast.error(error.response.data.error);
        }
    })

    async function resetPassword(params) {
        console.log(params);

        return axios.patch(`${import.meta.env.VITE_API_URL}/users/change-password`, { password: params.oldPassword, newPassword: params.newPassword }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }


    return (
        <>
            <div className=" max-w-lg mx-auto p-8 m-8 rounded-lg shadow-lg shadow-gray-500">

                <h1 className="font-bold text-3xl text-center pt-8 mb-8">Change Password</h1>
                <form
                    onSubmit={handleSubmit(mutate)}
                    className="flex flex-col gap-4">

                    {/* ************************* Old Password ************************** */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="oldPassword">Your Old Password</Label>
                        </div>
                        <TextInput {...register('oldPassword', { required: 'enter a valid password' })} id="oldPassword" type="password" placeholder="Enter your old password" shadow />
                        {errors.oldPassword && <p className="text-red-700">{errors.oldPassword.message}</p>}
                    </div>

                    {/* ************************* New Password ************************** */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="newPassword">Your New Password</Label>
                        </div>
                        <TextInput {...register('newPassword', { required: 'enter a valid password' })} id="newPassword" type="password" placeholder="Enter your new password" shadow />
                        {errors.newPassword && <p className="text-red-700">{errors.newPassword.message}</p>}
                    </div>

                    <AppButton >Change Password</AppButton>

                    {/* <div>
                        <p className='inline-block me-2'>Return to </p><Link to='/login' className='inline-block pointer-coarse: underline text-blue-700'>login</Link>
                    </div>
                    <Button type="submit">Submit</Button> */}
                </form>
            </div >
        </>
    )
}
