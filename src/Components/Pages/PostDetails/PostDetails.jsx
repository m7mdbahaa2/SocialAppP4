// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../../PostsList/PostItem";
import useFetch from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
// import { Query, useQuery } from "@tanstack/react-query";

export default function PostDetails() {
  // const [post, setPost] = useState(null);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetch(["details-posts", id], `posts/${id}`)


  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["details-posts", id],
  //   queryFn: getPost
  // });
  // console.log("data", data);

  // async function getPost() {

  //   return axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
  //     headers: { token: localStorage.getItem("token") }
  //   })
  // };

  // async function getPost() {
  //   try {
  //     const {
  //       data: { post },
  //     } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
  //       headers: { token: localStorage.getItem("token") },
  //     });
  //     console.log(post);
  //     setPost(post);
  //     console.log(localStorage.getItem("token"));

  //     console.log(post);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(localStorage.getItem("token"));
  //   }
  // }

  // useEffect(() => {
  //   getPost();
  // }, []);

  return (
    <section className='py-12'>
      <div className='max-w-3xl mx-auto'>
        <div className='flex flex-col gap-4'>
          {isLoading && <Skeleton />}
          {/* {isLoading && <div className='text-center'>Loading...</div>} */}

          {error && <div className='text-red-700 text-center'>{error.response.data.error} </div>}

          {data && (<PostItem post={data.post} /*   post={post} de el post ely gayaly mn useState >> setPost(post)*/ showAllComments={true} />
          )}
        </div>
      </div>
    </section>
  );
}
