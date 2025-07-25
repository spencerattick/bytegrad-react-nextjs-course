"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ----- user actions -----

export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(1000);
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid email or password",
          };
        default:
          return {
            message: "Could not sign in",
          };
      }
    }
    throw error;
  }
}

export async function logOut() {
  await sleep(1000);
  await signOut({ redirectTo: "/" });
}

export async function signUp(prevState: unknown, formData: unknown) {
  await sleep(1000);
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  const formDataEntries = Object.fromEntries(formData.entries());
  const validatedFormData = await authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint failed
        return {
          message: "Email already exists",
        };
      }
    }
    return {
      message: "Error creating user",
    };
  }

  await signIn("credentials", formData);
}

// ----- pet actions -----

export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(1000);

  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You do not have permission to edit this pet",
    };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Error updating pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep(1000);

  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
      // errors: validatedPet.error.errors,
    };
  }

  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You do not have permission to delete this pet",
    };
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return {
      message: "Error deleting pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function createCheckoutSession() {
  const session = await checkAuth();
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [{ price: "price_1RoT4QD4akI371gZNm9lGbWX", quantity: 1 }],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?canceled=true`,
  });

  redirect(checkoutSession.url);
}
