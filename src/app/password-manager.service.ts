import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {


  constructor(private firestore: Firestore) {
  }

  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');

    return addDoc(dbInstance, data)
  }

  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, {idField: 'id'})
  }

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }


  //passwords Queries
  addPassword(data: object,siteId:string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPassword(data: object,siteId:string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, {idField: 'id'})
  }
}
