import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (query) => {
    console.log("Fetching movies for query:", query); 
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      method: 'GET',
      headers: {
        accepts: 'application/json',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODc0NjRjOTg0NzZhNTlhNmQyZWRmMzcyOTA3MDJjNCIsIm5iZiI6MTcxMDc5ODMzNy44NCwic3ViIjoiNjVmOGI2MDE4ZWUwYTkwMTg2Y2QzYmI4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.IObsPrpQvvxDwfkSuyB_SrsOs-hzXzjmUrS1-cG2iUY',
      },
    });
    const data = await response.json();
    setMovies(data.results);
  };

  const removeMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  return (
    <SearchContext.Provider value={{ movies, fetchMovies, removeMovie }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);