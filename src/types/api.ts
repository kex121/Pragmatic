import type { Game } from "./game";

export interface ApiResponse {
  result: Game[];
  status: number;
  error_message: string;
}
