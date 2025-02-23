import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme/theme';

const WatchScreen = ({ route, navigation }) => {
    const { movieId } = route.params; 
    const [movie, setMovie] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); 

    useEffect(() => {
        loadMovieDetails();
    }, []);

    const loadMovieDetails = async () => {
        try {
            const storedMovies = await AsyncStorage.getItem('rentedMovies');
            if (storedMovies) {
                const rentedMovies = JSON.parse(storedMovies);
                const foundMovie = rentedMovies.find(m => m.id === movieId);
                setMovie(foundMovie);
                setIsVideoPlaying(true); // Start playing the video 
            }
        } catch (error) {
            console.error("Error loading movie details:", error);
        }
    };

    const markAsWatched = async () => {
        try {
            const storedMovies = await AsyncStorage.getItem('rentedMovies');
            if (storedMovies) {
                const rentedMovies = JSON.parse(storedMovies);
                const updatedMovies = rentedMovies.filter(movie => movie.id !== movieId);
                await AsyncStorage.setItem('rentedMovies', JSON.stringify(updatedMovies));
                Alert.alert("Successful", "Movie marked as watched.");
                navigation.navigate('Rented', { refresh: true });
            }
        } catch (error) {
            console.error("Error marking movie as watched:", error);
        }
    };

    return (
        <View style={theme.container}>
            {isVideoPlaying && (
                <View style={theme.videoContainer}>
                    <Video
                        source={require('../../assets/minions.mp4')} 
                        style={theme.video}
                        useNativeControls
                        resizeMode="contain"
                    />
                    <Text style={theme.title}>{movie.title}</Text>
                </View>
            )}
            <Button title="Mark as Watched" onPress={markAsWatched} />
        </View>
    );
};

export default WatchScreen;
