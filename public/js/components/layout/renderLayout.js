import renderHeader from "./header.js";
import renderNavbar from "./navBar.js";

export default function renderLayout({ HeaderTitle, HeaderSubtitle }) {
  renderHeader(HeaderTitle, HeaderSubtitle);
  renderNavbar();
}
