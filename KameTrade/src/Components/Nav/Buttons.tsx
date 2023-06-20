import { ButtonGroup } from "@chakra-ui/react";
import { BlueBtn } from "../Buttons/BlueBtn";
import { PurpleBtn } from "../Buttons/PurpleBtn";

export const ButtonContainer = () => {
    return (
        <>
            <ButtonGroup spacing={"1rem"} flexWrap={"wrap"}>
                <PurpleBtn>Sign up</PurpleBtn>
                <BlueBtn>Sign in</BlueBtn>
            </ButtonGroup>
        </>
    );
};
