import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Card } from 'react-native-elements';
import theme from '../theme/theme';  

const MovieCard = ({ movie, onRent = () => {} }) => {
    return (
        <Card containerStyle={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}>
            <Card.Title style={{ color: theme.colors.text }}>{movie.title}</Card.Title>
            <Card.Divider />
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    style={{ width: 150, height: 225 }}
                />
                <Text style={{ marginVertical: theme.spacing.small, color: theme.colors.text }}>
                    {movie.overview}
                </Text>
                <Button title="Rent" onPress={onRent} color={theme.colors.primary} />
            </View>
        </Card>
    );
};

export default MovieCard;
