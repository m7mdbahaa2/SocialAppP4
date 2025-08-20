import { Avatar, Dropdown, DropdownItem } from 'flowbite-react'
import React, { useState } from 'react'
import { formateDate } from '../../../lib/formatDate'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify'
import AppButton from '../../Shared/AppButton/AppButton';
import { useForm } from 'react-hook-form';
import { comment } from 'postcss';

export default function CommentPostHeader({
  user: { createdAt, body, name, photo, }, mediaID,
  isComment  // isComment is used to differentiate between a post header and a comment header
}) {

  const { register, handleSubmit } = useForm()
  const [isEditing, setIsEditing] = useState(false)
  const { mutate: Delete } = useMutation(
    {
      mutationFn: handleDelete,
      onSuccess: () => {
        toast.success("deleted successfully")
        queryClient.invalidateQueries({ queryKey: ['all-posts'] })
        queryClient.invalidateQueries({ queryKey: ['user-posts'] })
      }, onError: (error) => {
        toast.error(error?.response.data.error)
      }
    }
  )
  const queryClient = useQueryClient()

  async function handleDelete() {

    const url = isComment ? `${import.meta.env.VITE_API_URL}/comments/${mediaID}` : `${import.meta.env.VITE_API_URL}/posts/${mediaID}`


    return await axios.delete(url, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }

  const { mutate: handleCommentUpdate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toast.success("Comment updated successfully");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['all-posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-posts'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    }
  })

  async function updateComment(data) {
    return await axios.put(`${import.meta.env.VITE_API_URL}/comments/${mediaID}`, data, {
      headers: {
        token: localStorage.getItem("token")
      }
    })

  }

  return (
    <div className='flex justify-between items-start'>
      <div>
        {/* header :: user data */}
        <header className='flex items-center'>
          <Avatar className='me-4' alt={name} img={!photo.includes("undefined") ? photo : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMqESJWWqlDDmwlNN26wRx8kZk2yq3HhGZg&s`} rounded />
          <div>
            <h2>{name}</h2>
            <span>{formateDate(createdAt)}</span>
          </div>
        </header>

        {isEditing ?
          <form onSubmit={handleSubmit(handleCommentUpdate)}>
            <textarea {...register('content')} defaultValue={body} className='border border-gray-300 rounded-md p-2' />
            <div className='flex gap-4'>
              <AppButton type='submit'>Submit</AppButton>
              <AppButton type='reset' onClick={() => setIsEditing(false)}>Cancel</AppButton>
            </div>
          </form>
          :
          <h3 className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${isComment ? 'ps-16' : ''}`}>
            {body}
          </h3>}
      </div>


      <Dropdown inline label="">
        <DropdownItem onClick={() => setIsEditing(true)}>
          Edit
        </DropdownItem>
        <DropdownItem onClick={Delete}>
          Delete
        </DropdownItem>
      </Dropdown>


    </div>
  )
}