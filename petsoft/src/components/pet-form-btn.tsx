import React from "react";
import { Button } from "./ui/button";

type PerFormBtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({
  actionType,
}: PerFormBtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add Pet" : "Update Pet"}
    </Button>
  );
}
