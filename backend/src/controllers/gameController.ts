import { Request, Response } from "express";
import Game, { IGame } from "../models/Game";

export const createGame = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const game: IGame = await Game.create(req.body);
    res.status(201).json({
      success: true,
      data: game,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games: IGame[] = await Game.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const game: IGame | null = await Game.findById(req.params.id);

    if (!game) {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateGame = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let game: IGame | null = await Game.findById(req.params.id);

    if (!game) {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
      return;
    }

    game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGame = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const game: IGame | null = await Game.findById(req.params.id);

    if (!game) {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
      return;
    }

    await game.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
