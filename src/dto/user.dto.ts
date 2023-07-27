import { Request } from "express";
import { Membership } from "../db/entity/membership.entity";

interface UserDTO extends Request {
  body: {
    name: string;
    membership: Membership["type"];
  };
}

export { UserDTO };
