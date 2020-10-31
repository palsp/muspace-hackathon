import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SizeServiceService {
  size: any;
  result: Observable<any>;
  It = [];
  sizeCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {}

  assignCollection(plantNo) {
    this.sizeCollection = this.afs.collection("Size/" + plantNo + "/size");
    return this.sizeCollection;
  }

  getCollection(plantNo) {
    this.sizeCollection = this.assignCollection(plantNo);
    this.result = this.sizeCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ); // end
    this.result.subscribe((a) => {
      this.It = a;
      console.log("result", this.result);
    });
    return this.result;
  }

  deductFromCollection(plantNo, Size) {
    this.result = this.getCollection(plantNo);
    for (let itm of this.It) {
      if (itm["size"] == Size) {
        this.sizeCollection
          .doc(itm["id"])
          .update({ available: itm["available"] - 1 });
      }
    }
  }
}
