import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "@/Feature/userSlice";

const ProfilePage: React.FC = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        User not logged in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#008bdc] p-6 flex items-center gap-6">
          <img
            src={user.photo || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <div className="text-white">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm mt-1">{user.email}</p>
            {user.phone && <p className="text-sm mt-1">{user.phone}</p>}
            {user.college && <p className="text-sm mt-1">{user.college}</p>}
            {user.location && <p className="text-sm mt-1">{user.location}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex gap-4">
          <Link
            href="/userapplication"
            className="bg-[#008bdc] text-white px-4 py-2 rounded-md font-medium hover:bg-[#006fa8]"
          >
            View Applications
          </Link>
          <Link
            href="/editprofile"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300"
          >
            Edit Profile
          </Link>
        </div>

        {/* Details Section */}
        <div className="p-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold text-gray-600">Full Name</h2>
            <p className="mt-1 text-gray-800">{user.name}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600">Email</h2>
            <p className="mt-1 text-gray-800">{user.email}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600">Phone</h2>
            <p className="mt-1 text-gray-800">{user.phone || "-"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600">
              College / Organization
            </h2>
            <p className="mt-1 text-gray-800">{user.college || "-"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-600">Location</h2>
            <p className="mt-1 text-gray-800">{user.location || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
