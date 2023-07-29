const CalculateFreight = () => {
    return ( 
        <div>
            CalculateFreight
        </div>
    )
}
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
//       sCepOrigem: '81200100', // Replace with your origin CEP
//       sCepDestino: cep,
//       nVlPeso: '1', // Weight in kilograms (converted to a string)
//       nCdFormato: '1', // Format of the package (1 = box/package)
//       nVlComprimento: '20', // Length in centimeters (converted to a string)
//       nVlAltura: '20', // Height in centimeters (converted to a string)
//       nVlLargura: '20', // Width in centimeters (converted to a string)
//       nCdServico: [selectedService], // Array with the selected service code (04014 = PAC, 04510 = SEDEX)
//       nVlDiametro: '0', // Diameter in centimeters (converted to a string)
//     };

//     console.log('Sending data to the server:', args); // Log the data being sent to the server
//     // Calculate shipping cost and set the state
//     axios.post('http://localhost:5000/calculate-shipping', args)
    
    
//     .then(response => {
//         console.log('Response:', response.data); // Log the response data to the console
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
//         {/* Your other checkout page content and form goes here */}
//       </div>
//     </div>
//   );
// 

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
//                 {/* Add other properties you want to display */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalculateFreight;