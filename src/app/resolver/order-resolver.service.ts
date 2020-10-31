import { Injectable } from "@angular/core";
import { OrderService } from "../services/order.service";
import {
  Resolve,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class OrderResolverService {
  constructor(private orderService: OrderService) {}
  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get("id");
    return this.orderService.getData(id);
  }
}
