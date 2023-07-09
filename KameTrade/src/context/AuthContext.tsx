import { createContext, useState, useEffect } from "react";
import { supabase } from "src/config/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({ session: null, user: undefined, signOut: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const setAuth = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error) throw error;

            setSession(session);
            setUser(session?.user);
        };

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setUser(session?.user);
        });
        setAuth();
    }, []);

    const contextAuthValue = {
        session,
        user,
        signOut: () => {
            supabase.auth.signOut();
            navigate("/");
        },
    };
    console.log("Session", session);
    console.log("User", user);

    return <AuthContext.Provider value={contextAuthValue}>{children}</AuthContext.Provider>;
};
