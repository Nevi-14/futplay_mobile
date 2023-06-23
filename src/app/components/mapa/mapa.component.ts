import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as  mapboxgl from 'mapbox-gl';
// https://docs.mapbox.com/mapbox-gl-js/api/
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  styles:[
    `
  
   div {
      height:300px;
     width:100%;
     margin: 0px;
  
    }


    `
  ]
})
export class MapaComponent implements   AfterViewInit {
  @Input() lngLat: [number,number] = [0,0]
  @ViewChild('mapa') divMapa!:ElementRef
  constructor() { }

 
  ngAfterViewInit(): void {
    
    console.log(this.lngLat)
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom:15,
        interactive:true
      });
  
      mapa.addControl(new mapboxgl.NavigationControl());
      mapa.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          trackUserLocation: true
      }));

      
      mapa.on('load', () => {
        mapa.resize();
        });
        
     new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);   
      
  }
}