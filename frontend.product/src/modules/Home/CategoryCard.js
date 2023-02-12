import { Figure, Image } from "react-bootstrap";
import "./HomeLayout.scss";

const CategoryCard = ({ cate }) => {
  return (
    <Figure className="px-2">
      <Image
        width={220}
        height={170}
        alt="Chào mào"
        src={cate.imgUrl}
        style={{ objectFit: "contain" }}
      />
      <Figure.Caption>{cate.name}</Figure.Caption>
    </Figure>
  );
};

export default CategoryCard;
