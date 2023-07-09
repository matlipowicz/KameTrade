import { FieldValues, UseFormRegister, FieldError, Path } from "react-hook-form";
import { Box, FormControl, Icon, Input, Text, InputRightElement, InputGroup } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const FormField = <T extends FieldValues>({
    icon,
    error,
    register,
    name,
    placeholder,
    color,
    type,
    showPassword,
    handleShowPassword,
    id,
}: {
    icon: IconType;
    error: FieldError | undefined;
    register: UseFormRegister<T>;
    name: Path<T>;
    placeholder: string;
    color: string;
    type: string;
    showPassword: boolean;
    handleShowPassword: () => void;
    id: string;
}) => {
    return (
        <Box>
            <FormControl display="flex" gap="1rem" alignItems="center" isInvalid={!!error?.message}>
                <Icon as={icon} color={color} />
                <InputGroup>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        {...register(name)}
                        p="2rem"
                        fontSize="1.6rem"
                        size="lg"
                        borderRadius="0.375rem"
                        borderColor="addition.700"
                        borderWidth="0.2rem"
                        _hover={{ borderColor: "addition.700" }}
                        _placeholder={{ color: "addition.600", opacity: "0.4" }}
                        focusBorderColor="addition.700"
                        variant="outline"
                        defaultValue=""
                    />

                    {id === "confidential" ? (
                        <InputRightElement onClick={handleShowPassword} marginRight="1rem" h="100%">
                            {showPassword ? (
                                <Icon as={AiOutlineEyeInvisible} boxSize={12} color="rgba(84, 167, 253,0.4)" _hover={{ cursor: "pointer" }} />
                            ) : (
                                <Icon as={AiOutlineEye} boxSize={12} color="rgba(84, 167, 253,0.4)" _hover={{ cursor: "pointer" }} />
                            )}
                        </InputRightElement>
                    ) : null}
                </InputGroup>
            </FormControl>

            <Text color="addition.500" fontSize="1.2rem" display="flex" justifyContent="end" mt="0.5rem">
                {error?.message}
            </Text>
        </Box>
    );
};
