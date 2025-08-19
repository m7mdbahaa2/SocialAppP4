import React from 'react'
import Add from '../../Add/Add'
import PostsList from './../../PostsList/PostsList';

export default function Posts() {
    return (
        <div>
            <section className='py-12'>
                <div className='max-w-3xl mx-auto'>
                    <Add />
                    <PostsList isHome={false} />
                </div>
            </section>
        </div>
    )
}
