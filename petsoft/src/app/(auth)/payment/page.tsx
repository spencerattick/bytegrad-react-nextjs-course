"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";

export default function Page({ searchParams }) {
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>PetSoft access requires payment</H1>
      {!searchParams.success && (
        <Button
          onClick={async () => {
            await createCheckoutSession();
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}

      {searchParams.success && (
        <p className="text-green-700 text-sm">
          Thank you for your purchase! You now have lifetime access to PetSoft.
        </p>
      )}
      {searchParams.canceled && (
        <p className="text-red-700 text-sm">
          Your payment was canceled. You can try again if you want to purchase
          access.
        </p>
      )}
    </main>
  );
}
