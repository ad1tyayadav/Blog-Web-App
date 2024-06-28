import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"

function PostCard({ $id, image, title }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-700 rounded-xl border-[#df7e08] border-2 p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(image)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-white text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard