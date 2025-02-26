import React from 'react';
import { Overlay, Button, Text } from 'react-native-elements';
import { View } from 'react-native';
import theme from '../theme/theme';

export default function RentalDialog({ visible, movie, onClose, onConfirm }) {
  return (
    <Overlay isVisible={visible} onBackdropPress={onClose}>
      <View>
        <Text>Rent {movie?.title} for $4.95?</Text>
        <Button title="Confirm" onPress={() => { onConfirm(); onClose();  }} 
          buttonStyle={theme.confirmButton} 
          titleStyle={theme.confirmButtonText} 
        />
        <Button 
          title="Cancel" 
          onPress={onClose} 
          buttonStyle={theme.cancelButton} 
          titleStyle={theme.cancelButtonText} 
        />
      </View>
    </Overlay>
  );
}
