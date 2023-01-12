import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';
import Footer from '~/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header className={cx('header')} />
      <div className={cx('container')}>
        <Sidebar className={cx('sidebar')} />
        <div className={cx('content')}>{children}</div>
      </div>
      <div className={cx('footer')}>
        <Footer />
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
