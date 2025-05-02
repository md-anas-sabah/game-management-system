import express from "express";
import {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController";

const router = express.Router();

router.route("/").get(getGames).post(createGame);

router.route("/:id").get(getGame).put(updateGame).delete(deleteGame);

export default router;
