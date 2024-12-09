"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ShieldCheck } from "lucide-react";

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);



    try {
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
        setIsError(false);
    
        setEmail("");
        setName("");
        setAdminCode("");
      } else {
        setMessage(`Erreur : ${data.error}`);
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur de communication avec le serveur.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <ShieldCheck className="w-10 h-10 text-green-600" />
            Enregistrement Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Adresse email de l'admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-2">
                Code Admin
              </label>
              <Input
                id="adminCode"
                type="text"
                placeholder="Code d'authentification"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement en cours..." : "Enregistrer l'Admin"}
            </Button>

            {message && (
              <Alert variant={isError ? "destructive" : "default"}>
                {isError ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminForm;