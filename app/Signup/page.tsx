'use client'




import { useState } from 'react';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [licenseLevel, setLicenseLevel] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


let user_id = "1e5d0971-f9b9-4114-a6c4-0193a1e4d180"

    const userId = user_id;  
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/managers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        firstName,
        lastName,
        dateOfBirth,
        nationality,
        licenseLevel,
        profileImage,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        placeholder="Date of Birth"
      />
      <input
        type="text"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        placeholder="Nationality"
      />
      <input
        type="text"
        value={licenseLevel}
        onChange={(e) => setLicenseLevel(e.target.value)}
        placeholder="License Level"
      />
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        placeholder="Profile Image URL"
      />
      <button type="submit">Create Manager</button>
    </form>
  );
}
