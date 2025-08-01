import React from 'react'
import { useChatStore } from '../store/chatStore.js'
import Sidebar from '../components/Sidebar.jsx';
import NotSelectedUser from '../components/NotSelectedUser.jsx';
import ChatContainer from '../components/ChatContainer.jsx';

const Home = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {
              !selectedUser ? <NotSelectedUser /> : <ChatContainer />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home