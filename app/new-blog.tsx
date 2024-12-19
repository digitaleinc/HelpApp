// app/new-blog.tsx

import React, { useState, useContext, useEffect } from 'react';
import { Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const NewBlogScreen = () => {
    const { userData, addBlogPost } = useContext(AuthContext);
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (userData?.accountType !== 'Moderator' && userData?.accountType !== 'Admin') {
            Alert.alert('Unauthorized', 'You do not have permission to access this screen');
            router.replace('/(tabs)/blog');
        }
    }, [userData, router]);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim() || !author.trim() || !imageUrl.trim()) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {
            await addBlogPost({
                title,
                content,
                author,
                imageUrl: imageUrl.trim(),
            });
            Alert.alert('Success', 'Blog post created successfully');
            router.back();
        } catch (error) {
            Alert.alert('Error', 'Failed to create blog post. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Blog Post</Text>

            {/* Title Input */}
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />

            {/* Author Input */}
            <TextInput
                style={styles.input}
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
            />

            {/* Content Input */}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={6}
            />

            {/* Image URL Input */}
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={imageUrl}
                onChangeText={setImageUrl}
            />

            {/* Submit Button */}
            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
};

export default NewBlogScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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

