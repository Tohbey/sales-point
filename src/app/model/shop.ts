import { User } from "./user";

export class Assest{
  type!: string;
  URL!: string;
  name!: string;
  fieldName!: string;
  default!: boolean;
}

export class Shop {
  _id!: String;
  user!: User;
  name!: String;
  description!: String;
  address!: String;
  logo!: Assest;
  postCode!: String;
  approvalStatus!: String;
  certificates!: Assest[]
  createdAt!: Date;
  updatedAt!: Date;
}
