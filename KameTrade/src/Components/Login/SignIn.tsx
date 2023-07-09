import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Box, Heading, Text, Image, Flex, Grid, ButtonGroup, Link, GridItem } from "@chakra-ui/react";
import logo from "src/assets/logo/Dark-version.svg";
import { RedGradientBtn } from "src/components/Buttons/RedGradientBtn";
import { GoogleBtn } from "src/components/Buttons/GoogleSingIn";
import { FormField } from "src/components/Login/FormControl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "src/config/supabase";

const loginSchema = yup.object({
    email: yup
        .string()
        .required("Email field is required")
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid email format")
        .min(5, "Email must have at least 5 characters"),
    password: yup
        .string()
        .required("Password field is required")
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
            "Password must contain capital letter, number, special character"
        ),
});

type LoginInputs = yup.InferType<typeof loginSchema>;

export const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<LoginInputs>({
        resolver: yupResolver(loginSchema),
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toastNotification = () => toast.error("Invalid email or password", {});

    const onSubmit: SubmitHandler<LoginInputs> = async (loginData) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            });

            if (error) throw error;
            if (!error) {
                navigate("/profile");
            }
        } catch (error) {
            toastNotification();
            console.log("Sign in error", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            let { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            });
            if (error) throw error;
        } catch (error) {
            toastNotification();
            console.log("Sign in error", error);
        }
    };

    useEffect(() => {
        reset({
            email: "",
            password: "",
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
            placeItems="center"
        >
            <GridItem colSpan={{ base: 1, lg: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex
                        p={{ base: "2.5rem", lg: "5rem" }}
                        justifyContent="start"
                        flexDir="column"
                        gap="1.5rem"
                        bg="rgba(0,0,0,0.16)"
                        borderRadius="0.375rem"
                        boxShadow={"1px 21px 32px -33px rgba(0, 0, 0, 1)"}
                        maxW="55rem"
                        minW="45rem"
                    >
                        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" mb="5rem" gap="2rem">
                            <Heading size="2xl" color="addition.800">
                                Welcome back to
                            </Heading>
                            <Image src={logo} w="20rem" />
                        </Box>

                        <FormField
                            icon={FaEnvelope}
                            error={errors.email}
                            register={register}
                            name={"email"}
                            placeholder="Enter email"
                            color="addition.600"
                            type={"text"}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="public"
                        />
                        <FormField
                            icon={FaLock}
                            error={errors.password}
                            register={register}
                            name={"password"}
                            placeholder="Enter password"
                            color="addition.150"
                            type={showPassword ? "text" : "password"}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="confidential"
                        />

                        <ButtonGroup display="flex" justifyContent="center">
                            <RedGradientBtn disable={false} type="submit">
                                Log in
                            </RedGradientBtn>
                        </ButtonGroup>
                        <GoogleBtn onClick={signInWithGoogle}>
                            <Text w="100%">Sign in with Google</Text>
                        </GoogleBtn>
                        <Box display="flex" justifyContent="space-between">
                            <Link onClick={() => navigate("/forgottenpassword")} fontSize="1.4rem" color="addition.500">
                                Forgot password?
                            </Link>
                            <Box display="flex" flexDir="column" alignItems="end">
                                <Text fontSize="1.4rem">Don't have account yet?</Text>
                                <Link fontSize="1.4rem" onClick={() => navigate("/registration")} color="addition.600">
                                    Click here to sign up
                                </Link>
                            </Box>
                        </Box>
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
