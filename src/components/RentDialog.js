import { Overlay, Button, Text } from 'react-native-elements';
import { View } from 'react-native';
import { useRentedContext } from '../context/RentedContext';

export default function RentalDialog({ visible, movie, onClose }) {
  const { rentMovie } = useRentedContext();

  return (
    <Overlay isVisible={visible} onBackdropPress={onClose}>
      <View>
        <Text>Rent {movie?.title} for $3.99?</Text>
        <Button title="Confirm" onPress={() => { rentMovie(movie); onClose(); }} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Overlay>
  );
}