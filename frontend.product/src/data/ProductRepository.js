import api from "~/context/AppApi";

export async function getProductWithId(productId) {
  try {
    const response = await api.get(`/product/${productId}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("getProductWithId Error", error);
  }
}

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
        PageSize: PageSize ?? 50,
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

export async function getRelativeList({
  productId,
  PageNumber,
  PageSize,
  Search,
}) {
  try {
    const response = await api.get(`/product/${productId}/relatives`, {
      params: {
        PageNumber: PageNumber ?? 1,
        PageSize: PageSize ?? 20,
        Search,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("getRelativeList Error", error);
  }
}
