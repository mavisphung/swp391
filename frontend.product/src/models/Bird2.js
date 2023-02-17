class Bird2 {
  id;
  productCode;
  name;
  medias;
  description;
  price;
  quantity;
  importQuantity;
  categoryId;
  status;
  categoryType;
  createdDate;
  updatedDate;
  updatedBy;
  addedBy;
  isDeleted;

  constructor(
    id,
    productCode,
    name,
    medias,
    description,
    price,
    quantity,
    importQuantity,
    categoryId,
    status,
    categoryType,
    createdDate,
    updatedDate,
    updatedBy,
    addedBy,
    isDeleted
  ) {
    this.id = id;
    this.productCode = productCode;
    this.name = name;
    this.medias = medias;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.importQuantity = importQuantity;
    this.categoryId = categoryId;
    this.status = status;
    this.categoryType = categoryType;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.updatedBy = updatedBy;
    this.addedBy = addedBy;
    this.isDeleted = isDeleted;
  }
}
export default Bird2;
