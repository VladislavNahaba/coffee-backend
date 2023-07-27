import { IncomingHttpHeaders } from "http";
import { Request } from "express";
import { Coffee } from "../db/entity/coffee.entity";
import { Membership } from "../db/entity/membership.entity";

interface coffeeDTO extends Request {
  headers: IncomingHttpHeaders & {
    "user-id"?: string;
    "membership-type"?: Membership["type"];
  };
  body: {
    coffee: Coffee["type"];
  };
}

export { coffeeDTO };
