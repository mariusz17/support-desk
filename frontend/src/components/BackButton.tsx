import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  url: string;
};

const BackButton = ({ url }: Props) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowAltCircleLeft /> Back
    </Link>
  );
};

export default BackButton;
