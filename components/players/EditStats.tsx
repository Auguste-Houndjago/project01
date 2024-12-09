'use client'
import { Statistics } from "@prisma/client";
import React, { useState, useEffect } from "react";



type EditStatisticsFormProps = {
  playerId: string;
  onSuccess?: () => void;
};

const EditStatisticsForm: React.FC<EditStatisticsFormProps> = ({
  playerId,
  onSuccess,
}) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/players/${playerId}/statistics`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch statistics");
        }

        setStatistics(data[0]); 
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [playerId]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatistics((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/players/${playerId}/statistics`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statistics),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update statistics");
      }

      if (onSuccess) onSuccess();
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !statistics) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-700 rounded">
      <h2 className="text-lg font-bold">Edit Player Statistics</h2>

      {statistics &&
        Object.keys(statistics).map((key) => {
          if (key === "id" || key === "playerId") return null; 

          return (
            <div key={key} className=" bg-red-500 flex flex-col">
              <label htmlFor={key} className="text-sm font-medium">
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={(statistics as any)[key]}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
              <span>stats</span>
            </div>
          );
        })}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-500"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditStatisticsForm;
