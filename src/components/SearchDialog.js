import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-elements';
import { theme } from '../theme/theme';

const SearchDialog = ({ visible, onClose, onSearch }) => {
    const [query, setQuery] = useState('');
    const [isSimpleDialogVisible, setSimpleDialogVisible] = useState(false); 
    const { theme } = useTheme(); 

    const handleSearch = () => {
        setSimpleDialogVisible(true); // Show the confirmation dialog
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={theme.overlay}>
                <View style={theme.dialog}>
                    <Text style={[theme.title, { color: theme.colors.text }]}>Search for Movies</Text>
                    <TextInput
                        style={[theme.input, { borderColor: theme.colors.border }]}
                        placeholder="Enter movie title"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <Button title="Search" onPress={()=>{
                        onSearch(query); 
                        setSimpleDialogVisible(false); 
                        onClose(); //
                    } }  color={theme.colors.primary} />
                    <Button title="Cancel" onPress={onClose} color="red" />
                </View>
            </View>
            
        </Modal>
    );
};


export default SearchDialog;
