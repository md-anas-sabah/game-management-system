import React from "react";

import { gameApi } from "../services/api";
import { GameFormValues } from "../types/game";
import GameForm from "../components/game/GameForm";

const CreateGamePage: React.FC = () => {
  const handleCreateGame = async (values: GameFormValues) => {
    await gameApi.createGame(values);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Game</h1>
        <p className="text-muted-foreground">
          Fill in the details to add a new game to your collection.
        </p>
      </div>
      <GameForm onSubmit={handleCreateGame} isEditing={false} />
    </div>
  );
};

export default CreateGamePage;
