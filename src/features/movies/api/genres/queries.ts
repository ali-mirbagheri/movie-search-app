import { useQuery } from "@tanstack/react-query";
import { getGenres } from "./utils";
import type { ApiError } from "../../../../shared/utils/errorHandler";
import type { TGenre } from "./types";

export const useGenres = () =>
  useQuery<TGenre[], ApiError>({
    queryKey: ["genres"],
    queryFn: getGenres
});
