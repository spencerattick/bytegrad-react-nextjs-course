import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormBtn({
  actionType,
}: {
  actionType: "add" | "edit";
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {actionType === "add" ? "Add Pet" : "Update Pet"}
    </Button>
  );
}
