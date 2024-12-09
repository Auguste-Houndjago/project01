'use client';
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Player, Statistics } from '@prisma/client';
import Image from 'next/image';
import Loader from '../ux/FootLoader';

interface PlayerStatisticsProps {
  playerId: string;
}

const PlayerStatistics: React.FC<PlayerStatisticsProps> = ({ playerId }) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [stats, setStats] = useState<Statistics | null>(null);

  useEffect(() => {

    const fetchData = async () => {

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      try {

        const response = await fetch(`${baseUrl}/api/players/${playerId}`);
        const statistics = await fetch(`${baseUrl}/api/players/${playerId}/statistics/`);

        if (!statistics.ok) {
          throw new Error(`Error fetching statistics: ${response.status}`);
        }

        const data = await response.json();
        const stat = await statistics.json();
        setPlayer(data);
        setStats(stat); 
      } catch (error) {
        console.error('Failed to fetch player data:', error);
      }
    };
    
    fetchData();
  }, [playerId]);

  if(!stats) return <div><Loader/> </div>;

  if (!player || !stats) return <div> <Loader/> </div>;

  const performanceData = [
    { name: 'Goals', value: stats.goals },
    { name: 'Assists', value: stats.assists },
    { name: 'Shots', value: stats.shots },
    { name: 'Passes', value: stats.passes },
    { name: 'Tackles', value: stats.tackles },
  ];

  return (
    <div className="space-y-6">
 <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 hover:scale-105 transition-all duration-200 border w-24">
              {player.profileImage ? (
                <Image
                  src={player.profileImage}
                  alt={`${player.firstName} ${player.lastName}`}
                  width={96}
                  height={96}
                  className="h-20 w-20"
                />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  {player.firstName}{player.lastName}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle>{`${player.firstName} ${player.lastName}`} </CardTitle>
              <p className="text-sm text-gray-500">
                {player.position} | #{player.jerseyNumber}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="physical">Physical Stats</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="physical">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Distance Covered</p>
                  <p className="text-2xl font-bold">{stats.distance} km</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sprint Speed</p>
                  <p className="text-2xl font-bold">{stats.sprintSpeed} km/h</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Stamina</p>
                  <p className="text-2xl font-bold">{stats.stamina}/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Height</p>
                  <p>{player.height} cm</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Weight</p>
                  <p>{player.weight} kg</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Nationality</p>
                  <p>{player.nationality}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p>{new Date(player.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerStatistics;