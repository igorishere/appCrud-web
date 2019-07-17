import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { crud } from '../interface/crud';
import { item } from '../classe/item';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService implements crud{
  

  constructor(
    private firestore: AngularFirestore
  ) { }
  
  //Inserting the new item in the Items collection
  //get the id of the last saved item and put this in the LastSavedItem Collection
  create(itemName: string) {
     
    this.firestore.collection<item>("Items").add({
      name: itemName,
      id: this.firestore.createId(),
      modified: Date.now()
    });

    this.firestore.doc("LastSavedItem/1").update(
      {
        itemName: itemName 
      }
    )
  }
  
  read(){
    var mainCollection: AngularFirestoreCollection<item> = this.firestore.collection("Items",ref=> ref.orderBy('modified'));
    return mainCollection.snapshotChanges();
  }

  update(idItem,newItemName: string) {
    this.firestore.doc(`Items/${idItem}`).update(
      {
        name: newItemName
      }
    )
  }

  delete(idItem: string) {
    var itemDoc = this.firestore.doc<item>(`Items/${idItem}`);
    itemDoc.delete();
  }


  getLastSavedItem(){
    return this.firestore.doc("LastSavedItem/1").valueChanges();
  }
}
