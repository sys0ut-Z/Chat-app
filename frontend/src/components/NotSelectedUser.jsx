import React from 'react'
import {MessageSquare} from 'lucide-react'

const NotSelectedUser = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-5">
        {/* Icon Display */}
        <div className="flex justify-center gap-3 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
              justify-center animate-bounce"
            >
              <MessageSquare className="w-6 sm:w-8 h-6 sm:h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-xl sm:text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-xs sm:text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  )
}

export default NotSelectedUser