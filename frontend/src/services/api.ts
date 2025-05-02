/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios from "axios";
import { Game, GameFormValues, ApiResponse } from "../types/game";

const API_URL = "https://game-management-system.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const gameApi = {
  getAllGames: async (): Promise<Game[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Game[]>>("/games");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  },

  getGame: async (id: string): Promise<Game> => {
    try {
      const response = await apiClient.get<ApiResponse<Game>>(`/games/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching game ${id}:`, error);
      throw error;
    }
  },

  createGame: async (gameData: GameFormValues): Promise<Game> => {
    try {
      const response = await apiClient.post<ApiResponse<Game>>(
        "/games",
        gameData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating game:", error);
      throw error;
    }
  },

  updateGame: async (id: string, gameData: GameFormValues): Promise<Game> => {
    try {
      const response = await apiClient.put<ApiResponse<Game>>(
        `/games/${id}`,
        gameData
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error updating game ${id}:`, error);
      throw error;
    }
  },

  deleteGame: async (id: string): Promise<void> => {
    try {
      await apiClient.delete<ApiResponse<{}>>(`/games/${id}`);
    } catch (error) {
      console.error(`Error deleting game ${id}:`, error);
      throw error;
    }
  },
};
