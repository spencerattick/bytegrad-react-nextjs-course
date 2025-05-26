import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const btnStyles = 'text-white flex items-center page-x-2 px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm'

export default function PaginationControls() {
  return (
    <section className="flex">
      <Link
        href="/events/austin?page=1"
        className={btnStyles}
      >
        <ArrowLeftIcon />
        Previous
      </Link>
      <Link
        href="/events/austin?page=3"
        className={btnStyles}
      >
        Next
        <ArrowRightIcon />
      </Link>
    </section>
  );
}
