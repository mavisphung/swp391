import Navbar from "../../components/Navbar";
import BirdCard from "./BirdCard";
import "./HomeLayout.scss";

function HomePage() {
  const listBirds = [
    {
      name: "Chim nhồng (chim yển)",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      price: 950000,
    },
    {
      name: "Chào mào bẫy đấu Ba Tơ",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2135923823ml116.jpg",
      price: 550000,
    },
    {
      name: "Chào mào bẫy đấu Sơn Hà",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2015465928sh25.jpg",
      price: 850000,
    },
    {
      name: "Chào mào bẫy đấu Sơn Hà",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      price: 550000,
    },
    {
      name: "Chim nhồng (chim yển)",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      price: 950000,
    },
    {
      name: "Chim nhồng (chim yển)",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      price: 950000,
    },
    {
      name: "Chim nhồng (chim yển)",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      price: 950000,
    },
    {
      name: "Chim nhồng (chim yển)",
      img: "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      price: 950000,
    },
  ];
  return (
    <div className="container home-flex-container">
      {listBirds.map((b) => BirdCard(b))}
    </div>
  );
}

export default HomePage;
