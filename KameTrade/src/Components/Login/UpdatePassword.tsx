import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Heading, Flex, Grid, ButtonGroup, GridItem } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { RedGradientBtn } from "src/components/Buttons/RedGradientBtn";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "src/components/Login/FormControl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { supabase } from "src/config/supabase";

const passwordRecoverySchema = yup.object({
    password: yup
        .string()
        .required("Password field is required")
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
            "Password must contain capital letter, number, special character"
        ),
    confirm_password: yup
        .string()
        .label("Repeat password field")
        .required()
        .oneOf([yup.ref("password")], "Password should be the same"),
});
// TODO : ogarnij inferType pozniej
type LoginInputs = yup.InferType<typeof passwordRecoverySchema>;

export const UpdatePassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<LoginInputs>({
        resolver: yupResolver(passwordRecoverySchema),
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toastNotification = () => toast.success("Password has been changed", {});

    const onSubmit: SubmitHandler<LoginInputs> = async (recoverPassword) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: recoverPassword.password,
                data: {
                    confirm_password: recoverPassword.confirm_password,
                },
            });
            console.log(data);
            toastNotification();
            navigate("/profile");
            if (error) throw error;
        } catch (error) {
            console.log("Sign in error", error);
        }
    };

    useEffect(() => {
        reset({
            password: "",
            confirm_password: "",
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
                                Reset your password
                            </Heading>
                        </Box>

                        <FormField
                            icon={FaLock}
                            error={errors.password}
                            register={register}
                            name={"password"}
                            placeholder="Enter new password"
                            color="addition.150"
                            type={showPassword ? "text" : "password"}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="confidential"
                        />
                        <FormField
                            icon={FaLock}
                            error={errors.confirm_password}
                            register={register}
                            name={"confirm_password"}
                            placeholder="Confirm password"
                            color="addition.150"
                            type={showPassword ? "text" : "password"}
                            showPassword={showPassword}
                            handleShowPassword={handleShowPassword}
                            id="confidential"
                        />

                        <ButtonGroup display="flex" justifyContent="center">
                            <RedGradientBtn disable={false} type="submit">
                                Change Password
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
