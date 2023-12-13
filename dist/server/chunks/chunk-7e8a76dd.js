import { jsx } from "react/jsx-runtime";
import PropTypes__default from "prop-types";
function List({ children }) {
  return /* @__PURE__ */ jsx("ul", { className: "grid gap-x-8 gap-y-6 sm:gap-y-4 p-6 sm:p-0", children });
}
List.propTypes = {
  children: PropTypes__default.array
};
export {
  List as L
};
