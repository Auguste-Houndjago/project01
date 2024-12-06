"use client"

import React, { useState } from "react";

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // url : "http://localhost:3000/api/admin/register"

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, adminCode, name }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Admin enregistré avec succès !");
    } else {
      setMessage(`Erreur : ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Code Admin"
        value={adminCode}
        onChange={(e) => setAdminCode(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Enregistrer l'Admin
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default AdminForm;
