import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { Heading, Text, Flex, Grid, ButtonGroup, GridItem } from "@chakra-ui/react";
import { RedGradientBtn } from "src/components/Buttons/RedGradientBtn";
import { FormField } from "./FormControl";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "src/config/supabase";

const forgottenPasswordSchema = yup.object({
    email: yup
        .string()
        .required("Email field is required")
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid email format")
        .min(5, "Email must have at least 5 characters"),
});

type Register = yup.InferType<typeof forgottenPasswordSchema>;

export const ForgottenPassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Register>({
        resolver: yupResolver(forgottenPasswordSchema),
    });
    const toastNotification = () => toast.success("Password has been changed", {});

    const onSubmit: SubmitHandler<Register> = async (registerData) => {
        console.log(registerData);
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(registerData.email, {
                redirectTo: "http://localhost:5173/change-password",
            });
            toastNotification();
            if (error) {
                throw error;
            }

            console.log("data error", { data, error });
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        reset({
            email: "",
        });
    }, [isSubmitSuccessful]);

    return (
        <Grid
            as="main"
            paddingTop="clamp(6rem,6vh,10rem)"
            paddingBottom="clamp(6rem,6vh,10rem)"
            paddingRight="clamp(6rem,10vh,12rem)"
            paddingLeft="clamp(6rem,10vh,12rem)"
            templateColumns={{ base: "1fr", lg: "repeat(2,1fr)" }}
            gap="5rem"
            placeItems="center"
        >
            <GridItem w="100%" minW="45rem" maxW="50rem" colSpan={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex
                        p={{ base: "3rem 3rem 3rem 2.5rem", lg: "5rem 5rem 5rem 4.5rem" }}
                        justifyContent="center"
                        flexDir="column"
                        gap="1.5rem"
                        bg="rgba(0,0,0,0.16)"
                        borderRadius="0.375rem"
                        boxShadow={"1px 21px 32px -33px rgba(0, 0, 0, 1)"}
                    >
                        <Heading size="2xl" alignSelf="center" mb="1rem">
                            Forgot Password
                        </Heading>
                        <Text fontSize="1.2rem" alignSelf="center" mb="1rem">
                            Enter your email to receive link for password update.
                        </Text>

                        <FormField
                            icon={FaEnvelope}
                            error={errors.email}
                            register={register}
                            name={"email"}
                            placeholder="Enter email"
                            color="addition.600"
                            type="text"
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="public"
                        />

                        <ButtonGroup display="flex" w="100%">
                            <RedGradientBtn disable={false} type="submit">
                                Forgot Password
                            </RedGradientBtn>
                        </ButtonGroup>
                    </Flex>
                </form>
            </GridItem>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Grid>
    );
};
