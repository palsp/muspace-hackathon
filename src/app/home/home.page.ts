import { Component } from "@angular/core";
import { ViewChild, ElementRef } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { UserServiceService } from "../services/user-service.service";
import { OrderService } from "../services/order.service";

declare var google: any;
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  map: any;
  mapMarkers = [];
  checkMark: any;
  infowindows = [];
  user: Observable<any>;
  users = [];
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
      icon: this.image,
    },
    {
      location: "plant2",
      lat: 5,
      long: 170,
      icon: this.image,
    },
    {
      location: "plant3",
      lat: -50,
      long: 100,
      icon: this.image,
    },
    {
      location: "plant4",
      lat: 30,
      long: -150,
      icon: this.image,
    },
    {
      location: "plant5",
      lat: 10,
      long: 20,
      icon: this.image,
    },
  ];

  @ViewChild("map", { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(
    private userService: UserServiceService,
    private orderService: OrderService
  ) {}

  ionViewDidEnter() {
    this.checkMark = null;
    this.showMap();
    this.user = this.userService.getCollection("x");
    console.log(this.user);
    this.user.subscribe((res) => {
      this.users = res;
      this.checkList(this.users);
    });
  }

  showMap() {
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 1,
        streetViewControl: false,
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
      this.mapMarkers.push(mapMarker);
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      '<div id = "content">' +
      '<h2 id = "firstHeading"></h2>' +
      "<h1>" +
      marker.location +
      "</h1>" +
      '<ion-button id = "size" href = "size/' +
      marker.location +
      '">View</ion-button>' +
      "</div>";

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener("click", () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, "domready", () => {
        document.getElementById("size").addEventListener("click", () => {
          console.log("click");
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
  checkList(order) {
    //console.log('check',this.check)
    for (let item of order) {
      //console.log('status',item['status'] != "ready");
      if (item["status"] !== "Grown") {
        const index = this.users.indexOf(item);
        if (index > -1) {
          this.users.splice(index);
        }
      }
    }
    this.orderService.setData(42, this.users);
    //console.log('check',this.users)
    if (this.users.length != 0) {
      this.orderService.setData(42, this.users);
      this.checkMark = true;
      console.log("user", this.users);
    }
  }
}
