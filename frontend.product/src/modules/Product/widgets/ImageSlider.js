import React from "react";
import ImageGallery from "react-image-gallery";

import "../ProductLayout.scss";
import "../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original:
      "https://www.chimcanhvietnam.vn/images/sanpham/2007250038n%E1%BB%81n.JPG",
    thumbnail:
      "https://www.chimcanhvietnam.vn/images/sanpham/2007250038n%E1%BB%81n.JPG",
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

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.imageSliderRef = React.createRef();
    this.onFullscreen = this.onFullscreen.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onMoveToSlide = this.onMoveToSlide.bind(this);
  }

  onFullscreen() {
    this.myImageRef.current.fullScreen();
  }
  onPlay() {
    this.myImageRef.current.play();
  }
  onPause() {
    this.myImageRef.current.pause();
  }
  onMoveToSlide() {
    // Index start from 0 so 2 will move to 3rd slide
    this.myImageRef.current.slideToIndex(2);
  }

  onEventTrigger(eventName) {
    console.log("Event Name ", eventName);
  }

  render() {
    return (
      <ImageGallery
        ref={this.imageSliderRef}
        items={images}
        infinite={true}
        lazyLoad={true}
        autoPlay={false}
        slideDuration={1000}
        onSlide={() => this.onEventTrigger("onSlide")}
        onClick={() => this.onEventTrigger("onClick")}
        onTouchMove={() => this.onEventTrigger("onTouchMove")}
        renderLeftNav={(onClick, disabled) => <span></span>}
        renderRightNav={(onClick, disabled) => <span></span>}
        showPlayButton={false}
        showFullscreenButton={false}
      />
    );
  }
}
export default ImageSlider;
