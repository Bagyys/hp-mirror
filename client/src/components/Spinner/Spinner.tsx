import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  text-align: center;
  margin: 20% auto;
  border-color: #062a78;
`;

const Spinner = () => {
  return (
    <div className="MoonLoader">
      <PuffLoader css={override} size={200} color={"#ffba57"} loading={true} />
    </div>
  );
};

export default Spinner;
