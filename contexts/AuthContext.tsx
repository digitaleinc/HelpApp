// contexts/AuthContext.tsx

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { auth, database } from "@/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import { ref, get, set, push, onValue, update, remove } from "firebase/database";

const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 100;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
};

interface Request {
    id: string;
    title: string;
    description: string;
    userId: string;
    helperId?: string;
    status: "Active" | "Completed" | "In Progress";
    createdAt: number;
    helperEmail?: string;
    requesterEmail?: string;
}

interface BlogPost {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: string;
    readTime: string;
}

interface UserData {
    email: string;
    accountType?: string;
}

interface AuthContextProps {
    user: FirebaseUser | null;
    userData: UserData | null;
    usersData: Record<string, UserData>;
    tickets: Request[];
    filteredTickets: Request[];
    blogPosts: BlogPost[];
    fetchTickets: () => void;
    fetchBlogPosts: () => void;
    addBlogPost: (blogPost: Omit<BlogPost, "id" | "readTime">) => Promise<void>;
    updateBlogPost: (id: string, updatedData: Partial<Omit<BlogPost, "id">>) => Promise<void>;
    deleteBlogPost: (id: string) => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    signup: (email: string, password: string, accountType: string) => Promise<boolean>;
    addTicket: (title: string, description: string) => Promise<void>;
    updateTicket: (updatedTicket: Request) => Promise<void>;
    deleteTicket: (ticketId: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    userData: null,
    usersData: {},
    tickets: [],
    filteredTickets: [],
    blogPosts: [],
    fetchTickets: () => {},
    fetchBlogPosts: () => {},
    addBlogPost: async () => {},
    updateBlogPost: async () => {},
    deleteBlogPost: async () => {},
    login: async () => false,
    logout: async () => {},
    signup: async () => false,
    addTicket: async () => {},
    updateTicket: async () => {},
    deleteTicket: async () => {},
    changePassword: async () => false,
    loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [usersData, setUsersData] = useState<Record<string, UserData>>({});
    const [tickets, setTickets] = useState<Request[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<Request[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Monitor Authentication State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userRef = ref(database, `users/${currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) setUserData(snapshot.val());
                await fetchAllUsers();
                fetchTickets();
                fetchBlogPosts();
            } else {
                setUserData(null);
                setUsersData({});
                setTickets([]);
                setFilteredTickets([]);
                setBlogPosts([]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fetch all users to map userId to email
    const fetchAllUsers = async () => {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);
        if (snapshot.exists()) setUsersData(snapshot.val());
    };

    // Fetch tickets
    const fetchTickets = () => {
        const ticketsRef = ref(database, "tickets");
        onValue(ticketsRef, (snapshot) => {
            const data = snapshot.val();
            const allTickets: Request[] = data
                ? Object.entries(data).map(([id, value]) => {
                    const ticket = value as Partial<Request>;

                    return {
                        id,
                        title: ticket.title || "Untitled",
                        description: ticket.description || "No description provided.",
                        userId: ticket.userId || "Unknown User",
                        helperId: ticket.helperId,
                        status: ticket.status || "Active",
                        createdAt: ticket.createdAt || Date.now(),
                        requesterEmail: usersData[ticket.userId!]?.email || "Unknown",
                        helperEmail:
                            ticket.helperId && usersData[ticket.helperId]?.email
                                ? usersData[ticket.helperId]?.email
                                : "Not Assigned",
                    };
                })
                : [];

            setTickets(allTickets);
            filterTickets(allTickets);
        });
    };

    // Filter tickets based on role
    const filterTickets = (allTickets: Request[]) => {
        if (!userData?.accountType) return;

        if (["Moderator", "Admin"].includes(userData.accountType)) {
            setFilteredTickets(allTickets.filter((t) => t.status === "Active"));
        } else if (userData.accountType === "HelpSeeker") {
            setFilteredTickets(
                allTickets.filter((t) => t.userId === user?.uid && t.status === "Active")
            );
        } else if (userData.accountType === "ReadyToHelp") {
            setFilteredTickets(allTickets.filter((t) => t.status === "Active"));
        }
    };

    // Fetch blog posts
    const fetchBlogPosts = () => {
        const blogPostsRef = ref(database, "blogPosts");
        onValue(blogPostsRef, (snapshot) => {
            const data = snapshot.val();
            const posts: BlogPost[] = data
                ? Object.entries(data).map(([id, value]) => ({
                    ...(value as Omit<BlogPost, "id">),
                    id,
                }))
                : [];
            setBlogPosts(posts);
        });
    };

    // Add new blog post
    const addBlogPost = async (blogPost: Omit<BlogPost, "id" | "readTime">) => {
        const readTime = calculateReadTime(blogPost.content);
        const newBlogPost = { ...blogPost, readTime };
        const blogPostRef = push(ref(database, "blogPosts"));
        await set(blogPostRef, newBlogPost);
        fetchBlogPosts();
    };

    // Update blog post
    const updateBlogPost = async (id: string, updatedData: Partial<Omit<BlogPost, "id">>) => {
        try {
            const blogPostRef = ref(database, `blogPosts/${id}`);
            const existingBlog = blogPosts.find((post) => post.id === id);
            if (!existingBlog) {
                console.error("Failed to update blog post: Blog post not found");
            } else {
                const updatedBlog = {
                    ...existingBlog,
                    ...updatedData,
                    readTime: calculateReadTime(updatedData.content || existingBlog.content),
                };

                await update(blogPostRef, updatedBlog);
                fetchBlogPosts();
            }
        } catch (error) {
            console.error("Failed to update blog post:", error);
        }
    };

    // Delete blog post
    const deleteBlogPost = async (id: string) => {
        try {
            const blogPostRef = ref(database, `blogPosts/${id}`);
            await remove(blogPostRef);
            fetchBlogPosts();
        } catch (error) {
            console.error("Failed to delete blog post:", error);
        }
    };

    const updateTicket = async (updatedTicket: Request) => {
        await update(ref(database, `tickets/${updatedTicket.id}`), updatedTicket);
        fetchTickets();
    };

    const deleteTicket = async (ticketId: string) => {
        await remove(ref(database, `tickets/${ticketId}`));
        fetchTickets();
    };

    const addTicket = async (title: string, description: string) => {
        if (user) {
            const newTicketRef = push(ref(database, "tickets"));
            await set(newTicketRef, {
                title,
                description,
                userId: user.uid,
                status: "Active",
                createdAt: Date.now(),
            });
        }
    };

    const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
        if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            return true;
        }
        return false;
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    };

    const signup = async (email: string, password: string, accountType: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(database, `users/${userCredential.user.uid}`), { email, accountType });
        return true;
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userData,
                usersData,
                tickets,
                filteredTickets,
                blogPosts,
                fetchTickets,
                fetchBlogPosts,
                addBlogPost,
                updateBlogPost,
                deleteBlogPost,
                login,
                logout,
                signup,
                addTicket,
                updateTicket,
                deleteTicket,
                changePassword,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
