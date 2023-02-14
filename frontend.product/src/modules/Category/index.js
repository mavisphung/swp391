import {
  // useSearchParams,
  useLocation,
} from "react-router-dom";

import "./CategoryDetailLayout.scss";
import { birdList } from "~/data/Products";
import AppTrace from "../../components/AppTrace";
import BirdCard from "../Home/BirdCard";

function CategoryPage() {
  // const [searchParams] = useSearchParams();
  // const categoryId = searchParams.get("categoryId");

  const location = useLocation();
  const { breadcrumb } = location.state;
  // const pro = birdList.find((b) => b.id == productId);

  return (
    <div className="container">
      <AppTrace />
      <div>
        {birdList.map((b) => {
          return <BirdCard bird={b} key={b.id} historyUrl={breadcrumb} />;
        })}
      </div>
    </div>
  );
}

export default CategoryPage;
