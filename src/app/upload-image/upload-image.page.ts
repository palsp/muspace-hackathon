import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserServiceService } from "../services/user-service.service";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.page.html",
  styleUrls: ["./upload-image.page.scss"],
})
export class UploadImagePage implements OnInit {
  uploadedFiles: Array<File>;
  userCollection: AngularFirestoreCollection<any>;
  resultAutoML: any = [];
  insideResultAutoML: any = [];
  displayName: any = [];
  confidentScore: any = [];
  toggler: boolean = false;
  imagePath: string = "";

  user: any;
  id: any;

  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get("userName");
    this.id = this.route.snapshot.paramMap.get("id");
    this.userCollection = this.userService.assignCollection(this.user);
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        "uploads[]",
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.http.post("/api/upload", formData).subscribe((response) => {
      console.log("response received is ", response);
      this.resultAutoML = response;
      this.imagePath = this.resultAutoML.uploadedPath;
      this.imagePath = "./../../../" + this.imagePath;
      this.insideResultAutoML = this.resultAutoML.result;
      this.displayName = this.insideResultAutoML.displayName;
      this.confidentScore = this.insideResultAutoML.classification.score;
      this.toggler = true;
      console.log(this.displayName, this.confidentScore);
    });
  }

  updateStatus() {
    this.userService.updateStatus(this.user, this.id, this.displayName);
  }
}
