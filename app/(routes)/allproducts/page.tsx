import getAllProducts from "@/actions/get-all-products";
import getBillboard from "@/actions/get-billboards";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const billboardId = process.env.REACT_APP_BILLBOARD_ID;
  const products = await getAllProducts({});

  let billboard = null;
  if (billboardId) {
    billboard = await getBillboard(billboardId);
  }

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="All Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
