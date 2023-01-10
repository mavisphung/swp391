import "./HeaderLayout.scss";

function Header() {
  return (
    <div className="header">
      <div className="topping">
        <div className="container">
          <a href="/login" className="authen-link">
            Login
          </a>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>
    </div>
  );
}

export default Header;
