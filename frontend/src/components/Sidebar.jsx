import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/chatStore.js'
import { useAuthStore } from '../store/authStore.js'
import SidebarSkeleton from '../skeletons/SidebarSkeleton.jsx';
import { UserRound } from 'lucide-react';

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUserLoading } = useChatStore();

  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  // if flag is on then only show online users else show all users
  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUserLoading) {
    return <SidebarSkeleton />
  }

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b border-base-300 w-full p-5'>
        <div className='flex items-center gap-2'>
          <UserRound className='size-6' />
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>
        {/* add online users filter */}

        <div className='mt-3 hidden lg:flex items-center gap-2'>
          <label className="cursor-pointer flex items-center gap-2">
            <input 
              type="checkbox"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
              className='checkbox checkbox-sm'
            />
            <span className='text-sm'>Show Online Only</span>
          </label>
          <span className='text-xs text-zinc-500'>{onlineUsers.length - 1} online</span>
        </div>
      </div>

      <div className='overflow-y-auto w-full py-3'>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {
            /* if there are no users online */
            filteredUsers.length === 0 && (
              <div className='text-center text-zinc-500 py-4'>
                No Online Users
              </div>
            )
          }
        </div>
      </div>
    </aside>
  )
}

export default Sidebar