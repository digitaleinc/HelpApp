// components/BlogPost.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    useColorScheme,
} from "react-native";

export interface BlogPostType {
    id: number;
    title: string;
    content: string;
    imageUrl?: string; // Optional image URL
    category: string;
    author: string;
    readTime: string;
}

interface BlogPostProps {
    post: BlogPostType;
}

const BlogPostVertical: React.FC<BlogPostProps> = ({ post }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    // Fallback image URL
    const fallbackImageUrl =
        "https://via.placeholder.com/600x400.png?text=No+Image+Available";

    return (
        <TouchableOpacity style={[styles.container]}>
            {/* Blog Image */}
            <Image
                source={{ uri: post.imageUrl || fallbackImageUrl }}
                style={styles.image}
            />

            {/* Overlay Text */}
            <View style={styles.textOverlay}>
                <Text style={styles.overlayTitle} numberOfLines={2}>
                    {post.title}
                </Text>
                <View style={styles.overlayMetadata}>
                    <Text style={styles.author}>{post.author}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BlogPostVertical;

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: "hidden",
        margin: 15,
        width: 180, // Matches the card width
    },
    image: {
        width: "100%",
        height: 240,
        borderRadius: 12,
    },
    textOverlay: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 8,
        padding: 8,
    },
    overlayTitle: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: 'Raleway-SemiBold',
        color: "#fff",
        marginBottom: 4,
    },
    overlayMetadata: {
        flexDirection: "row",
        alignItems: "center",
    },
    author: {
        fontSize: 12,
        color: "#fff",
    },
});
