import { defineStore } from "pinia";
import axios from "axios";
import { Board } from "../../../types/Board";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7777", // Use correct port
});

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: [] as Board[],
    currentBoard: null as Board | null,
  }),
  actions: {
    setBoards(boards: Board[]) {
      this.boards = boards;
    },

    setCurrentBoard(board: Board) {
      this.currentBoard = board;
    },

    async fetchBoards() {
      try {
        const response = await axiosInstance.get("/board/list");
        this.setBoards(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createBoard(board: Board) {
      try {
        const response = await axiosInstance.post("/board/register", board);
        this.boards.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
