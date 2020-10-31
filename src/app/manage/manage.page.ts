import { Component, OnInit } from "@angular/core";
import {
  UserService,
  UserServiceService,
} from "../services/user-service.service";
import { SizeServiceService } from "../services/size-service.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
@Component({
  selector: "app-manage",
  templateUrl: "./manage.page.html",
  styleUrls: ["./manage.page.scss"],
})
export class ManagePage implements OnInit {
  order = {
    plant: "",
    size: "",
    harvest: "",
    water: undefined,
    heat: undefined,
    status: "not ready",
  };
  user: any;
  available: any;
  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private userService: UserServiceService,
    private sizeService: SizeServiceService
  ) {}

  ngOnInit() {
    this.order.size = this.route.snapshot.paramMap.get("size");
    console.log("done", this.order.size);

    this.order.plant = this.route.snapshot.paramMap.get("plantNo");
    console.log("done", this.order.plant);

    this.available = this.route.snapshot.paramMap.get("available");
    console.log("cargo", this.available);

    if (this.available <= 0) {
      this.nav.navigateBack("size/" + this.order.plant + "/" + true);
    }
  }
  Book() {
    this.userService.saveOrder(this.user, this.order);
    this.sizeService.deductFromCollection(this.order.plant, this.order.size);
    this.nav.navigateBack("home");
  }
}
