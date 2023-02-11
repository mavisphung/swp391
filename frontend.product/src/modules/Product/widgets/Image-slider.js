import React from "react";
import ImageGallery from "react-image-gallery";

import "./ImageSliderLayout.scss";
import "../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/400/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    originalWidth: "90px",
    originalHeight: "170px",
    thumbnailWidth: "40px",
    thumbnailHeight: "60px",
  },
  {
    original: "https://picsum.photos/id/1015/1000/400/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    originalWidth: "90px",
    originalHeight: "170px",
    thumbnailWidth: "40px",
    thumbnailHeight: "60px",
  },
  {
    original: "https://picsum.photos/id/1026/1000/400/",
    thumbnail: "https://picsum.photos/id/1026/250/150/",
    // thumbnailClass: "hello",
    originalWidth: "90px",
    originalHeight: "170px",
    thumbnailWidth: "40px",
    thumbnailHeight: "60px",
    //#337ab7
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
