import { Avatar, Card } from "flowbite-react";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CommentPostHeader from "../Pages/Posts/CommentPostHeader";
import AddComment from "../addComment/addComment";

export default function PostItem({ post, showAllComments = false }) {
  const {
    body,
    image,
    user: { name, photo },
    comments,
    createdAt,
    _id,
  } = post;
  return (
    <>
      <Card>
        {/* header :: user data
                <header className='flex items-center'>
                    <Avatar className='me-4' alt={name} img={photo} rounded />

                    <div>
                        <h2>{name}</h2>
                        <span>{createdAt}</span>
                    </div>
                </header>

                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {body}
                </h3> */}

        <CommentPostHeader user={{ name, photo, createdAt, body }} mediaID={_id} isComment={false} />
        {/* body */}
        {image && <img src={image} className="h-96 object-contain" alt={body} />}

        {/* footer */}

        <div className="flex items-center justify-between">
          <AiFillLike />
          <div className="flex flex-col gap-2">
            <FaComment />
            {comments && comments.length}
            {/* comments */}
          </div>
          <Link to={`/posts/${_id}`}>
            <FaShare />
          </Link>
        </div>
        {comments &&
          comments.length > 0 &&
          (showAllComments ? (
            <>
              {comments.map((comment) => (
                <CommentPostHeader
                  user={{
                    ...comment.commentCreator, // c3mltha .... 3shan 3ayz kol ely feha bdl ma a3mlhom 5twa 5twa
                    createdAt: comment.createdAt,
                    body: comment.content,
                  }}
                  mediaID={comment._id}
                  isComment={true} // mktooob f el 7eta de 3shan ykon f 7alt en 3ndy comment msh bara elmokarna w kda m3moloo destructuring f el component CommentPostHeader
                />
              ))}
            </>
          ) : (
            <>
              <CommentPostHeader
                user={{
                  ...comments[comments.length - 1].commentCreator, // c3mltha .... 3shan 3ayz kol ely feha bdl ma a3mlhom 5twa 5twa
                  createdAt: comments[comments.length - 1].createdAt,
                  body: comments[comments.length - 1].content,
                }}
                mediaID={comments[comments.length - 1]._id}  // bb3t mn hena el id bta3 el comment 3shan f el postHeader y2dr yfr2 da el id bta3 anhy comment 3shan fo2 ana ba3t brdo id el post w el etnin b nfs el esm mediaID f y3rf el id ely gowaha da gay mnin  
                isComment={true} // mktooob f el 7eta de 3shan ykon f 7alt en 3ndy comment msh bara elmokarna w kda m3moloo destructuring f el component CommentPostHeader
              />
            </>
          ))}
        <AddComment post={_id} />
      </Card>
    </>
  );
}
