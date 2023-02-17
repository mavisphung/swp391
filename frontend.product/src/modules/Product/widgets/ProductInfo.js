function ProductInfo({ info1, info2 }) {
  info1 = info1
    ? info1
    : "Sản phẩm được sản xuất từ tre già loại 1. Móc lồng bằng tre, cứng, đẹp. Thiết kế theo hình trụ. Thanh lồng mảnh, cứng tuyệt đối. Đáy lồng làm bằng tre, đẹp, sang trọng. Lồng làm thủ công và chưa quét màu.";
  const arr1 = info1.split(". ");
  info2 = info2
    ? info2
    : "Sản xuất bởi: Cơ sở sản xuất lồng chim Công ty Cổ Phần ChyTech. Xưởng sản xuất: Biên Hòa - Đồng Nai. Cửa hàng đại diện và phân phối: 84 Đ. Nguyễn Vãn Nghi, Phường 5, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam.";
  const arr2 = info1.split(". ");

  return (
    <div className="row product-block">
      <div className="col">
        <h5>Thông tin sản phẩm</h5>
        <ul>
          {arr1.map((e, index) => (
            <li key={index}>{e.trim()}</li>
          ))}
        </ul>
      </div>
      <div className="col">
        <h5>Lưu ý khi mua</h5>
        <ul>
          {arr2.map((e, index) => (
            <li key={index}>{e.trim()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductInfo;
