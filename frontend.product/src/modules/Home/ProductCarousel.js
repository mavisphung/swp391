import { useRef } from "react";
import { Carousel } from "antd";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import "./HomeLayout.scss";
import BirdCard from "./BirdCard";

function ProductCarousel({ list }) {
  let slider = useRef();
  return (
    <div>
      <Carousel
        className="my-carousel"
        dots={false}
        slidesToShow={3}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        {list.map((b) => (
          <BirdCard key={b.id} bird={b} />
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
