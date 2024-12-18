import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "@/contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: string;
    readTime: string;
}

const DetailedBlogScreen = () => {
    const { blogId } = useLocalSearchParams<{ blogId: string }>();
    const { blogPosts, userData, updateBlogPost, deleteBlogPost } = useContext(AuthContext);
    const router = useRouter();

    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isEditable, setIsEditable] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (!blogId) {
            Alert.alert("Error", "No blog ID provided");
            router.back();
            return;
        }

        // Fetch the selected blog
        const selectedBlog = blogPosts.find((post) => post.id === blogId);

        if (selectedBlog) {
            if (!blog || blog.id !== selectedBlog.id) {
                setBlog(selectedBlog);
                setTitle(selectedBlog.title);
                setContent(selectedBlog.content);
                setImageUrl(selectedBlog.imageUrl || "");
            }
        } else {
            Alert.alert("Error", "Blog post not found");
            router.back();
        }
    }, [blogId, blogPosts]);

    if (!blog) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#007AFF" />
            </SafeAreaView>
        );
    }

    const handleBack = () => {
        router.back();
    };

    const handleEditToggle = () => {
        if (userData?.accountType === "Moderator" || userData?.accountType === "Admin") {
            setIsEditable(!isEditable);
        } else {
            Alert.alert("Access Denied", "You do not have permission to edit this blog post.");
        }
    };

    const handleSave = async () => {
        try {
            if (!title.trim() || !content.trim()) {
                Alert.alert("Error", "Title and content cannot be empty.");
                return;
            }

            await updateBlogPost(blog.id, {
                title,
                content,
                imageUrl,
            });

            Alert.alert("Success", "Blog post updated successfully!");
            setIsEditable(false);
        } catch (error) {
            console.error("Failed to save blog post:", error);
            Alert.alert("Error", "Failed to update the blog post.");
        }
    };

    const handleDelete = async () => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this blog post?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteBlogPost(blog.id);
                        Alert.alert("Success", "Blog post deleted successfully!");
                        router.push('/blog');
                    } catch (error) {
                        console.error("Failed to delete blog post:", error);
                        Alert.alert("Error", "Failed to delete the blog post.");
                    }
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Back Button */}
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                {/* Blog Image */}
                {isEditable ? (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Image URL"
                        value={imageUrl}
                        onChangeText={setImageUrl}
                    />
                ) : (
                    blog.imageUrl && (
                        <Image source={{ uri: blog.imageUrl }} style={styles.image} />
                    )
                )}

                {/* Blog Title */}
                {isEditable ? (
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                ) : (
                    <Text style={styles.title}>{blog.title}</Text>
                )}

                {/* Blog Author and Read Time */}
                <View style={styles.metadata}>
                    <Text style={styles.author}>By {blog.author}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.readTime}>{blog.readTime}</Text>
                </View>

                {/* Blog Content */}
                {isEditable ? (
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Content"
                        value={content}
                        onChangeText={setContent}
                        multiline
                        numberOfLines={10}
                    />
                ) : (
                    <Text style={styles.content}>{blog.content}</Text>
                )}

                {/* Admin Controls */}
                {(userData?.accountType === "Moderator" || userData?.accountType === "Admin") && (
                    <View style={styles.adminControls}>
                        <TouchableOpacity
                            style={isEditable ? styles.saveButton : styles.editButton}
                            onPress={isEditable ? handleSave : handleEditToggle}
                        >
                            <Text style={styles.buttonText}>
                                {isEditable ? "Save Changes" : "Edit"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailedBlogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        padding: 10,
        marginLeft: 15,
    },
    backButtonText: {
        fontSize: 16,
        color: "#007AFF",
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        paddingHorizontal: 15,
        color: "#333",
    },
    metadata: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    author: {
        fontSize: 14,
        color: "#777",
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#777",
        marginHorizontal: 8,
    },
    readTime: {
        fontSize: 14,
        color: "#777",
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    adminControls: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
    },
    editButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
        flex: 0.45,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        flex: 0.45,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#D32F2F",
        padding: 10,
        borderRadius: 8,
        flex: 0.45,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    textArea: {
        height: 150,
        textAlignVertical: "top",
    },
});
