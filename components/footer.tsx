import Image from "next/image";
import { Info as InfoType } from "@/types";
import { Facebook, InstagramIcon, PhoneIcon } from "lucide-react";
import StoreName from "./store-name";
import { FaWhatsapp } from "react-icons/fa";

interface InfoProps {
    data: InfoType | null;
};

const Footer: React.FC<InfoProps> = ({
        data
    }) => {
        if (!data) {
            return null
    }

        return (
            <footer className="bg-slate-100 dark:bg-gray-900">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-5 lg:py-8">
                    <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="w-fit">
                            <StoreName data={data} footer />
                        </div>
                       <div className="pt-5 gap-1 flex">
                        {data?.visa? <Image src="/images/visa.svg" alt="visa" width={40} height={20} /> : ""}

                        {data?.mastercard? <Image src="/images/mastercard.svg" alt="Mastercard" width={40} height={20} /> : ""}

                        {data?.elo? <Image src="/images/elo.svg" alt="elo" width={40} height={20} /> : ""}

                        {data?.amex? <Image src="/images/amex.svg" alt="amex" width={40} height={20} /> : ""}

                        {data?.stripe? <Image src="/images/stripe.svg" alt="stripe" width={40} height={20} /> : ""}

                        {data?.hipercard? <Image src="/images/hipercard.svg" alt="hipercard" width={40} height={20} /> : ""}

                        {data?.pix? <Image src="/images/pix.jpg" alt="pix" width={40} height={20} /> : ""}
                    </div>

                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact Us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                            <a href='' className="hover:underline">
                                    {data.phonenumber}
                                </a>
                                </li>
                                <li className="mb-4">
                                    <a href={data.whatsapp} className="hover:underline">
                                        WhatsApp
                                        </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href={data.facebook} className="hover:underline">
                                        Facebook
                                        </a>
                                </li>
                                <li className="mb-4">
                                    <a href={data.instagram} className="hover:underline ">
                                    Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                            <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">

                <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023
                    <a href="Link" 
                    className="hover:underline"> {data.name}</a>.  Todos Direitos Reservados.
                    </p>

                    <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        Criado e mantido por
                    <p>
                    <a href="https://www.afrotech.pro/"
                    className="hover:underline"> AfroTech</a></p>
                        <p className="text-xs">
                            Soluções em Software
                        </p> 
                    </div>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <a href={data.whatsapp} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <PhoneIcon size={25} />
                        </a>
                        <a href={data.facebook} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Facebook size={25}/>
                        </a>
                        <a href={data.instagram} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <InstagramIcon size={25} />
                        </a>
                        <a href={data.whatsapp} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaWhatsapp size={25} />
                        </a>
                    </div>
                </div>
                </div>
            </footer>
        );
        }
export default Footer;


