import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import api from "~/context/AppApi";
import "./BirdCarouselLayout.scss";

function BirdCarousel() {
  const [index, setIndex] = useState(0);
  const [banner, setBanner] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const getBanner = async () => {
    const response = await api.get("/banner");
    if (response.status === 200) {
      try {
        setBanner(response.data);
        // console.log("BANNER", banner);
      } catch (e) {
        console.log("ERROR BANNER", e);
      }
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="h-50 text-center birdCarousel "
    >
      {banner.map((b) => (
        <Carousel.Item>
          <img className="d-block w-100" src={b.image} alt="Second slide" />
          <Carousel.Caption>
            <h3 style={{ color: "#000000" }}>
              Khuyến mãi{" "}
              <span style={{ color: "#ee3e6a", fontSize: "30px" }}>
                giảm giá
              </span>
              lên đến{" "}
              <span style={{ color: "red", fontSize: "50px" }}>50%</span>
            </h3>
            <p style={{ color: "#000000" }}>
              Khi mua combo bao gồm{" "}
              <span style={{ color: "#ee3e6a" }}>chim</span> và
              <span style={{ color: "#ee3e6a" }}> phụ kiện</span> kèm theo
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.squarespace-cdn.com/content/v1/5b631cba5b409b413bb3a633/1597159842127-KEJHOO89DFA7RP504Y3N/dom-birds2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>
            Khuyến mãi{" "}
            <span style={{ color: "#ee3e6a", fontSize: "30px" }}>giảm giá</span>{" "}
            lên đến <span style={{ color: "red", fontSize: "50px" }}>50%</span>
          </h3>
          <p>
            Khi mua combo bao gồm <span style={{ color: "#ee3e6a" }}>chim</span>{" "}
            và <span style={{ color: "#ee3e6a" }}>phụ kiện</span> kèm theo
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default BirdCarousel;

// render(<BirdCarousel />);
