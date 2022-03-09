import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Gym } from 'src/app/models/Gym';
import { GymsService } from 'src/app/services/gyms.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent implements OnInit {

  gym:Gym = new Gym()
  lat:string=''
  lon:string=''
  urlmap:string=''
  urlmapsan:SafeResourceUrl=''
  isformato:boolean=false
  valpgb:number=66

  constructor(private gymServ:GymsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.gym = this.gymServ.getGymSel()    
    if (this.gym != null){      
      this.lat = this.gym.getLat()
      this.lon = this.gym.getLon()
      let fact = 0.0018
      let latmax = String(parseFloat(this.lat)+fact)
      let latmin = String(parseFloat(this.lat)-fact)
      let lonmax = String(parseFloat(this.lon)+fact)
      let lonmin = String(parseFloat(this.lon)-fact)
      this.urlmap = "https://www.openstreetmap.org/export/embed.html?bbox="+lonmax+","+latmax+","+lonmin+","+latmin+"&layer=transportmap&marker="+this.lat+","+this.lon
      this.urlmapsan = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlmap);
    }

  }

  generaFormato(){
    this.isformato=true
    this.valpgb=100
  }

}
