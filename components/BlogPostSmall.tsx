// components/BlogPostSmall.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

export interface BlogPostType {
    title: string;
    content: string;
    imageUrl?: string;
    author: string;
    readTime: string;
}

interface BlogPostProps {
    post: BlogPostType;
    onPress?: () => void;
}

const BlogPostSmall: React.FC<BlogPostProps> = ({ post }) => {
    // Fallback image URL
    const fallbackImageUrl =
        "https://via.placeholder.com/600x400.png?text=No+Image+Available";

    return (
        <View style={styles.verticalContainer}>
            {/* Blog Image */}
            <Image
                source={{ uri: post.imageUrl || fallbackImageUrl }}
                style={styles.verticalImage}
            />

            {/* Content */}
            <View style={styles.verticalText}>
                <Text style={styles.verticalTitle} numberOfLines={2}>
                    {post.title}
                </Text>
                <View style={styles.metadata}>
                    <Text style={styles.author}>{post.author}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.readTime}>{post.readTime}</Text>
                </View>
            </View>
        </View>
    );
};

export default BlogPostSmall;

const styles = StyleSheet.create({
    verticalContainer: {
        flexDirection: "row",
        marginBottom: 15,
        marginHorizontal: 15,
        alignItems: "center",
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        borderColor: "#f0f0f0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    verticalImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 12,
    },
    verticalText: {
        flex: 1,
        fontFamily: "Raleway-Regular",
    },
    verticalTitle: {
        fontSize: 16,
        color: "#000",
        fontFamily: "Raleway-SemiBold",
    },
    metadata: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    author: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Raleway-Regular",
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#666",
        marginHorizontal: 6,
    },
    readTime: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Raleway-Regular",
    },
});

