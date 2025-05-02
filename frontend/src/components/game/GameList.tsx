import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { gameApi } from "../../services/api";
import { Game } from "../../types/game";
import { formatDateForDisplay } from "../../services/date-utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DeleteGameDialog from "./DeleteGameDialog";

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  //   const { toast } = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const data = await gameApi.getAllGames();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to load games. Please try again.",
      //     variant: "destructive",
      //   });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (game: Game) => {
    setGameToDelete(game);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!gameToDelete) return;

    try {
      await gameApi.deleteGame(gameToDelete._id);
      setGames(games.filter((game) => game._id !== gameToDelete._id));
      //   toast({
      //     title: "Success",
      //     description: `${gameToDelete.name} has been deleted successfully.`,
      //   });
    } catch (error) {
      console.error("Failed to delete game:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to delete game. Please try again.",
      //     variant: "destructive",
      //   });
    } finally {
      setIsDeleteDialogOpen(false);
      setGameToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading games...</p>
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="text-center p-12">
        <h2 className="text-xl font-semibold mb-4">No games found</h2>
        <p className="mb-6">Start by adding a new game to your collection.</p>
        <Link to="/games/new">
          <Button>Add Your First Game</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Games Collection</h1>
        <Link to="/games/new">
          <Button>Add New Game</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card key={game._id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{game.name}</CardTitle>
              <CardDescription>By {game.author}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="mb-2">
                <p className="text-muted-foreground">Game URL:</p>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {game.url}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground">Published:</p>
                <p>{formatDateForDisplay(game.publishedDate)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-3 border-t">
              <Link to={`/games/edit/${game._id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteClick(game)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <DeleteGameDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        gameName={gameToDelete?.name || ""}
      />
    </div>
  );
};

export default GameList;
