import React, { useContext, useEffect } from "react";
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Alert,
} from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import BlogPostVertical from "@/components/BlogPostVertical";
import BlogPostSmall from "@/components/BlogPostSmall";
import CreateNewTicketButton from "@/components/CreateNewTicketButton";
import { router } from "expo-router";
import { useFonts } from "expo-font";

const BlogScreen = () => {
    const { userData, blogPosts, fetchBlogPosts } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        "Raleway-Bold": require("@/assets/fonts/Raleway-Bold.ttf"),
        "Raleway-Regular": require("@/assets/fonts/Raleway-Regular.ttf"),
    });

    // Fetch blog posts on component mount
    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const canCreateBlog = userData?.accountType === "Moderator" || userData?.accountType === "Admin";

    // Split posts into recommended (first 3) and top (remaining)
    const recommendationPosts = blogPosts.slice(0, 3);
    const topPosts = blogPosts.slice(3);

    const image = require("@/assets/images/default_background2.png");

    const handleCreateNewBlog = () => {
        if (!canCreateBlog) {
            Alert.alert("Access Denied", "You don't have permission to create a new blog post.");
            return;
        }
        router.push("../new-blog");
    };

    const handleViewBlogDetails = (blogId: string) => {
        router.push({ pathname: `/detailed_blog`, params: { blogId } });
    };

    return (
        <ImageBackground source={image} style={styles.image}>
            <FlatList
                style={styles.container}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <Text style={styles.header}>Добірка корисних статей</Text>
                        <Text style={styles.subHeader}>Рекомендуємо</Text>

                        {/* Horizontal Scroll for Recommended Posts */}
                        <FlatList
                            data={recommendationPosts}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id} // Use blogId from Firebase
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleViewBlogDetails(item.id)}>
                                    <BlogPostVertical post={item} />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={styles.horizontalList}
                        />

                        {/* Create Blog Button (Admins & Moderators) */}
                        {canCreateBlog && (
                            <CreateNewTicketButton
                                title="Create New Blog Post"
                                onPress={handleCreateNewBlog}
                                style={styles.button}
                            />
                        )}
                    </>
                }
                data={topPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleViewBlogDetails(item.id)}>
                        <BlogPostSmall post={item} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.verticalList}
                // ListEmptyComponent={
                //     <Text style={styles.emptyText}>
                //         Наразі немає доступних статей. Перевірте пізніше!
                //     </Text>
                // }
            />
        </ImageBackground>
    );
};

export default BlogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 20,
    },
    image: {
        flex: 1,
    },
    button: {
        marginBottom: 10,
        alignSelf: "center",
    },
    header: {
        fontFamily: "Raleway-Bold",
        fontSize: 34,
        fontWeight: "bold",
        color: "#302b13",
        marginBottom: 8,
        marginTop: 20,
        marginLeft: 25,
    },
    subHeader: {
        fontSize: 18,
        fontFamily: "Raleway-Bold",
        fontWeight: "600",
        color: "#302b13",
        marginBottom: 16,
        marginLeft: 25,
    },
    horizontalList: {
        flexDirection: "row",
        marginBottom: 16,
    },
    verticalList: {
        paddingTop: 8,
    },
    emptyText: {
        fontSize: 18,
        color: "#555",
        textAlign: "center",
        marginTop: 20,
    },
});
