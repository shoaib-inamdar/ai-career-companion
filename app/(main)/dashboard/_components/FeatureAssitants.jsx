"use client"
import { Button } from '@/components/ui/button';
import { ExpertsList } from '@/services/Options';
import { useUser } from '@stackframe/stack'
import Image from 'next/image';
import React from 'react'
import { BlurFade } from '@/components/magicui/blur-fade';
import UserInputDialog from './UserInputDialog';
// import { useRouter } from 'next/router';
import ProfileDialog from './ProfileDialog';
import Link from "next/link";
import { Briefcase, Map, ArrowRight } from 'lucide-react';

function FeatureAssistant() {
    const user = useUser();
    
    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-purple-200/50 backdrop-blur-sm">
                <h2 className='text-lg font-medium text-gray-600 mb-1'>My Workspace</h2>
                <h2 className='text-3xl font-bold text-gray-900'>
                    Welcome back, <span className="gradient-text">{user?.displayName}</span>
                </h2>
            </div>

            {/* AI Coaching Cards Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                {ExpertsList.map((option, index) => (
                    <BlurFade key={option.icon} delay={0.1 + index * 0.05} inView>
                        <UserInputDialog ExpertsList={option}>
                            <div className='group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-white/50 shadow-medium hover-lift cursor-pointer overflow-hidden transition-smooth'>
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 rounded-2xl"></div>
                                
                                {/* Content */}
                                <div className='relative flex flex-col items-center justify-center gap-3 z-10'>
                                    <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <Image 
                                            src={option.icon} 
                                            alt={option.name} 
                                            width={80} 
                                            height={80} 
                                            className='h-16 w-16 object-contain' 
                                        />
                                    </div>
                                    <h2 className='text-sm font-semibold text-gray-800 text-center group-hover:text-purple-700 transition-colors'>
                                        {option.name}
                                    </h2>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </div>
                            </div>
                        </UserInputDialog>
                    </BlurFade>
                ))}
            </div>

            {/* Quick Actions */}
            <BlurFade delay={0.3} inView>
                <div className="flex flex-wrap gap-5">
                    <Link href="/jobs">
                        <div className="group cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl p-6 shadow-medium hover-lift transition-smooth min-w-[200px]">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h1 className="text-xl font-bold text-white mb-1">Find Jobs</h1>
                            <p className="text-sm text-blue-100">Explore opportunities</p>
                        </div>
                    </Link>

                    <Link href="/roadmap">
                        <div className="group cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-2xl p-6 shadow-medium hover-lift transition-smooth min-w-[200px]">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Map className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h1 className="text-xl font-bold text-white mb-1">Get Roadmap</h1>
                            <p className="text-sm text-purple-100">Plan your learning</p>
                        </div>
                    </Link>
                </div>
            </BlurFade>
        </div>
    )
}

export default FeatureAssistant
