import { Figure, Image } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

import "./HomeLayout.scss";
import config from "~/config";

const CategoryCard = ({ cate }) => {
  const navigate = useNavigate();
  const params = {
    categoryId: cate.id,
  };

  return (
    <Figure
      className="px-2"
      onClick={() =>
        navigate(
          {
            pathname: config.routes.category,
            search: `?${createSearchParams(params)}`,
          },
          {
            preventScrollReset: false,
            state: {
              breadcrumb: [
                {
                  name: cate.name,
                  url: `/dashboard/category?categoryId=${cate.id}`,
                },
              ],
              cateId: cate.id,
            },
          }
        )
      }
    >
      <Image
        width={220}
        height={170}
        alt="Chào mào"
        src={cate.image}
        // style={{ objectFit: "contain" }}
      />
      <Figure.Caption>{cate.name}</Figure.Caption>
    </Figure>
  );
};

export default CategoryCard;
