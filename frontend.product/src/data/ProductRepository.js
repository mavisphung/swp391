import api from "~/context/AppApi";

export async function getProductList({
  CategoryId,
  CategoryType,
  Status,
  FromPrice,
  ToPrice,
  FromDate,
  ToDate,
  PageNumber,
  PageSize,
  Search,
}) {
  try {
    const response = await api.get("/product", {
      params: {
        CategoryId,
        CategoryType,
        Status,
        FromPrice,
        ToPrice,
        FromDate,
        ToDate,
        PageNumber: PageNumber ?? 1,
        PageSize: PageSize ?? 10,
        Search,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("getProductList Error", error);
  }
}
