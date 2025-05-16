import H1 from "@/components/h1";

type EventsPageProps = {
  params: {
    city: string;
  };
};

export default function EventsPage({params}: EventsPageProps) {
  const { city } = params;
  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1>
        {city === 'all' && 'All Events'}
        {city !== 'all' && `Events in ${city[0].toUpperCase() + city.slice(1)}`}
        </H1>
    </main>
  )
}
