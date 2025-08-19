import React, { useContext, useEffect, useState } from 'react'
import PostItem from './PostItem'
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useFetch from '../hooks/useFetch';
import Skeleton from 'react-loading-skeleton';

export default function PostsList({ isHome = true }) {
    // const [error, setError] = useState(null)
    // const [posts, setPosts] = useState(null)

    const { userData } = useContext(AuthContext)


    const queryKey = isHome ? ["all-posts"] : ["user-posts"]
    const endPoint = isHome ? `posts` : `users/${userData?._id}/posts?limit=2`

    const { data, isLoading, isError, error } = useFetch(queryKey, endPoint)

    //     const { data, isLoading, isError, error } = useQuery({
    //         queryKey: isHome ? ["all-posts"] : ["user-posts"],
    //         queryFn: getPosts,
    // // enabled:!!userData
    //     })
    //     console.log(data, isLoading, isError, error);


    //     async function getPosts() {

    //         const apiURL = isHome ? `${import.meta.env.VITE_BASE_URL}/posts`
    //             : `${import.meta.env.VITE_BASE_URL}/users/${userData?._id}/posts?limit=2}`


    //         return axios.get(apiURL,
    //             { headers: { token: localStorage.getItem('token') } })
    //     }

    // async function getPosts() {

    //     try {
    //         const url = isHome
    //             ? `${import.meta.env.VITE_BASE_URL}/posts`
    //             : `${import.meta.env.VITE_BASE_URL}/users/${userData._id}/posts?limit=2}`



    //         const { data: { posts } } = await axios.get(
    //             url, { headers: { token: localStorage.getItem('token') } })
    //         console.log(posts);
    //         setPosts(posts)
    //         setError(null)
    //     } catch (error) {
    //         console.log(error);
    //         setError(error.response.data.error)
    //     }
    // }


    // useEffect(() => {
    //     getPosts()
    // }, [])


    return (
        <div>
            <section className='py-12'>
                <div className='max-w-3xl mx-auto'>
                    <div className='flex flex-col gap-4'>
                        {isLoading && <Skeleton count={10}/>}
                        {/* {isLoading && <div className='text-center'>Loading...</div>} */}
                        {data && data.posts.map((post) => <PostItem key={post._id} post={post} />)}
                        {error && <div className='text-red-700 text-center'>{error.response.data.error} </div>}
                    </div>
                </div>
            </section>
        </div>
    )
    // }
}