"use client";

import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleCheckoutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[]; // Replace 'any' with the actual type of your data
  children: React.ReactNode;
};

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  // state
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers
  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { id: petId, ...newPetData } : pet
      )
    );
    // setSelectedPetId(null);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    // setPets((prevPets) => [
    //   ...prevPets,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet,
    //   },
    // ]);
    await addPet(newPet)
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
