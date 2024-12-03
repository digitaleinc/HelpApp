// TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}
