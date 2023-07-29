"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import toast from "react-hot-toast"
import { CheckCheck, Cigarette } from "lucide-react"
import { useState } from "react"

const freteTypes = [
  { label: "Frete PAC Internacional R$150.00", value: "150" },
  { label: "Frete PAC Nacional R$100.00", value: "100" },
  { label: "Frete PAC RS R$80.00", value: "80" },
  { label: "Frete PAC Grande POA", value: "40" },
] as const

const FormSchema = z.object({
  freteType: z.string({
    required_error: "Please select a freteType.",
  }),
})

type SubmitHandler = (data: z.infer<typeof FormSchema>) => void;

export function ComboboxForm({ onSubmit }: { onSubmit: SubmitHandler }) {
      const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
    toast.success("You submitted the Freight values", {
      duration: 4000,
      position: "top-right",
      style: {
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
        fontSize: "16px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#333",
      },
      
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="freteType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Escolha o Tipo de Envio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      role="combobox"
                      className={cn(
                        "w-[300px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? freteTypes.find(
                            (freteType) => freteType.value === field.value
                          )?.label
                        : "Select freteType"}
                      <Cigarette className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandGroup>
                      {freteTypes.map((freteType) => (
                        <CommandItem
                          value={freteType.value}
                          key={freteType.value}
                          onSelect={(value) => {
                            form.setValue("freteType", value)
                          }}
                        >
                          {freteType.label}
                          <CheckCheck
                            className={cn(
                              "ml-auto h-4 w-4",
                              freteType.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the freteType that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const CalculateFreight = () => {
    const [selectedFreteType, setSelectedFreteType] = useState<string | null>(null);
  
    function handleFormSubmit(data: z.infer<typeof FormSchema>) {
        setSelectedFreteType(data.freteType);
    }
  
    return (
      <div className="text-black">
        <ComboboxForm onSubmit={handleFormSubmit} />
        {selectedFreteType && (
          <p>Selected Frete Type: {selectedFreteType}</p>
        )}
      </div>
    );
  };
  
  export default CalculateFreight;





// OTHER WAYS OF HANDLING CEP USING CORREIOS CEP CALCULATOR


//        ___   ______   ___   
//       //     ||__    ||_||  
//      ||      ||      ||   
//       \\__   ||____  ||  



// Works with a backend server in the root of the admin app 

// run ---->    node backend-server.js  

//in a new terminal in the root of the admin app to start server to use this method

// ecommerce-admin/backend-server.js



// import React, { useState } from 'react';
// import axios from 'axios';

// const CalculateFreight: React.FC = () => {
//   const [cep, setCep] = useState('');
//   const [selectedService, setSelectedService] = useState<'04014' | '04510'>('04014'); // Default to PAC service
//   const [shippingCost, setShippingCost] = useState<number | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCep(event.target.value);
//   };

//   const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedService(event.target.value as '04014' | '04510');
//   };

//   const handleCalculateShipping = () => {
//     // Ensure a valid CEP is provided
//     if (!cep || cep.length !== 8 || isNaN(Number(cep))) {
//       setErrorMessage('Please enter a valid CEP.');
//       setShippingCost(null);
//       return;
//     }

//     const args = {
//       sCepOrigem: '81200100', // origin CEP
//       sCepDestino: cep,
//       nVlPeso: '1', // Weight in kg
//       nCdFormato: '1', // Format of the package (1 = box/package)
//       nVlComprimento: '20', // Length in cm
//       nVlAltura: '20', // Height in cm
//       nVlLargura: '20', // Width in cm
//       nCdServico: [selectedService], // Service code (04014 = PAC, 04510 = SEDEX)
//       nVlDiametro: '0', // Diameter in cm
//     };

//     console.log('Sending data to the server:', args); // Log the data being sent to the server
//     // Calculate shipping cost and set the state
//     axios.post('http://localhost:5000/calculate-shipping', args)
    
    
//     .then(response => {
//         console.log('Response:', response.data);
//         if (response && response.data && response.data.length > 0) {
//           setShippingCost(Number(response.data[0].Valor.replace(',', '.')));
//           setErrorMessage(null);
//         } else {
//           setErrorMessage('No shipping options available for the provided CEP.');
//           setShippingCost(null);
//         }
//       })
//       .catch(error => {
//         console.error('Error calculating shipping:', error);
//         setErrorMessage('An error occurred while calculating shipping.');
//         setShippingCost(null);
//       });
//   };

//   return (
//     <div>
//       <h2>Checkout Page</h2>
//       <div>
//         <label>Enter your CEP (ZIP code):</label>
//         <input type="text" value={cep} onChange={handleCepChange} />
//         <button onClick={handleCalculateShipping}>Calculate Shipping</button>
//         {errorMessage && <p>{errorMessage}</p>}
//         {shippingCost !== null && (
//           <p>
//             Shipping Cost: R${' '}
//             {shippingCost.toLocaleString('pt-BR', {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })}
//           </p>
//         )}
//       </div>
//       <div>
//         <label>Select Shipping Service:</label>
//         <select value={selectedService} onChange={handleServiceChange}>
//           <option value="04014">PAC</option>
//           <option value="04510">SEDEX</option>
//         </select>
//       </div>
//       <div>
//       </div>
//     </div>
//   );
//         }

// export default CalculateFreight;







//FRONT END ONLY VERSION, FETCHES DATA BUT 
// CORS
//ERROR


//        ___      ____      ___       __
//       //      //    \\   ||_||    ||
//      ||      ||      ||  || \\     \\
//       \\__    \\____//   ||  \\   __||
  




// import React, { useState } from 'react';
// import { calcularPrecoPrazo } from 'correios-brasil';
// import { parseString } from 'xml2js';

// const CalculateFreight: React.FC = () => {
//   const [destinationCEP, setDestinationCEP] = useState('');
//   const [deliveryInfo, setDeliveryInfo] = useState<any[]>([]);

//   const handleCalculatePriceAndTime = async () => {
//     try {
//       // Your correios.com.br URL
//       const correiosURL = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=81200100&sCepDestino=${destinationCEP}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&nCdServico=04510&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`;

//       const response = await fetch(correiosURL);
//       const xmlData = await response.text();

//       // Parse the XML data to JavaScript object
//       parseString(xmlData, { explicitArray: false, trim: true }, (err, parsedData) => {
//         if (err) {
//           console.error('Error parsing delivery info:', err);
//         } else {
//           // Extract the data from the JavaScript object
//           const extractedData = parsedData.Servicos.cServico;
//           setDeliveryInfo([extractedData]);
//         }
//       });
//     } catch (error) {
//       console.error('Error fetching delivery info:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Digite o CEP de destino"
//         value={destinationCEP}
//         onChange={(e) => setDestinationCEP(e.target.value)}
//       />
//       <button onClick={handleCalculatePriceAndTime}>Consultar Preço e Prazo de Entrega</button>
//       {deliveryInfo.length > 0 && (
//         <div>
//           <h3>Informações de Entrega:</h3>
//           <ul>
//             {deliveryInfo.map((info, index) => (
//               <li key={index}>
//                 <p>Código: {info.Codigo}</p>
//                 <p>Valor: {info.Valor}</p>
//                 <p>Prazo de Entrega: {info.PrazoEntrega}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalculateFreight;