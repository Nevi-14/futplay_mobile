import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController, ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { UsuariosService } from './usuarios.service';

let IMAGE_DIR = null;
 
interface LocalFile {
  fileName: string;
  path: string;
  data: string;
  oldFileName:string;
}
@Injectable({
  providedIn: 'root'
})
export class GestorImagenesService {
  newElement:boolean = false;
  images: LocalFile[] = [];
imageURL =  "https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/Nelson-33.png";
  constructor(
    public http: HttpClient,
    private plt: Platform,
    public alertasService: AlertasService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuariosService:UsuariosService
  ) { }

  
  getURL( api: string, location:string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api +  environment.locationParam + location 
 
    return URL;
  }
  getURL2( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api 
 
    return URL;
  }
    //
    private   putFotoUsuario( Cod_Usuario ,Avatar,Foto){
      let URL = this.getURL2( environment.actualizaFotoUsuarioURL);
      URL = URL + environment.codUsuarioParam + Cod_Usuario + environment.AvatarParam + Avatar + environment.FotoParam + Foto;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
   
      return this.http.put( URL, options );
    }
    private   putFotoEquipo( Cod_Equipo ,Avatar,Foto){
      let URL = this.getURL2( environment.actualizaFotoEquipoURL);
      URL = URL + environment.codEquipoParam + Cod_Equipo + environment.AvatarParam + Avatar + environment.FotoParam + Foto;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
   
      return this.http.put( URL, options );
    }
    actualizaFotoEquipo(Cod_Equipo ,Avatar,Foto ){
      this.putFotoEquipo( Cod_Equipo ,Avatar,Foto).subscribe(
        resp => {

        }, error => {
          console.log('error')
        }
      )
    }
     actualizaFotoUsuario(Cod_Usuario ,Avatar,Foto ){
      this.putFotoUsuario( Cod_Usuario ,Avatar,Foto).subscribe(
        resp => {
      
        }, error => {
          console.log('error')
        }
      )
    }

  private imagePost(data, location, oldFileName){


    let URL = this.getURL(environment.gestorImagenesURL, location);
     URL = URL + environment.oldFileName+ oldFileName
    const options   = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        
      }
    };
  
    console.log(data, 'data cofere', JSON.stringify(data))
  
    return this.http.post(URL,data, options);
  
  
  }


  syncimagePost(data, location, oldFileName){
  
   return this.imagePost(data, location, oldFileName).toPromise();
    
  }

  cerrarModal(valor){
    this.modalCtrl.dismiss({
      'data':valor
    });
  }
  async loadFiles(customFileName) {
    this.images = [];
 
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Datos',
    });
    await loading.present();
 
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
      this.loadFileData(result.files, customFileName);
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });

 
  }
 
  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[], customFileName) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
 
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
 let file = {
  fileName: f,
  path: filePath,
  data: `data:image/jpeg;base64,${readFile.data}`,
  oldFileName: customFileName
}
      this.images.push(file);

  if(!this.newElement){
    this.startUpload( this.images[0])
  }
    }
  }
 
  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
 

  async selectImage(source:string, customFileName:string, location:string, newElement:boolean) {
    IMAGE_DIR = location;

    this.newElement = false;
    this.newElement = newElement;
  
    this.reset();
   this.loadFiles(customFileName)


    let cameraSource  = null;
    // Camera, Photos or Prompt!;
          switch(source){
           case 'camera':
    cameraSource = CameraSource.Camera 
          break;
    
       case 'photos':
           cameraSource = CameraSource.Photos 
           break;
    
       case 'prompt':
           cameraSource = CameraSource.Prompt 
           break;
    
           default : 
           cameraSource = CameraSource.Photos 
           break;
           
          }
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: cameraSource
    });
 
    if (image) {
  

    
    return    this.saveImage(image, customFileName)
    }
}
// Create a new file from a capture image
async saveImage(photo: Photo, customFileName:string) {
  const base64Data = await this.readAsBase64(photo);

  const fileName = new Date().getHours() + new Date().getMilliseconds() + '.'+ photo.format;
 // alert([fileName,'name'])
  const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
      
  });

  // Reload the file list
  // Improve by only loading for the new image and unshifting array!
  this.loadFiles(customFileName);
   return  fileName
    
}
 // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
 private async readAsBase64(photo: Photo) {
  if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
          path: photo.path
      });

      return file.data;
  }
  else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
  }
}
async reset(){
    
  let fileEntries = await Filesystem.readdir({
    directory: Directory.Data,
    path: `${IMAGE_DIR}`

  })

  fileEntries.files.map(async f => {

    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${f}`
  });
  })
}
// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

// Convert the base64 to blob data
// and create  formData with it
async startUpload(file: LocalFile) {
  const response = await fetch(file.data);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob,file.fileName);


  this.syncimagePost(formData,IMAGE_DIR, file.oldFileName).then(resp=>{
/**
 *     this.modalCtrl.dismiss({
      'data':true
    },null,IMAGE_DIR)
 */
this.reset();
    console.log(resp,'resp')
    this.images = [];

  })
 

 // this.uploadData(formData);
}



async deleteImage(file: LocalFile) {
  let fileName = file.oldFileName
  await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
  });
  this.loadFiles(fileName);
 // this.presentToast('Archivo Removido');
}



}
