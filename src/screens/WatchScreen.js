import React,{ useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme/theme';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const WatchScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const videoSource =
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
    
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    useEffect(() => {
        loadMovieDetails();
    }, []);

    const loadMovieDetails = async () => {
        try {
            const storedMovies = await AsyncStorage.getItem('rentedMovies'); 
            if (storedMovies) {
                const rentedMovies = JSON.parse(storedMovies);
                const foundMovie = rentedMovies.find(m => m.id === movieId); 
                if (foundMovie) {
                    setMovie(foundMovie); 
                }
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
                navigation.navigate('Rented', { refresh: true });
            }
        } catch (error) {
            console.error("Error marking movie as watched:", error);
        }
    };

    useFocusEffect(// if you change the screen,video will be paused
        React.useCallback(() => {
            return () => {
                if (player) {
                    player.pause();
                }
            };
        }, [player])
    );

    return (
        <View style={theme.container}>
            {movie ? (
                <View style={theme.videoContainer}>
                    <VideoView
                        style={theme.video}
                        player={player} 
                        allowsFullscreen={true} 
                        allowsPictureInPicture={true} 
                    />
                    <Text style={theme.title}>{movie.title}</Text> 
                </View>
            ) : (
                <Text style={theme.title}>Movie not found</Text> 
            )}
            <Button title="Mark as Watched" onPress={markAsWatched} /> 
        </View>
    );
};

export default WatchScreen;
