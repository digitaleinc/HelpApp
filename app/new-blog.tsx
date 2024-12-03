// app/(tabs)/new-blog.tsx

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const NewBlogScreen = () => {
    const { user, addBlogPost } = useContext(AuthContext);
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (user?.accountType !== 'Moderator' && user?.accountType !== 'Admin') {
            Alert.alert('Unauthorized', 'You do not have permission to access this screen');
            router.replace('/(tabs)/blog');
        }
    }, [user, router]);

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        addBlogPost(title, content);
        Alert.alert('Success', 'Blog post created successfully');
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Blog Post</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={6}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default NewBlogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
});
