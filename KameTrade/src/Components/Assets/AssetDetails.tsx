import { useParams } from "react-router-dom";
const AssetDetails = () => {
    const { id } = useParams();
    return <div>{id}</div>;
};

export default AssetDetails;
