import { ListItem } from "@chakra-ui/react";
import { TableTabContext } from "src/context/TableTab";
import { useContext } from "react";
export const TabItem = ({ onClick, title, id }: { onClick: () => void; title: string; id: string }) => {
    let { assetTab } = useContext(TableTabContext);

    return (
        <>
            <ListItem
                listStyleType="none"
                p="1.5rem 4rem"
                bg={assetTab === id ? "addition.700" : "none"}
                _hover={{ cursor: "pointer" }}
                onClick={onClick}
                fontWeight="700"
                textAlign="center"
                color={assetTab === id ? "addition.150" : "text.100"}
            >
                {title}
            </ListItem>
        </>
    );
};
