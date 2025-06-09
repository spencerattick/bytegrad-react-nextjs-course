"use client";

import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick,
}: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon">
            <PlusIcon className="w-6 h-6" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Pet</DialogTitle>
          </DialogHeader>
          <PetForm></PetForm>
        </DialogContent>
      </Dialog>
    );
  }
  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }
  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }
}
