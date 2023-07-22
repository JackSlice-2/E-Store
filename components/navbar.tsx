import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import StoreName from "./store-name";
import getBillboard from "@/actions/get-billboards";

export const revalidate = 0;

const Navbar = async () => {
    const billboardId = process.env.REACT_APP_BILLBOARD_ID;
    const categories = await getCategories();

    let billboard = null;
    if (billboardId) {
      billboard = await getBillboard(billboardId);
    }

    return (
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                    <p className="font-bold x-xl">
                {billboard && <StoreName data={billboard} />}</p>
                </Link>
                <div>  </div>
                <Link href="/allproducts" className="pl-5 ml-1 flex lg:ml-0 gap-x-2">
                    <p className="text-neutral-500 text-sm font-medium">All Products</p>
                </Link>
                <MainNav data={categories}/>
                <NavbarActions />
                </div>
            </Container>
        </div>
    );
}

export default Navbar;