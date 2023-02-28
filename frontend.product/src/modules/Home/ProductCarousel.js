import { useRef } from "react";
import { Carousel } from "antd";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import "./HomeLayout.scss";
import BirdCard from "./BirdCard";

function ProductCarousel({ list, type = 0 }) {
  let slider = useRef();
  const slides = list.length >= 3 ? 3 : list.length;
  return (
    <div>
      <Carousel
        className="my-carousel"
        dots={false}
        slidesToScroll={3}
        slidesToShow={slides}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        {list.map((b) => (
          <div key={b.id}>
            <BirdCard bird={b} />
          </div>
        ))}
      </Carousel>
      <div className="d-flex justify-content-center">
        <button
          className="btn-slide"
          onClick={() => {
            slider.current.prev();
          }}
        >
          <GoChevronLeft />
        </button>
        <button
          className="btn-slide"
          onClick={() => {
            slider.current.next();
          }}
        >
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ProductCarousel;
