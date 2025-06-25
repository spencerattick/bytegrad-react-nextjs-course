"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, {
  createContext,
  startTransition,
  useOptimistic,
  useState,
} from "react";
import { toast } from "sonner";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleChangeSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[]; // Replace 'any' with the actual type of your data
  children: React.ReactNode;
};

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers
  const handleCheckoutPet = async (petId: string) => {
    await deletePet(petId);

    setSelectedPetId(null);
  };

  const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message || "Error adding pet");
      return;
    }
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message || "Error adding pet");
      return;
    }
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
