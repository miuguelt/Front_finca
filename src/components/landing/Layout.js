import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }) => {
    return (_jsxs("div", { children: [_jsx(Header, {}), children, _jsx(Footer, {})] }));
};
export default Layout;
