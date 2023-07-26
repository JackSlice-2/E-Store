import React, { useState } from 'react';

interface ShippingFormProps {
  onCalculateShipping: (formData: ShippingFormData) => void;
}

interface ShippingFormData {
  cepOrigem: string;
  cepDestino: string;
  peso: string;
  comprimento: string;
  altura: string;
  largura: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onCalculateShipping }) => {
  const [formData, setFormData] = useState<ShippingFormData>({
    cepOrigem: '',
    cepDestino: '',
    peso: '',
    comprimento: '',
    altura: '',
    largura: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Call the function to calculate shipping costs with formData
    onCalculateShipping(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cepOrigem">CEP de Origem:</label>
        <input
          type="text"
          id="cepOrigem"
          name="cepOrigem"
          value={formData.cepOrigem}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cepDestino">CEP de Destino:</label>
        <input
          type="text"
          id="cepDestino"
          name="cepDestino"
          value={formData.cepDestino}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="peso">Peso (em kg):</label>
        <input
          type="text"
          id="peso"
          name="peso"
          value={formData.peso}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="comprimento">Comprimento (em cm):</label>
        <input
          type="text"
          id="comprimento"
          name="comprimento"
          value={formData.comprimento}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="altura">Altura (em cm):</label>
        <input
          type="text"
          id="altura"
          name="altura"
          value={formData.altura}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="largura">Largura (em cm):</label>
        <input
          type="text"
          id="largura"
          name="largura"
          value={formData.largura}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Calcular Frete</button>
    </form>
  );
};

export default ShippingForm;
