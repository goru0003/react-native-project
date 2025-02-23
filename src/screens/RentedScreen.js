import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme/theme'; 

const RentedScreen = ({ route, navigation }) => {
    const [rentedMovies, setRentedMovies] = useState([]);

    
    useEffect(() => {
        loadRentedMovies();
    }, [route.params?.refresh]); 

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

    const handleWatch = (movieId) => {
        navigation.navigate('Watch', { movieId });
    };

    return (
        <View style={theme.container}>
            <Text style={theme.title}>Rented Movies</Text>
            <Text style={[theme.count, { marginTop: 20 }]}>Total Rented Movies: {rentedMovies.length}</Text>  
            <FlatList
                data={rentedMovies}
                renderItem={({ item }) => (
                    <View style={theme.movieCard}> 
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={theme.movieImage} 
                        />
                        <Text style={theme.movieTitle}>{item.title}</Text>
                        <TouchableOpacity 
                            style={theme.watchButton} 
                            onPress={() => handleWatch(item.id)}
                        >
                            <Text style={theme.watchButtonText}>Watch</Text> 
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </View>
    );
};

export default RentedScreen;
