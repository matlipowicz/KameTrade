import { Avatar as UserAvatar, AvatarBadge, AvatarGroup, Stack, Box, Text } from "@chakra-ui/react";
import { AuthContext } from "src/context/AuthContext";
import { useContext } from "react";

// TODO: type it
export const Avatar = () => {
    const auth = useContext(AuthContext);
    console.log(auth);

    return (
        <>
            {auth.session !== null ? (
                <Box>
                    <UserAvatar name={auth?.user?.user_metadata?.full_name as typeof auth.user.user_metadata} size="xl" />
                </Box>
            ) : null}
        </>
    );
};
