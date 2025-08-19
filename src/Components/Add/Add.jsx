import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Card, Checkbox, Label, TextInput, theme } from 'flowbite-react'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Add() {

    const inputRef = useRef()
    const { register, handleSubmit, reset } = useForm()


    const { mutate } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            // console.log(data);
            toast.success("post added successfully")
            reset() 
        }, onError: (error) => {
            console.log(error);
            toast.error(error.response.data.error)

        }
    })

    async function addPost(data) {
        console.log(data.body, inputRef.current.files[0]);
        const formData = new FormData()
        formData.append("body", data.body)
        if (inputRef.current.files[0]) {
            formData.append('image', inputRef.current.files[0])
        }

        return await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, formData, {
            headers: { token: localStorage.getItem('token') }
        })

        // try {
        // console.log(data);
        // toast.success("post added successfully")
    }
    // catch (error) {
    //     console.log(error);
    //     toast.error(error.response.data.error)
    // }


    return (
        <div>
            <Card>
                <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
                    <div className="mb-2 block">
                        <Label htmlFor="addPost" className='block mb-3' >Post Something</Label>
                        <div className='flex gap-3'>
                            <TextInput {...register("body")} id="addPost" type="text" placeholder='Post Something' className="flex-grow" required />
                            <input {...register("image")} ref={inputRef} hidden type='file' />
                            <FaCloudUploadAlt onClick={() => inputRef.current.click()} className='text-4xl cursor-pointer' />
                        </div>

                    </div>
                    <Button type="submit">Create Post</Button>
                </form>
            </Card>

        </div >
    )
}
