import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchContext } from '../context/SearchContext';
import MovieCard from '../components/MovieCard';
import SearchDialog from '../components/SearchDialog';
import Dialog from 'react-native-dialog'; 
import theme from '../theme/theme';

const HomeScreen = ({ navigation }) => {
    const { movies, fetchMovies } = useContext(SearchContext);
    const [isSearchDialogVisible, setSearchDialogVisible] = useState(false); 
    const [isConfirmDialogVisible, setConfirmDialogVisible] = useState(false); 
    const [rentedMovies, setRentedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); 

    useEffect(() => {
        loadRentedMovies();
    }, []);

    const loadRentedMovies = async () => {
        try {
            const storedMovies = await AsyncStorage.getItem('rentedMovies');
            if (storedMovies) {
                setRentedMovies(JSON.parse(storedMovies));
            }
        } catch (error) {
            console.error("Error loading rented movies:", error);
        }
    };

    const handleRent = (movie) => {
        setSelectedMovie(movie);
        setConfirmDialogVisible(true); 
    };

    const confirmRent = async () => {
        try {
            // Check if the movie is already rented
            if (rentedMovies.some((m) => m.id === selectedMovie.id)) {
                Alert.alert("Already Rented", "You have already rented this movie.");
                setConfirmDialogVisible(false); 
                return;
            }

            // Rent the movie
            const updatedRentedMovies = [...rentedMovies, selectedMovie];
            setRentedMovies(updatedRentedMovies);
            await AsyncStorage.setItem('rentedMovies', JSON.stringify(updatedRentedMovies));

            // Remove rented movie from movies list
            const updatedAvailableMovies = movies.filter((m) => m.id !== selectedMovie.id);

            fetchMovies(updatedAvailableMovies);  // Update the movies list after renting

            Alert.alert("Successful", `"${selectedMovie.title}" has been rented successfully!`);
            setConfirmDialogVisible(false); 
        } catch (error) {
            console.error("Error renting the movie:", error);
        }
    };

    return (
        <View style={theme.container}>
            <FlatList
                data={movies.filter(movie => !rentedMovies.some(rentedMovie => rentedMovie.id === movie.id))} 
                renderItem={({ item }) => (
                    <MovieCard movie={item} onRent={() => handleRent(item)} />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            <View style={theme.buttonContainer}>
                <TouchableOpacity 
                    style={theme.floatingButton}
                    onPress={() => setSearchDialogVisible(true)} // Show search dialog
                >
                    <Icon name="search" type="feather" color="white" size={28} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={theme.floatingButton}
                    onPress={() => navigation.navigate('Rented')}
                >
                    <Icon name="film" type="feather" color="white" size={28} />
                </TouchableOpacity>
            </View>

           
            <SearchDialog
                visible={isSearchDialogVisible}
                onClose={() => setSearchDialogVisible(false)}
                onSearch={fetchMovies}
            />

            
            <Dialog.Container visible={isConfirmDialogVisible}>
                <Dialog.Title>Confirm Rent</Dialog.Title>
                <Dialog.Description>
                    Are you sure you want to rent "{selectedMovie?.title}"?
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={() => setConfirmDialogVisible(false)} />
                <Dialog.Button label="Confirm" onPress={confirmRent} />
            </Dialog.Container>
        </View>
    );
};

export default HomeScreen;
