// contexts/AuthContext.tsx

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import {User, Request, BlogPost, testUsers, blogPosts} from '@/data/staticData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlogPostSmall from "@/components/BlogPostSmall";

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    signup: (
        username: string,
        password: string,
        accountType: 'HelpSeeker' | 'ReadyToHelp'
    ) => boolean;
    tickets: Request[];
    addTicket: (title: string, description: string) => void;
    updateTicket: (updatedTicket: Request) => void;
    blogPosts: BlogPost[];
    addBlogPost: (title: string, content: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => false,
    logout: () => {},
    signup: () => false,
    tickets: [],
    addTicket: () => {},
    updateTicket: () => {},
    blogPosts: [],
    addBlogPost: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tickets, setTickets] = useState<Request[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        // Load user and data from AsyncStorage on mount
        const loadData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                const ticketsData = await AsyncStorage.getItem('tickets');
                const blogPostsData = await AsyncStorage.getItem('blogPosts');

                if (userData) {
                    setUser(JSON.parse(userData));
                }

                if (ticketsData) {
                    setTickets(JSON.parse(ticketsData));
                }
                // else {
                //                     setTickets(initialRequests); // Initialize with default data if available
                //                 }

                if (blogPostsData) {
                    setBlogPosts(JSON.parse(blogPostsData));
                }
                // else {
                //                     setBlogPosts(initialBlogPosts); // Initialize with default data if available
                //                 }
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        // Save user and data to AsyncStorage whenever they change
        const saveData = async () => {
            try {
                if (user) {
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                } else {
                    await AsyncStorage.removeItem('user');
                }
                await AsyncStorage.setItem('tickets', JSON.stringify(tickets));
                await AsyncStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            } catch (error) {
                console.error('Failed to save data:', error);
            }
        };

        saveData();
    }, [user, tickets, blogPosts]);

    const login = (username: string, password: string): boolean => {
        const foundUser = testUsers.find(
            (u) => u.username === username && u.password === password
        );
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const signup = (
        username: string,
        password: string,
        accountType: 'HelpSeeker' | 'ReadyToHelp'
    ): boolean => {
        const exists = testUsers.some((u) => u.username === username);
        if (exists) {
            return false;
        }
        const newUser: User = {
            id: testUsers.length + 1,
            username,
            password,
            accountType: accountType === 'HelpSeeker' ? 'HelpSeeker' : 'ReadyToHelp',
        };
        testUsers.push(newUser);
        setUser(newUser);
        return true;
    };

    const addTicket = (title: string, description: string) => {
        const newTicket: Request = {
            id: tickets.length + 1,
            title,
            description,
            userId: user?.id || 0,
            status: 'Active',
        };
        setTickets([...tickets, newTicket]);
    };

    const updateTicket = (updatedTicket: Request) => {
        setTickets((prevTickets) =>
            prevTickets.map((ticket) =>
                ticket.id === updatedTicket.id ? updatedTicket : ticket
            )
        );
    };

    const addBlogPost = (title: string, content: string) => {
        const newPost: BlogPost = {
            id: blogPosts.length + 1,
            title,
            content,
            author: "testUser",
            readTime: "5 хв",
        };
        setBlogPosts([...blogPosts, newPost]);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                signup,
                tickets,
                addTicket,
                updateTicket,
                blogPosts,
                addBlogPost,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
