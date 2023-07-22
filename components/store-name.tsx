import { Billboard as BillboardType } from "@/types";

interface StoreNameProps {
    data: BillboardType
};

const StoreName: React.FC<StoreNameProps> = ({
    data
}) => {
    return (
            <div 
            className="">
                {data.label}
            </div>
    );
}

export default StoreName;