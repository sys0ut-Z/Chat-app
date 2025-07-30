import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore.js'
import { Camera, Mail, UsersRound } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile, imageCount} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    // ! user cannot change it's profile pic more than 10 times
    // if(imageCount > 10){
    //   return toast.error("limit reached, you cannot update your profile pic");
    // }

    const file = e.target.files[0];
    setSelectedImg(file); // set it for objectUrl

    if(!file)
      return;

    // upload image to cloudinary via multer
    await updateProfile({ profilePic:file });

    // const reader = new FileReader();

    // reader.readAsDataURL(file);

    // reader.onload = async () => {
    //   const base64Image = reader.result;
    //   setSelectedImg(base64Image);

    //   // store in cloudinary via Zustand store
    //   await updateProfile({ profilePic:base64Image });
    // }

    // profile image message
    // toast.success(`You can change profile pic ${10 - imageCount} more times`);
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto px-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>

          {/* Heading section */}
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser.profilePic ? authUser.profilePic : selectedImg ? URL.createObjectURL(selectedImg) : "/avatar.png"}
                alt="Profile"
                className="size-24 sm:size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* // ! Update Details - Disabled */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <UsersRound className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
          
          {/* Status & Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage