"use client";
import ClipLoader from "react-spinners/ClipLoader";
// import {ClipLoader} from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};
const LoadingPage = () => {
  return (
    <ClipLoader
      color="#00786f"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;

// `aria-label` ek HTML attribute hai jo accessibility improve karta hai. Ye screen readers ko batata hai ki element ka purpose kya hai — even jab visible text clear na ho.
