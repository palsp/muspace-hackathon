import { Component, OnInit } from "@angular/core";
import { SizeServiceService } from "../services/size-service.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-size",
  templateUrl: "./size.page.html",
  styleUrls: ["./size.page.scss"],
})
export class SizePage implements OnInit {
  size: Observable<any>;
  plantNo: any;
  constructor(
    private sizeService: SizeServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.plantNo = this.route.snapshot.paramMap.get("plantNo");
    console.log("no", this.plantNo);
    this.size = this.sizeService.getCollection(this.plantNo);
    console.log("size", this.size);
  }
}
