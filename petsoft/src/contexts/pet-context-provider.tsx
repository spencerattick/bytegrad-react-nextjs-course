"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, {
  act,
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
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, {action, payload}) => {
    switch (action) {
      case "add":
        return [...state, {...payload, id: Math.random().toString()}];
      case "edit":
        return state.map((pet) =>
          pet.id === payload.id ? {...pet, ...payload.newPetData} : pet
        );
      case "delete":
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers
  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({action: "delete", payload: petId});
    await deletePet(petId);

    setSelectedPetId(null);
  };

  const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
    setOptimisticPets({action: "edit", payload: {id: petId, newPetData}});
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message || "Error adding pet");
      return;
    }
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets({action: "add", payload: newPet});
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
