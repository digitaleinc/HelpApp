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
import {Colors} from "@/constants/Colors";

export interface BlogPostType {
    id: number;
    title: string;
    content: string;
    imageUrl?: string; // Optional image URL
    category: string;
    author: string;
    readTime: string;
    layout: "horizontal" | "vertical"; // Determines layout
}

interface BlogPostProps {
    post: BlogPostType;
}

const BlogPostSmall: React.FC<BlogPostProps> = ({ post }) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    // Fallback image URL
    const fallbackImageUrl =
        "https://via.placeholder.com/600x400.png?text=No+Image+Available";

    return (
        <TouchableOpacity
            style={[
                styles.verticalContainer,
            ]}
        >
            {/* Blog Image */}
            <Image
                source={{ uri: post.imageUrl || fallbackImageUrl }}
                style={styles.verticalImage}
            />

            {/* Content */}
            <View
                style={styles.verticalText}
            >
                <Text
                    style={[
                        styles.title, styles.verticalTitle,
                    ]}
                    numberOfLines={2}
                >
                    {post.title}
                </Text>
                <View style={styles.metadata}>
                    <Text style={styles.author}>{post.author}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.readTime}>{post.readTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BlogPostSmall;

const styles = StyleSheet.create({
    // Container for horizontal and vertical layouts

    verticalContainer: {
        flexDirection: "row",
        marginBottom: 15,
        marginRight: 15,
        alignItems: "center",
        paddingVertical: 5,
        marginLeft: 15,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        borderColor: '#ffffff',
    },

    verticalImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 12,
        marginLeft: 10,
    },

    verticalText: {
        flex: 1,
    },

    // Titles
    title: {
        fontWeight: "bold",
    },

    verticalTitle: {
        fontSize: 16,
        color: "#000",
    },

    // Metadata
    metadata: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    author: {
        fontSize: 14,
        color: "#666",
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#666",
        marginHorizontal: 8,
    },
    readTime: {
        fontSize: 14,
        color: "#666",
    },
});
