import React from 'react';

const Dashboard = () => {
    const [nickname, setNickname] = React.useState('');
    const [profilePhoto, setProfilePhoto] = React.useState('');

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Personalized Dashboard</h1>
            <div className="mt-4">
                <label className="block mb-2">Nickname:</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                    className="border p-2 rounded w-full"
                    placeholder="Enter your nickname"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-2">Profile Photo:</label>
                <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            {profilePhoto && (
                <div className="mt-4">
                    <h2 className="text-xl">Your Profile Photo:</h2>
                    <img src={profilePhoto} alt="Profile" className="mt-2 w-32 h-32 rounded-full" />
                </div>
            )}
        </div>
    );
};

export default Dashboard;