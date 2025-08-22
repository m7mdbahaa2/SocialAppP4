import React from 'react'
import { useForm } from 'react-hook-form'
import AppButton from '../Shared/AppButton/AppButton'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddComment({ post }) {
    const { register, handleSubmit, reset, formState: { isValid } } = useForm()
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            reset()
            toast.success("Comment added successfully");
            // بعد نجاح الاضافة، نعمل refresh للكومنتات عشان تظهر فورًا
            queryClient.invalidateQueries({ queryKey: ['all-posts'] })
            queryClient.invalidateQueries({ queryKey: ['user-posts'] })
        },
        onError: (error) => {
            toast.error("Error adding comment");
            toast.error(error.response?.data?.error)
        }
    })

    async function addComment(data) {
        return axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, { post, content: data.content }, {
            headers: { token: localStorage.getItem("token") }
        })
    }

    return (
        <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
            <textarea
                {...register("content", { required: true })}
                id="Comment"
                type="text"
                placeholder='Comment here'
                className="flex-grow"
                required
            />
            <AppButton isLoading={isPending} disabled={!isValid} type="submit">Add Comment</AppButton>
        </form>
    )
}
