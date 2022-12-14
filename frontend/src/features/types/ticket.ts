export enum Product {
  iPhone = "iPhone",
  MacBook = "MacBook",
  iPad = "iPad",
  iMac = "iMac",
}

export type NewTicket = {
  product: Product;
  description: string;
};

export type CreatedTicket = {
  product: Product;
  description: string;
  user: string;
};
