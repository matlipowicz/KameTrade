import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { Box, Heading, Image, Flex, Grid, chakra, ButtonGroup, GridItem } from "@chakra-ui/react";
import registerGraphics from "src/assets/miscellaneous/Register-graphics.svg";
import { RedGradientBtn } from "src/components/Buttons/RedGradientBtn";
import { FormField } from "./FormControl";
import { ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "src/config/supabase";

const registerSchema = yup.object({
    full_name: yup.string().required("Full name field is required").min(3, "Full name must have at least 3 characters"),
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
    repeat_password: yup
        .string()
        .label("Repeat password field")
        .required()
        .oneOf([yup.ref("password")], "Password should be the same"),
});

type Register = yup.InferType<typeof registerSchema>;

export const SignUp = () => {
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
        resolver: yupResolver(registerSchema),
    });
    const toastNotificationSuccess = () =>
        toast.success("Account created, mail has been sent to your inbox, verify it and enjoy KameTrade!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const toastNotificationError = () =>
        toast.error("User with that email has been already registered", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    const onSubmit: SubmitHandler<Register> = async (registerData) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: registerData.email,
                password: registerData.password,
                options: {
                    data: {
                        full_name: registerData.full_name,
                        repeated_password: registerData.repeat_password,
                    },
                },
            });

            if (error) {
                toastNotificationError();
                throw error;
            }
            toastNotificationSuccess();
            console.log("data error", { data, error });
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        reset({
            full_name: "",
            email: "",
            password: "",
            repeat_password: "",
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
            alignItems="center"
            justifyItems="center"
        >
            <GridItem rowStart={{ base: 2, lg: 1 }} rowEnd={{ base: 3, lg: 2 }} w="100%" minW="45rem" maxW="70rem">
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
                            Sign up to KameTrade
                        </Heading>

                        <FormField
                            icon={FaUser}
                            error={errors.full_name}
                            register={register}
                            name={"full_name"}
                            placeholder="Enter full name"
                            color="addition.800"
                            type="text"
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="public"
                        />
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
                        <FormField
                            icon={FaLock}
                            error={errors.password}
                            register={register}
                            name={"password"}
                            placeholder="Enter password"
                            color="addition.200"
                            type={showPassword ? "text" : "password"}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="confidential"
                        />

                        <FormField
                            icon={FaKey}
                            error={errors.repeat_password}
                            register={register}
                            name={"repeat_password"}
                            placeholder="Repeat password"
                            color="addition.150"
                            type={showPassword ? "text" : "password"}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="confidential"
                        />

                        <ButtonGroup display="flex" w="100%">
                            <RedGradientBtn disable={false} type="submit">
                                Register
                            </RedGradientBtn>
                        </ButtonGroup>
                    </Flex>
                </form>
            </GridItem>
            <GridItem rowStart={{ base: 1 }} rowEnd={{ base: 2 }}>
                <Flex p={{ base: "2.5rem", lg: "5rem" }} alignItems="center" justifyContent="center" flexDir="column" gap="3rem">
                    <Heading size="4xl" backgroundImage="linear-gradient(90deg,addition.600,addition.800)" backgroundClip="text">
                        <chakra.span color="text.100">Register in</chakra.span> <chakra.span>KameTrade!</chakra.span>
                    </Heading>

                    <Box as="picture" w="100%" minW="40rem" maxW="75rem">
                        <Image src={registerGraphics} alt="register-graphic" />
                    </Box>
                </Flex>
            </GridItem>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme="light"
            />
        </Grid>
    );
};
