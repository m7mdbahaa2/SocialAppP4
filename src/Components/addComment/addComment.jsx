import React from 'react'
import { useForm } from 'react-hook-form'
import AppButton from '../Shared/AppButton/AppButton'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddComment({ post }) {

    const { register, handleSubmit, reset, formState: { isValid } } = useForm()

    const { mutate, isPending } = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            reset()
            toast.success("Comment added successfully");
        }, onError: (error) => {
            toast.error("Error adding comment");
            toast.error(error.response.data.error)
        }
    })

    async function addComment(data) {

        return axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, data, {
            headers: { token: localStorage.getItem("token") }
        })
    }



    return (
        <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
            <textarea  {...register("content", { required: true })} id="Comment" type="text" placeholder='lsa vid 13 bta3 el comments feh moshkla w mtb2tsh 3leh' className="flex-grow" required />
            <AppButton isLoading={isPending} disabled={!isValid} type="submit">Add Comment</AppButton>
        </form>
    )
}
