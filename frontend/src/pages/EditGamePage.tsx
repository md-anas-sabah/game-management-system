import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { gameApi } from "../services/api";
import { GameFormValues, Game } from "@/types/game";
import { formatDateForInput } from "../services/date-utils";
import GameForm from "../components/game/GameForm";

const EditGamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //   const { toast } = useToast();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const data = await gameApi.getGame(id);
        setGame(data);
      } catch (error) {
        console.error(`Failed to fetch game with ID ${id}:`, error);
        // toast({
        //   title: "Error",
        //   description: "Failed to load game details. Redirecting to home page.",
        //   variant: "destructive",
        // });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id, navigate]);

  const handleUpdateGame = async (values: GameFormValues) => {
    if (!id) return;
    await gameApi.updateGame(id, values);
  };

  // Return loading state while fetching the game data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading game details...</p>
      </div>
    );
  }

  // Return error state if game is not found
  if (!game) {
    return (
      <div className="text-center p-12">
        <h2 className="text-xl font-semibold mb-4">Game not found</h2>
        <p>The game you are trying to edit doesn't exist or was removed.</p>
      </div>
    );
  }

  // Prepare initial values for the form
  const initialValues: GameFormValues = {
    name: game.name,
    url: game.url,
    author: game.author,
    publishedDate: formatDateForInput(game.publishedDate),
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Game</h1>
        <p className="text-muted-foreground">
          Update the details for {game.name}.
        </p>
      </div>
      <GameForm
        initialValues={initialValues}
        onSubmit={handleUpdateGame}
        isEditing={true}
      />
    </div>
  );
};

export default EditGamePage;
