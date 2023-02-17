class Product {
  name;
  productCode;
  medias;
  description;
  price;
  quantity;
  importQuantity;
  categoryId;
  categoryName;
  status;
  categoryType;
  id;
  createdDate;
  updatedDate;
  updatedBy;
  addedBy;
  isDeleted;

  constructor(
    name,
    productCode,
    medias,
    description,
    price,
    quantity,
    importQuantity,
    categoryId,
    categoryName,
    status,
    categoryType,
    id,
    createdDate,
    updatedDate,
    updatedBy,
    addedBy,
    isDeleted
  ) {
    this.name = name;
    this.productCode = productCode;
    this.medias = medias;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.importQuantity = importQuantity;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.status = status;
    this.categoryType = categoryType;
    this.id = id;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
    this.addedBy = addedBy;
    this.isDeleted = isDeleted;
  }
}
export default Product;
