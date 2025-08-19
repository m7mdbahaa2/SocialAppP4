import { Avatar } from 'flowbite-react'
import React from 'react'
import { formateDate } from '../../../lib/formatDate'

export default function CommentPostHeader({
  user: { createdAt, body, name, photo },
  isComment = false // isComment is used to differentiate between a post header and a comment header
}) {
  return (
    <div>
      {/* header :: user data */}
      <header className='flex items-center'>
        <Avatar className='me-4' alt={name} img={!photo.includes("undefined") ? photo : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMqESJWWqlDDmwlNN26wRx8kZk2yq3HhGZg&s`} rounded />
        <div>
          <h2>{name}</h2>
          <span>{formateDate(createdAt)}</span>
        </div>
      </header>

      <h3 className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${isComment ? 'ps-16' : ''}`}>
        {body}
      </h3>
    </div>
  )
}
