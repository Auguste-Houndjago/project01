"use client"
import React, { useState } from "react";

const ManagerForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    licenseLevel: "",
    profileImage: "",
    teamId: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Manager enregistré avec succès !");
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          nationality: "",
          licenseLevel: "",
          profileImage: "",
          teamId: "",
        });
      } else {
        setMessage(data.error || "Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} />
      <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
      <input name="nationality" placeholder="Nationalité" value={formData.nationality} onChange={handleChange} />
      <input name="licenseLevel" placeholder="Niveau de licence" value={formData.licenseLevel} onChange={handleChange} />
      <input name="profileImage" placeholder="URL de l'image" value={formData.profileImage} onChange={handleChange} />
      <input name="teamId" placeholder="ID de l'équipe" value={formData.teamId} onChange={handleChange} />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Enregistrer</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ManagerForm;
