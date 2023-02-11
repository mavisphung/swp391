import BirdCard from "./BirdCard";
import "./HomeLayout.scss";
import Bird from "../../models/Bird";

function HomePage() {
  const listBirds2 = [
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chào mào bẫy đấu Ba Tơ",
      "https://www.chimcanhvietnam.vn/images/sanpham/2135923823ml116.jpg",
      950000
    ),
    new Bird(
      "Chào mào bẫy đấu Ba Tơ",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
    new Bird(
      "Chim nhồng (chim yểng)",
      "https://www.chimcanhvietnam.vn/images/sanpham/2118133704hqdefault.jpg",
      950000
    ),
  ];

  return (
    <div className="container home-flex-container">
      {listBirds2.map((b) => BirdCard(b))}
    </div>
  );
}

export default HomePage;
