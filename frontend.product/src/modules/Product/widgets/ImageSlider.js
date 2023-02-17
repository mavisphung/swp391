import ImageGallery from "react-image-gallery";

import "../ProductLayout.scss";
import "../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

function ImageSlider({ imgs }) {
  const images = imgs.map((e) => {
    return {
      original: e.url,
      thumbnail: e.url,
      originalHeight: "320px",
      thumbnailHeight: "60px",
    };
  });

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
