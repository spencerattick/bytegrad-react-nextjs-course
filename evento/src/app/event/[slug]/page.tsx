import Image from "next/image";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  );
  const event = await response.json();
  return (
    <main>
      <section className="relative h-[361px] overflow-hidden">
        <Image
          src={event.imageUrl}
          className="object-cover z-0 blur-3xl"
          alt="event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="z-1 relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
          />
        </div>
      </section>
      <div></div>
    </main>
  );
}
