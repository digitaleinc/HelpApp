import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "@/contexts/AuthContext";
import { Redirect, Slot } from "expo-router";

function RootNavigator() {
    const { user } = useContext(AuthContext);

    if (user === null) {
        console.log("Redirecting to Signin...");
        return <Redirect href="/signin" />;
    }

    if (user) {
        console.log("Redirecting to Tickets...");
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
