import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
    return (
        <section className="relative h-auto footend overflow-hidden py-10 bg-black text-white">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                        </div>
                    </div>
                    <div className='links relative sm:left-[15vw]'>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base text-[7vh] sm:text-[2vw] font-medium text-white hover:text-[#df7e08]"
                                            to="https://x.com/_its_Adi"
                                        >
                                            <FaSquareXTwitter />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-full lg:w-2/12">
                            <div className="h-full">
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-[7vh] sm:text-[2vw] text-white hover:text-[#df7e08]"
                                            to="https://github.com/ad1tyayadav"
                                        >
                                            <FaGithub />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                            <div className="h-full">
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-[7vh] sm:text-[2vw] text-white hover:text-[#df7e08]"
                                            to="https://www.linkedin.com/in/aditya-yadav-webdev/"
                                        >
                                            <FaLinkedin />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-[#df7e08]">
                        &copy; Copyright 2024. All Rights Reserved by BlogHub.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer