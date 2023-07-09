import { ButtonGroup } from "@chakra-ui/react";
import { BlueBtn } from "../Buttons/BlueBtn";
import { PurpleBtn } from "../Buttons/PurpleBtn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "src/config/supabase";

export const ButtonContainer = () => {
    const navigate = useNavigate();

    function handleClick(path: string) {
        navigate(path);
    }
    const handleAuth = async () => {
        let { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        console.log("Auth", data, error);
    };

    return (
        <>
            <ButtonGroup spacing={"1rem"} flexWrap={"wrap"}>
                {/* <PurpleBtn onClick={handleAuth}>Sign up</PurpleBtn> */}
                <PurpleBtn onClick={() => handleClick("/registration")}>Sign up</PurpleBtn>
                <BlueBtn onClick={() => handleClick("/login")}>Sign in</BlueBtn>
            </ButtonGroup>
        </>
    );
};
