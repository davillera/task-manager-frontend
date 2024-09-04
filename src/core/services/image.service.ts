import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  private http = inject(HttpClient);
  private apiURL = environment.apiUrl

  getImage(imageId: any) {
    return this.http.get(`${this.apiURL}/images/${imageId}`)
  }

  uploadImage(formData: FormData){
    return this.http.post(`${this.apiURL}/images`, formData)
  }

  deleteImage(imageId: any){
    return this.http.delete(`${this.apiURL}/images/${imageId}`)
  }

  updateImage(formData: FormData){
    console.log(formData);
    return this.http.put(`${this.apiURL}/images/${formData}`, formData)
  }
}
