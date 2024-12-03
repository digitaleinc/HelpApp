// app/(tabs)/tickets.tsx

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import React, {useContext, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import Ticket from '@/components/Ticket';
import CreateNewTicketButton from '@/components/CreateNewTicketButton';
import { useRouter } from 'expo-router';
import { Request } from '@/data/staticData';

// SplashScreen.preventAutoHideAsync();

const TicketsScreen = () => {
    const [fontsLoaded] = useFonts({
        'RalewayRegular': require('@/assets/fonts/Raleway-Regular.ttf'),
        'RalewayBold': require('@/assets/fonts/Raleway-Bold.ttf'),
    });

    const { user, tickets } = useContext(AuthContext);
    const router = useRouter();

    // Simplified filtering: All users see only 'Active' tickets
    const filteredRequests: Request[] = tickets.filter((req) => req.status === 'Active');

    const renderItem = ({ item }: { item: Request }) => <Ticket request={item} />;

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 24,
                fontFamily: 'RalewayBold',
                justifyContent: 'center',
                alignItems: 'center',

                margin: 15
            }}>Active help requests</Text>
            <FlatList
                data={filteredRequests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.noRequestsText}>There's no active requests yet</Text>
                }
            />
            <CreateNewTicketButton
                title="Create New Ticket"
                onPress={() => router.push('/new-ticket')}
                style={styles.button}
            />
        </View>
    );
};

export default TicketsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    noRequestsText: {
        fontFamily: 'RalewayBold',
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        shadowOffset: {width: 0, height: 2},
    },
});