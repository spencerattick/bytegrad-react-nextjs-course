import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="preview of PetSoft"
        height={472}
        width={519}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w=[500px]">
          Manage Your <span className="font-extrabold">Pet Daycare</span> with
          Ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
