import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Gym } from 'src/app/models/Gym';
import { GymsService } from 'src/app/services/gyms.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.css']
})
export class GymsComponent implements OnInit {

  gyms: Gym[] = []
  isFound = false;
  search: string = ''
  gymsfound: Gym[] = []
  valpgb:number=33
 
  //@Output() addItem:EventEmitter<any> = new EventEmitter();

  constructor(private gymsrv: GymsService, private router:Router, private clpb: Clipboard) { }

  ngOnInit(): void {
    this.getAllGyms()
    this.valpgb = 33
  }

  getAllGyms() {
    this.gyms = this.gymsrv.getAllGyms()
  }

  buscarGym() {
    if (this.search.trim() == '') {
      this.isFound = false
      this.gymsfound = []
    }
    else {
      let gyms: Gym[] = this.gyms.filter(x => x.nombre.toUpperCase().includes(this.search.toUpperCase()) || x.direccion.toUpperCase().includes(this.search.toUpperCase()))
      this.isFound = gyms.length > 0
      if (this.isFound) {
        this.gymsfound = gyms
      }
      else {
        this.gymsfound = []
      }
    }
  }

  selectGym(gym:Gym){
    this.gymsrv.setGymSel(gym)
    this.router.navigate(['/formato'])
  }

  copyCoord(coord:string){
    this.clpb.copy(coord)
  }

}
