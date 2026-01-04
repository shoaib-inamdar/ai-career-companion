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
import { MessageSquare, Star, Award, Clock } from 'lucide-react';

function Feedback() {

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
        return coachingOption?.abstract  ?? '/ab1.png';
    }




    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className='font-bold text-2xl text-gray-900'>Feedback</h2>
            </div>

            {discussionRoomList?.length==0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 bg-purple-100 rounded-full mb-4">
                        <Award className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No feedback yet</h3>
                    <p className='text-gray-500'>Complete an interview to get feedback!</p>
                </div>
            )}

            <div className='space-y-4'>
                {discussionRoomList?.map((item,index)=> (item.coachingOption=='Mock Interview'||item.coachingOption=='Ques Ans Prep')&&(
                    <div key={index} className='group bg-gradient-to-r from-purple-50 to-transparent hover:from-purple-100 hover:to-purple-50 rounded-xl p-4 border border-purple-200/50 hover-lift transition-smooth cursor-pointer'> 
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-4 flex-1'>
                                <div className="relative">
                                    <Image 
                                        src={GetAbstractImages(item.coachingOption)} 
                                        alt='abstract' 
                                        width={48} 
                                        height={48} 
                                        className='rounded-full w-12 h-12 ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all' 
                                    />
                                    <div className="absolute -bottom-1 -right-1 p-1 bg-purple-500 rounded-full">
                                        <Star className="w-3 h-3 text-white" />
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <h2 className='font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors'>{item.topic}</h2>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className='px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium'>{item.coachingOption}</span>
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
                                    className='opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-purple-50 border-purple-300 text-purple-700 hover:text-purple-800'
                                >
                                    View Notes
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Feedback