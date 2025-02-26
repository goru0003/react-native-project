import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RentedContext = createContext();

export const RentedProvider = ({ children }) => {
    const [rentedMovies, setRentedMovies] = useState([]);

    useEffect(() => {
        const loadRentedMovies = async () => {
            const storedMovies = await AsyncStorage.getItem('rentedMovies');
            if (storedMovies) {
                setRentedMovies(JSON.parse(storedMovies));
            }
        };
        loadRentedMovies();
    }, []);

    const addRentedMovie = async (movie) => {
        const updatedMovies = [...rentedMovies, movie];
        setRentedMovies(updatedMovies);
        await AsyncStorage.setItem('rentedMovies', JSON.stringify(updatedMovies));
    };

    const markAsWatched = async (movieId) => {
        const updatedMovies = rentedMovies.filter(movie => movie.id !== movieId);
        setRentedMovies(updatedMovies);
        await AsyncStorage.setItem('rentedMovies', JSON.stringify(updatedMovies));
    };

    return (
        <RentedContext.Provider value={{ rentedMovies, addRentedMovie, markAsWatched }}>
            {children}
        </RentedContext.Provider>
    );
};

export const useRentedContext = () => useContext(RentedContext);
