import PropTypes from "prop-types";
import { cn } from "../../util/util";

export function Container({ children, className }) {
  return (
    <div className={cn(`max-w-7xl mx-auto px-4 ${className}`)}>{children}</div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
