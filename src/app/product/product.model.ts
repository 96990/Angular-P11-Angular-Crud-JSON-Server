
export interface Column {
  field: string;
  header: string;
}
export interface Product {
    id: number,
    title: string, 
    category: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number, 
    stock:  number, 
    tags: string, 
    brand: string, 
    sku: string,     
    weight: number,
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: availabilityStatus,
    returnPolicy: string,
    minimumOrderQuantity: number
  }

export interface availabilityStatus {
    label: string;
    value: string;
}