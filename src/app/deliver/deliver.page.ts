import { Component, OnInit } from "@angular/core";
import { ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { AlertController, NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import { UserServiceService } from "../services/user-service.service";
declare var google: any;
@Component({
  selector: "app-deliver",
  templateUrl: "./deliver.page.html",
  styleUrls: ["./deliver.page.scss"],
})
export class DeliverPage {
  map: any;
  infowindows: any = [];
  userCollection: AngularFirestoreCollection<any>;
  users: any;
  usersArray = [];
  image = {
    url:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",

    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
  markers: any = [
    {
      location: "plant1",
      lat: 30,
      long: -120,
    },
    {
      location: "plant2",
      lat: 5,
      long: 170,
    },
    {
      location: "plant3",
      lat: -50,
      long: 100,
    },
    {
      location: "plant4",
      lat: 30,
      long: -150,
    },
    {
      location: "plant5",
      lat: 10,
      long: 20,
    },
  ];
  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private nav: NavController
  ) {}

  ionViewDidEnter() {
    this.showMap();
    if (this.route.snapshot.data["special"]) {
      this.users = this.route.snapshot.data["special"];
    }
  }

  showMap() {
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 1,
        //streetViewControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ["moon"],
        },
      }
    );
    const moonMapType = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom): string {
        const normalizedCoord = getNormalizedCoord(coord, zoom);
        const bound = Math.pow(2, zoom);
        return (
          "https://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw" +
          "/" +
          zoom +
          "/" +
          normalizedCoord.x +
          "/" +
          (bound - normalizedCoord.y - 1) +
          ".jpg"
        );
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      // @ts-ignore TODO(jpoehnelt) 'radius' does not exist in type 'ImageMapTypeOptions'
      radius: 1738000,
      name: "Moon",
    });
    this.map.mapTypes.set("moon", moonMapType);
    this.map.setMapTypeId("moon");

    this.addMarkersToMap(this.markers);

    function getNormalizedCoord(coord, zoom) {
      const y = coord.y;
      let x = coord.x;

      // tile range in one direction range is dependent on zoom level
      // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
      const tileRange = 3 << zoom;

      // don't repeat across y-axis (vertically)
      if (y < 0 || y >= tileRange) {
        return null;
      }

      // repeat across x-axis
      if (x < 0 || x >= tileRange) {
        x = ((x % tileRange) + tileRange) % tileRange;
      }

      return { x: x, y: y };
    }
  }
  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.lat, marker.long);
      let mapMarker = new google.maps.Marker({
        position: position,
        location: marker.location,
        latitude: marker.lat,
        longitude: marker.long,
        icon: marker.icon,
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      '<div id = "content">' +
      '<h2 id = "firstHeading"></h2>' +
      "<p>" +
      marker.location +
      "</p>" +
      '<ion-button id = "select" ' +
      '">View</ion-button>' +
      "</div>";

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener("click", () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, "domready", () => {
        document.getElementById("select").addEventListener("click", () => {
          console.log("click");
          marker.setMap(null);
          marker = new google.maps.Marker({
            position: marker.position,
            location: marker.location,
            latitude: marker.lat,
            longitude: marker.long,
            icon: this.image,
          });
          marker.setMap(this.map);
        });
      });
    });
    this.infowindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infowindows) {
      window.close();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Complete",
      buttons: ["OK"],
    });

    await alert.present();
    //let result = await alert.onDidDissmiss();
    this.updataUserData("x");
    this.nav.navigateBack("home");
  }

  updataUserData(User) {
    this.userCollection = this.userService.assignCollection(User);
    for (let user of this.users) {
      this.userCollection.doc(user["id"]).delete();
    }
  }
}
