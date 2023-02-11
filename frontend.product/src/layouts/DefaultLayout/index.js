import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <Container fluid className={cx("wrapper")}>
      <Header />
      <div>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
