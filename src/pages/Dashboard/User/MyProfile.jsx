import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import axios from "axios";
import { imageUpload } from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const MyProfile = () => {
    const auth = getAuth();
    const { user } = useAuth();
    const [profilePicture, setProfilePicture] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const email = auth.currentUser?.email;
            if (email) {
                try {
                    const { data } = await axios.get(
                        `${import.meta.env.VITE_API_URL}/users/role/${email}`
                    );
                    setProfilePicture(data?.image || auth.currentUser.photoURL || "");
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [auth]);

    const handleFileChange = (e) => {
        setNewProfilePicture(e.target.files[0]);
    };

    const handleUpdateProfilePicture = async () => {
        if (!newProfilePicture) {
            toast.error("Please select a profile picture first!");
            return;
        }

        try {
            const imageUrl = await imageUpload(newProfilePicture);

            await updateProfile(auth.currentUser, {
                photoURL: imageUrl,
            });

            const email = auth.currentUser?.email;
            if (email) {
                await axios.patch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
                    image: imageUrl,
                });
            }

            setProfilePicture(imageUrl);
            toast.success("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toast.error("Failed to update profile picture.");
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center text-[#ca6602] mb-6">
                My Profile
            </h1>
            {user ? (
                <div className="flex flex-col items-center">
                    <img
                        src={profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-gray-300"
                    />
                    <h2 className="text-xl font-semibold text-gray-700">
                        {user.displayName || "No Name Provided"}
                    </h2>
                    <p className="text-gray-200 mb-4 mt-3 bg-[#ca6602] py-2 px-4 rounded-3xl">{user.role}</p>
                    <p className="text-gray-600">Email: {auth.currentUser.email}</p>
                    <p className="text-gray-600">phone: {user.phone}</p>
                    <div className="flex flex-col items-center gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <button
                            onClick={handleUpdateProfilePicture}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Update Profile Picture
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading user information...</p>
            )}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyProfile;
