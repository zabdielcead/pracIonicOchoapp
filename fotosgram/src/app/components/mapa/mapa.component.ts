import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa', {static: true}) mapa;
  // para poner la ubicacion es en opciones de desarrollador more tools -> sensors -> Geolocation

  constructor() { }

  ngOnInit() {
    console.log(this.coords);

    const latlng = this.coords.split(',');
    const lat = Number(latlng[0]);
    const lng = Number(latlng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZGllbGNlYWQiLCJhIjoiY2p6Yms3ZnJtMDBiaDNmcXNnYTZobGkyMiJ9.e6lr4n-fXyxnR3ndc8l17w';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
          .setLngLat( [lng, lat] )
          .addTo( map );
  }

}
