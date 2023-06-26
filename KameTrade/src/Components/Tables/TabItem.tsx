import { ListItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/rootStore";
export const TabItem = ({ onClick, title, id }: { onClick: () => void; title: string; id: string }) => {
    const testTab = useSelector((state: RootState) => {
        return state.tabs.assetType;
    });

    return (
        <>
            <ListItem
                listStyleType="none"
                p="1.5rem 4rem"
                bg={testTab === id ? "addition.700" : "none"}
                _hover={{ cursor: "pointer" }}
                onClick={onClick}
                fontWeight="700"
                textAlign="center"
                color={testTab === id ? "addition.150" : "text.100"}
            >
                {title}
            </ListItem>
        </>
    );
};
