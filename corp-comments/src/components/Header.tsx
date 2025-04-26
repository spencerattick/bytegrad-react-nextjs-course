import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

type HeaderProps = {
  handleAppFeedback: (text: string) => void;
}

export default function Header({handleAppFeedback}: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAppFeedback={handleAppFeedback}/>
    </header>
  );
}
