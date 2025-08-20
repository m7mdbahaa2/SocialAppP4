import React from 'react'
import Add from '../../Add/Add'
import PostsList from './../../PostsList/PostsList';
import { ProfileCard } from '../../ProfileCard/ProfileCard';
import { Helmet } from "react-helmet";


export default function Posts() {
    return (
        <div>
            <section className='py-12'>
                <div className='max-w-3xl mx-auto'>
                    <Helmet>
                        <title>Posts | postsss</title>
                    </Helmet>

                    <ProfileCard />
                    <Add />
                    <PostsList isHome={false} />
                </div>
            </section>
        </div>
    )
}
