import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "@/contexts/AuthContext";
import { Redirect, Slot } from "expo-router";

function RootNavigator() {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return <Redirect href="/signin" />;
    }

    if (user) {
        return <Redirect href="/(tabs)/tickets" />;
    }

    return <Slot />;
}

export default function App() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
