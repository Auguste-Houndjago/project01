'use client';

import { useState, useEffect } from 'react';
import { 
  DndContext, 
  MouseSensor,
  TouchSensor,
  useSensor, 
  useSensors,
  DragOverlay,
  closestCenter
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { PlayerCard, PlayerCardProps } from './player-card';
import { players } from '@/app/players/page';



// => triable card
const SortablePlayerCard = ({
  player,
  droppedId,
}: {
  player: player02;
  droppedId: string | null;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: player.id });

  const isDropped = droppedId === player.id; 

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative touch-none ${isDropped ? 'card-bounce ' : ''}`}
    >
      <div className={`${isDragging ? 'z-50' : 'z-0'}`}>
        <PlayerCard player={players} />
      </div>
    </div>
  );
};


export default function PlayerList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<player02[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [droppedId, setDroppedId] = useState<string | null>(null);

  // recup user=> /api/players
  useEffect(() => {
    setItems(players02)
  }, []);

  // => (drag avec délai)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setDroppedId(active.id); 
    setTimeout(() => {
      setDroppedId(null); 
    }, 500);
    setActiveId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (items.length === 0) {
    return (
      <Alert>
        <AlertDescription>No players found.</AlertDescription>
      </Alert>
    );
  }

  // (fund)=> active card
  const activePlayer = activeId ? items.find((p) => p.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((p) => p.id)} strategy={rectSortingStrategy}>
        <div className="grid bg-none grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((player) => (
            <SortablePlayerCard
              key={player.id}
              player={player}
              droppedId={droppedId}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId && activePlayer ? (
          <div className="transform scale-105 opacity-90 shadow-lg">
            <PlayerCard player={activePlayer} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}



type player02 = {

    id: string
    firstName: string
    lastName: string
    position: string
    jerseyNumber?: number
    profileImage?: string
    nationality: string
  
}

export const players02=[ 
  {
    id: "1",
    firstName: "joeur ",
    lastName: "special",
    position: "GK",
    jerseyNumber: 2,
    profileImage: "",
    nationality: "togolaise"
  },
  {
    id: "2",
    firstName: "joeur tres ",
    lastName: "special",
    position: "GK",
    jerseyNumber: 2,
    profileImage: "",
    nationality: "togolaise"
  },
  {
    id: "3",
    firstName: "Agbota ",
    lastName: "special",
    position: "FK",
    jerseyNumber: 2,
    profileImage: "",
    nationality: "togolaise"
  }


]