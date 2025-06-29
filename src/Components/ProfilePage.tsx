import React from 'react'

const ProfilePage = ({ onClose }: { onClose: () => void}) => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <p className="bg-white shadow-lg p-8 text-2xl w-full max-w-md relative">
            Account
        </p>
        <p></p>
    </div>
  )
}

export default ProfilePage