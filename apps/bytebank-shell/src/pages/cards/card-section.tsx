import React from "react";
import { BytebankCardBank } from "@repo/ui";

export const BytebankCardSection: React.FC = () => {
  return (
    <>
        <BytebankCardBank
          variant="Físico"
          details={{
            name: "Eloisa Fagundes",
            cardNumber: "1234567890123456",
            expirationDate: "12/25",
          }}
        />
      Bytebank Cards Page - rota funcionando!
    </>
  );
};

