import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {Auth,signInWithEmailAndPassword} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {


  constructor(private firestore: Firestore,private auth:Auth) {
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

  loadPassword(siteId:string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, {idField: 'id'})
  }

  updatePassword(siteId:string,passwordId:string,date:object){
    const  docInstant = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return updateDoc(docInstant,date);
  }

  deletePassword(siteId:string,passwordId:string){
    const  docInstant = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return deleteDoc(docInstant);
  }

  //login method
  login(email:string,password:string){
    return signInWithEmailAndPassword(this.auth,email,password)
  }





}
