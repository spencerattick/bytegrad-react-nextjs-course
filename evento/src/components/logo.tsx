import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
        alt="This is the logo for Evento"
        height={12}
        width={53}
      />
    </Link>
  );
}
