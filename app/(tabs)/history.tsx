// app/(tabs)/history.tsx

import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { requests, Request } from '@/data/staticData';

const HistoryScreen = () => {
    const { user } = useContext(AuthContext);

    let filteredRequests: Request[] = [];

    if (user?.accountType === 'HelpSeeker') {
        filteredRequests = requests.filter(
            (req) => req.userId === user.id && req.status === 'Completed'  || req.status === 'In progress'
        );
    } else if (user?.accountType === 'ReadyToHelp') {
        filteredRequests = requests.filter(
            (req) => req.helperId === user.id && req.status === 'Completed'  || req.status === 'In progress'
        );
    } else if (user?.accountType === 'Moderator' || user?.accountType === 'Admin') {
        // Moderators and Admins see all completed requests
        filteredRequests = requests.filter((req) => req.status === 'Completed' || req.status === 'In progress');
    }

    const renderItem = ({ item }: { item: Request }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredRequests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No history available.</Text>}
            />
        </View>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        backgroundColor:'#fff',
    },
    item: {
        padding:15,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:5,
        marginBottom:10,
    },
    title: {
        fontSize:18,
        fontWeight:'bold',
    },
});
