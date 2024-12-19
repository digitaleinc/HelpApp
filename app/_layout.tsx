// app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </AuthProvider>
        </SafeAreaProvider>
    );
}
