import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NavController } from "@ionic/angular";

export interface UserService {
  order: {
    plant: string;
    size: string;
    harvest: string;
    water: number;
    heat: number;
    status: string;
  };
}
@Injectable({
  providedIn: "root",
})
export class UserServiceService {
  userName: any;
  user: Observable<any>;
  userCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private nav: NavController) {}

  assignCollection(userName) {
    return this.afs.collection("Users/" + userName + "/current");
  }

  getCollection(userName) {
    this.userCollection = this.assignCollection(userName);
    this.user = this.userCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ); //end

    return this.user;
  }

  saveOrder(userName, orderDict) {
    this.userCollection = this.assignCollection(userName);
    this.userCollection.add(orderDict);
  }

  updateStatus(userName, id, status) {
    this.user = this.getCollection(userName);
    this.userCollection.doc(id).update({ status: status });
    this.nav.navigateBack("home");
  }
}
