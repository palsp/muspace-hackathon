import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OrderService } from "../services/order.service";
@Component({
  selector: "app-harvest",
  templateUrl: "./harvest.page.html",
  styleUrls: ["./harvest.page.scss"],
})
export class HarvestPage implements OnInit {
  users: any;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data["special"]) {
      this.users = this.route.snapshot.data["special"];
    }
    this.orderService.setData(43, this.users);
  }
}
