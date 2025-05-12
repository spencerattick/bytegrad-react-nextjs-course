import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
      alt="This is the logo for Evento"
      height={12}
      width={53}
    />
  );
}
