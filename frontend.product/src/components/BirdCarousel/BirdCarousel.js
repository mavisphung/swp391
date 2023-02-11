import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./BirdCarouselLayout.scss";

function BirdCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="h-50 text-center birdCarousel "
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.squarespace-cdn.com/content/v1/5b631cba5b409b413bb3a633/1597159842127-KEJHOO89DFA7RP504Y3N/dom-birds2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>
            Khuyến mãi <span style={{ color: "#ee3e6a" }}>giảm giá</span> lên
            đến <span style={{ color: "red", fontSize: "50px" }}>50%</span>
          </h3>
          <p>
            Khi mua combo bao gồm <span style={{ color: "#ee3e6a" }}>chim</span>{" "}
            và <span style={{ color: "#ee3e6a" }}>phụ kiện</span> kèm theo
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.squarespace-cdn.com/content/v1/5b631cba5b409b413bb3a633/1597159842127-KEJHOO89DFA7RP504Y3N/dom-birds2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>
            Khuyến mãi <span style={{ color: "#ee3e6a" }}>giảm giá</span> lên
            đến <span style={{ color: "red", fontSize: "50px" }}>50%</span>
          </h3>
          <p>
            Khi mua combo bao gồm <span style={{ color: "#ee3e6a" }}>chim</span>{" "}
            và <span style={{ color: "#ee3e6a" }}>phụ kiện</span> kèm theo
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.squarespace-cdn.com/content/v1/5b631cba5b409b413bb3a633/1597159842127-KEJHOO89DFA7RP504Y3N/dom-birds2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>
            Khuyến mãi <span style={{ color: "#ee3e6a" }}>giảm giá</span> lên
            đến <span style={{ color: "red", fontSize: "50px" }}>50%</span>
          </h3>
          <p>
            Khi mua combo bao gồm <span style={{ color: "#ee3e6a" }}>chim</span>{" "}
            và <span style={{ color: "#ee3e6a" }}>phụ kiện</span> kèm theo
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default BirdCarousel;

// render(<BirdCarousel />);
