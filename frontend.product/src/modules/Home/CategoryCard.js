const { Figure, Image } = require("react-bootstrap");

const CategoryCard = (category) => {
  return (
    <Figure className="px-2">
      <Image
        width={220}
        height={170}
        alt="Chào mào"
        src={category.imgUrl}
        // className="object-fit-fill border rounded"
      />
      <Figure.Caption style={{ fontSize: "24px", color: "#000" }}>
        {category.name}
      </Figure.Caption>
    </Figure>
  );
};

export default CategoryCard;
