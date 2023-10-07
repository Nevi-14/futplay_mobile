import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {
  LoadingController,
  Platform,
  ToastController,
  ModalController,
  AlertController,
  ActionSheetController,
  ActionSheetButton,
} from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { EquiposService } from './equipos.service';
import { TranslateService } from '@ngx-translate/core';

let IMAGE_DIR = null;

interface LocalFile {
  fileName: string;
  path: string;
  data: string;
}
@Injectable({
  providedIn: 'root',
})
export class GestorEquipoImagenesService {
  newElement: boolean = false;
  images: LocalFile[] = [];
  avatarActual = null;
  avatar = null;
  index = 0;
  post = false;
  constructor(
    public http: HttpClient,
    private plt: Platform,
    public alertasService: AlertasService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public equiposService: EquiposService,
    public actionSheetCtrl: ActionSheetController,
    private translateService: TranslateService
  ) {}

  cerrarModal(valor) {
    this.modalCtrl.dismiss({
      data: valor,
    });
  }
  async loadFiles() {
    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('LODING_DATA'),
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    })
      .then(
        (result) => {
          this.loadFileData(result.files);
        },
        async (err) => {
          // Folder does not yet exists!
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data,
          });
        }
      )
      .then((_) => {
        loading.dismiss();
      });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
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
      };
      this.images.push(file);

      if (this.post) {
        this.startUpload();
      }
    }
  }
  async alertaCamara() {
    const normalBtns: ActionSheetButton[] = [
      {
        text: this.translateService.instant('CAMERA'),
        icon: 'camera-outline',
        handler: () => {
          this.selectImage('camera', 'camera', false);
        },
      },
      {
        text: this.translateService.instant('PHOTOS'),
        icon: 'images-outline',
        handler: () => {
          this.selectImage('photos', 'camera', false);
        },
      },
      {
        text: this.translateService.instant('CANCEL'),
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translateService.instant('OPTIONS'),
      cssClass: 'left-align-buttons',
      buttons: normalBtns,
      mode: 'ios',
    });

    await actionSheet.present();
  }

  async selectImage(source: string, location: string, newElement: boolean) {
    IMAGE_DIR = location;

    this.newElement = false;
    this.newElement = newElement;

    this.reset();
    this.loadFiles();

    let cameraSource = null;
    // Camera, Photos or Prompt!;
    switch (source) {
      case 'camera':
        cameraSource = CameraSource.Camera;
        break;

      case 'photos':
        cameraSource = CameraSource.Photos;
        break;

      case 'prompt':
        cameraSource = CameraSource.Prompt;
        break;

      default:
        cameraSource = CameraSource.Photos;
        break;
    }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: cameraSource,
    });

    if (image) {
      this.saveImage(image);
    }
  }
  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName =
      new Date().getHours() + new Date().getMilliseconds() + '.' + photo.format;
    // alert([fileName,'name'])
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }
  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
  async reset() {
    this.index = 0;
    this.avatar = null;
    this.avatarActual = 0;
    //  this.images = [];

    let fileEntries = await Filesystem.readdir({
      directory: Directory.Data,
      path: `${IMAGE_DIR}`,
    });

    fileEntries.files.map(async (f) => {
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: `${IMAGE_DIR}/${f}`,
      });
    });
  }
  getURL(api: string) {
    let test: string = '';
    if (!environment.prdMode) {
      test = environment.TestURL;
    }
    const URL = environment.preURL + test + environment.postURL + api;
    return URL;
  }
  private imagePost(data, Cod_Usuario) {
    let URL = this.getURL(environment.postFotoEquipoURL);
    URL = URL + Cod_Usuario;
    const options = {
      headers: {
        enctype: 'multipart/form-data;',
        Accept: 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers':
          'Authorization, Origin, Content-Type, X-CSRF-Token',
      },
    };
    return this.http.post(URL, data, options);
  }

  syncImagePost(data, Cod_Usuario) {
    return this.imagePost(data, Cod_Usuario).toPromise();
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  // Convert the base64 to blob data
  // and create  formData with it
  async startUpload() {
    const response = await fetch(this.images[0].data);
    const blob = await response.blob();
    const formData = new FormData();

    formData.append('image', blob, this.images[0].fileName);

    this.alertasService.presentaLoading(
      this.translateService.instant('UPLOADING_IMAGE')
    );
    this.equiposService.equipo.equipo.Avatar = false;

    this.syncImagePost(
      formData,
      this.equiposService.equipo.equipo.Cod_Equipo
    ).then(
      (resp: any) => {
        this.equiposService.equipo.equipo = resp.equipo;
        this.alertasService.loadingDissmiss();
        this.reset();
        this.images = [];
        this.post = true;
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('ACTION_COMPLETED')
        );
      },
      (error) => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('SOMETHING_WENT_WRONG')
        );
      }
    );
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadFiles();
  }
}
