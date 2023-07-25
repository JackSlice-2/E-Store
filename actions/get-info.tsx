import { Info } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/infos`;

const getInfo = async (id: string): Promise<Info> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
};

export default getInfo;