import React, { useContext } from "react";
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import BlogPostVertical from "@/components/BlogPostVertical";
import BlogPostSmall from "@/components/BlogPostSmall";
import CreateNewTicketButton from "@/components/CreateNewTicketButton";
import { router } from "expo-router";
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

const BlogScreen = () => {
    const { user } = useContext(AuthContext);
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('@/assets/fonts/Raleway-Bold.ttf'),
        'Raleway-Regular': require('@/assets/fonts/Raleway-Regular.ttf'),
        // 'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });

    // Import blog posts from staticData
    const blogPosts = require("@/data/staticData").blogPosts;

    const canCreateBlog = user?.accountType === 'Moderator' || user?.accountType === 'Admin';

    const recommendationPosts = blogPosts.slice(0, 3); // First two posts for "Recommended"
    const topPosts = blogPosts.slice(3); // Remaining posts for "Top"

    const image = require("@/assets/images/default_background2.png");

    return (
        <ImageBackground source={image} style={styles.image}>
            <FlatList style={styles.container}
                  ListHeaderComponent={
                      <>
                      <Text style={styles.header}>Добірка корисних статей</Text>
                      <Text style={styles.subHeader}>Рекомендуємо</Text>

                      {/* Horizontal Scroll for Recommended */}
                      <FlatList
                          data={recommendationPosts}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => <BlogPostVertical post={item} />}
                          contentContainerStyle={styles.horizontalList}
                      />

                      {/* Categories */}
                      <View style={styles.categories}>
                          <TouchableOpacity>
                              <Text style={styles.categoryActive}>Найкращі</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                              <Text style={styles.category}>Популярні</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                              <Text style={styles.category}>Трендові</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                              <Text style={styles.category}>Збережені</Text>
                          </TouchableOpacity>
                      </View>

                      {canCreateBlog && (
                          <CreateNewTicketButton
                              title="Create New Blog Post"
                              onPress={() => router.push('../new-blog')}
                              style={styles.button}
                          />
                      )}

                      </>
                  }
                  data={topPosts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                      <BlogPostSmall post={item} />
                  )}
                  contentContainerStyle={styles.verticalList}
            />
        </ImageBackground>
    );
};

export default BlogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
        // padding: 16,
        // backgroundColor: "#ffffff",
        // backgroundImage: require('@/assets/images/default_background.png'),
    },
    image: {
        flex: 1,
    },
    button: {
        // marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    header: {
        fontFamily: "Raleway-Bold",
        fontSize: 34,
        fontWeight: "bold",
        color: '#302b13',
        marginBottom: 8,
        marginTop: 20,
        marginLeft: 25
    },
    subHeader: {
        fontSize: 18,
        fontFamily: "Raleway-Bold",
        fontWeight: "600",
        color: '#302b13',
        marginBottom: 16,
        marginLeft: 25
    },
    horizontalList: {
        flexDirection: "row",
        marginBottom: 16,
    },
    categories: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    category: {
        fontSize: 16,
        color: "#888",
    },
    categoryActive: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    verticalList: {
        paddingTop: 8,
    },
    verticalPost: {
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "center",
    },
    verticalMetadata: {
        marginLeft: 8,
    },
    verticalAuthor: {
        fontSize: 14,
        fontWeight: "bold",
    },
    verticalReadTime: {
        fontSize: 12,
        color: "#555",
    },
});
