import React from 'react'
// import FeatureAssistant from './_components/FeatureAssistant'
import History from './_components/History'
import Feedback from './_components/Feedback'
import ProfileDialog from './_components/ProfileDialog'
import { UserButton } from '@stackframe/stack'
import { ArrowRight, Sparkles } from 'lucide-react'
import FeatureAssistant from './_components/FeatureAssitants'

export default function Dashboard() {
    return (
        <div className="min-h-screen relative overflow-hidden pb-20 -mt-20 w-full">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient" 
                 style={{ backgroundSize: '400% 400%' }}></div>
            
            {/* Decorative Floating Shapes */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="w-full px-6 pt-16 pb-12 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in-up">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-purple-200 mb-6 shadow-soft">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700">AI-Powered Learning Platform</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Welcome to your{' '}
                            <span className="gradient-text">AI Workspace</span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                            Access all your AI-powered learning tools, track your progress, and get personalized feedback—all in one place.
                        </p>
                        
                        <ProfileDialog>
                            {/* Profile button rendered by ProfileDialog */}
                        </ProfileDialog>
                    </div>
                </div>

                {/* Feature Grid */}
                <section className="w-full px-6 py-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-gray-900">AI Coaching Modes</h2>
                    </div>
                    <FeatureAssistant />
                </section>

                {/* History & Feedback */}
                <section className="w-full px-6 py-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-large p-8 border border-white/50 hover-lift transition-smooth">
                            <History />
                        </div>
                        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-large p-8 border border-white/50 hover-lift transition-smooth">
                            <Feedback />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
