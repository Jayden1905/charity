import PropTypes from "prop-types";

export function ErrorPage({ errorMessage }) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-center text-6xl">{errorMessage}</h1>
    </div>
  );
}

ErrorPage.propTypes = {
  errorMessage: PropTypes.string,
};
