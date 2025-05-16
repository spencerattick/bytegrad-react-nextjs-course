import { EventoEvent } from "@/lib/types";
import Image from "next/image";

type EventCardProps = {
  event: EventoEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <section className="flex flex-col flex-1 basis-80 h-[380px] max-w-[500px] bg-white/[3%] rounded-xl overflow-hidden">
      <Image width={500} height={280} alt={event.name} src={event.imageUrl} className="h-[60%] object-fit"/>
      <div className="flex flex-col flex-1 justify-center items-center">
        <h2 className="text-2xt font-semibold">{event.name}</h2>
        <p className="italic text-white/75">by {event.organizerName}</p>
        <p className="text-sm text-white/50 mt-4">{event.location}</p>
      </div>
    </section>
  );
}
