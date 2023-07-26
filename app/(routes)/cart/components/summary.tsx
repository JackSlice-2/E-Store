"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/myButton";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import PayPalButtonsWrapper from "./pay-pal";
import PayPalButton from "./pay-pal";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();

    }
    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id)
    });

    window.location = response.data.url;
  }

  const clientId = "AbjWPM0J_96lLv-qqJ5sd-HuSO2wo-E232z38HOBbEWGh9TmndNGYYuqwO9UTyStwA956ztROik_6eRE";
  
const currency = "BRL"
  return ( 
    <div
      className="dark:bg-gray-900 text-white mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <Button 
      onClick={onCheckout} 
      disabled={items.length === 0} 
      className="w-full mt-6 cursor-pointer">
        Checkout
      </Button>
      <div className="p-5">
      <PayPalButton clientId={clientId} totalPrice={totalPrice}/>
    </div>
    </div>
  );
}
 
export default Summary;
