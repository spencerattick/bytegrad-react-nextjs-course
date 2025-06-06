"use client";

import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type TPetContext = {
    pets: Pet[];
    selectedPetId: string | null;
    handleChangeSelectedPetId: (id: string) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[]; // Replace 'any' with the actual type of your data
  children: React.ReactNode;
};

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSelectedPetId
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
