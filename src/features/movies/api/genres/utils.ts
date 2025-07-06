
import api from "../../../../shared/api/configs/axios";
import { handleApiError } from "../../../../shared/utils/errorHandler";
import { type TGenre, type TGetGenres } from "./types";

export const getGenres = async (): Promise<TGenre[]> => {
  try {
    const res = await api.get<TGetGenres['response']>('/genre/movie/list');
    return res.data.genres; 
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch genres');
  }
};