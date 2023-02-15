import ImageGallery from "react-image-gallery";

import "../ProductLayout.scss";
import "../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

function ImageSlider({ img }) {
  const images = [
    {
      original: img,
      thumbnail: img,
      originalHeight: "320px",
      thumbnailHeight: "60px",
    },
    {
      original:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2129246649DSCN1762.JPG",
      thumbnail:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2129246649DSCN1762.JPG",
      originalHeight: "320px",
      thumbnailHeight: "60px",
    },
    {
      original:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2092253991DSCN1763.JPG",
      thumbnail:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2092253991DSCN1763.JPG",
      originalHeight: "320px",
      thumbnailHeight: "60px",
    },
    {
      original:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2108179206DSCN1768.JPG",
      thumbnail:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2108179206DSCN1768.JPG",
      originalHeight: "320px",
      thumbnailHeight: "60px",
    },
    {
      original:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2026366129n%E1%BB%81n.JPG",
      thumbnail:
        "https://www.chimcanhvietnam.vn/images/sanpham/slider/2026366129n%E1%BB%81n.JPG",
      originalHeight: "320px",
      thumbnailHeight: "60px",
    },
  ];

  return (
    <ImageGallery
      // ref={this.imageSliderRef}
      items={images}
      infinite={true}
      lazyLoad={true}
      autoPlay={false}
      slideDuration={1000}
      // onSlide={() => this.onEventTrigger("onSlide")}
      // onClick={() => this.onEventTrigger("onClick")}
      // onTouchMove={() => this.onEventTrigger("onTouchMove")}
      renderLeftNav={(_, __) => <span></span>}
      renderRightNav={(_, __) => <span></span>}
      showPlayButton={false}
      showFullscreenButton={false}
    />
  );
}
export default ImageSlider;
