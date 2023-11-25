import PropTypes from "prop-types";

export function PricingCard({ plan, description, price, features }) {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-base-200 rounded-lg border border-base-200 shadow xl:p-8">
      <h3 className="mb-4 text-2xl font-semibold">{plan}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        {description}
      </p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">${price}</span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center justify-between space-x-3 ${
              plan === "Basic" ? "last:opacity-40" : ""
            } ${plan === "Basic" && index === 3 ? "opacity-40" : ""} ${
              plan === "Exclusive" && "last:opacity-40"
            }`}
          >
            <span>{feature}</span>
            <svg
              className="flex-shrink-0 w-7 h-7 text-green-500 dark:text-green-400 bg-base-100 p-1 rounded-full"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
        ))}
      </ul>
      <button className="btn btn-accent">Get started</button>
    </div>
  );
}

PricingCard.propTypes = {
  plan: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  features: PropTypes.array,
};
