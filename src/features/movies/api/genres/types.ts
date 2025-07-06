export type TGetGenres = {
  response: {
    genres: TGenre[];
  };
};

export type TGenre = {
  id: number;
  name: string;
}
