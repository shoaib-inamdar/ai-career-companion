"use client"
import { UserContext } from '@/app/_context/UserContext';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api';
import { ExpertsList } from '@/services/Options';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import Link from 'next/link';
import { BookOpen, GraduationCap, Brain, Clock } from 'lucide-react';

function History() {

    const {userData} = useContext(UserContext);
    const convex = useConvex();
    const [discussionRoomList,setDiscussionRoomList] = useState([]);


    useEffect(()=>{
        userData && GetDiscussionRooms();
    },[userData]);



    const GetDiscussionRooms=async()=>{
        const result = await convex.query(api.DiscussionRoom.GetAllDiscussionRoom,{
            uid:userData?._id
        })

        console.log(result);
        setDiscussionRoomList(result);
    }

    const GetAbstractImages=(option)=>{
        const coachingOption = ExpertsList.find((item)=>item.name==option);
        return coachingOption?.abstract;
    }




    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className='font-bold text-2xl text-gray-900'>Your Previous Lectures</h2>
            </div>

            {discussionRoomList?.length==0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 bg-blue-100 rounded-full mb-4">
                        <GraduationCap className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No lectures yet</h3>
                    <p className='text-gray-500'>Start your learning journey today!</p>
                </div>
            )}

            <div className='space-y-4'>
                {discussionRoomList?.map((item,index)=> (item.coachingOption=='Topic Base Lecture'||item.coachingOption=='Learn Language'||item.coachingOption=='Meditation')&&(
                    <div key={index} className='group bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 hover:to-blue-50 rounded-xl p-4 border border-blue-200/50 hover-lift transition-smooth cursor-pointer'> 
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-4 flex-1'>
                                <div className="relative">
                                    <Image 
                                        src={GetAbstractImages(item.coachingOption)} 
                                        alt='abstract' 
                                        width={48} 
                                        height={48} 
                                        className='rounded-full w-12 h-12 ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all' 
                                    />
                                    <div className="absolute -bottom-1 -right-1 p-1 bg-blue-500 rounded-full">
                                        <Brain className="w-3 h-3 text-white" />
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <h2 className='font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors'>{item.topic}</h2>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium'>{item.coachingOption}</span>
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            <span>{moment(item._creationTime).fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <Link href={'/view-summary/'+item._id}> 
                                <Button 
                                    variant={'outline'} 
                                    className='opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-blue-50 border-blue-300 text-blue-700 hover:text-blue-800'
                                >
                                    View Feedback
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default History