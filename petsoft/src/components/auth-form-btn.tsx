"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormButtonProps = {
  type: "logIn" | "signUp";
};

export default function AuthFormButton({ type }: AuthFormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {type === "logIn" ? "Log In" : "Sign Up"}
    </Button>
  );
}
