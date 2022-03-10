import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Gym } from 'src/app/models/Gym';
import { GymsService } from 'src/app/services/gyms.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent implements OnInit {

  gym: Gym = new Gym()
  lat: string = ''
  lon: string = ''
  urlmap: string = ''
  urlmapsan: SafeResourceUrl = ''
  isformato: boolean = false
  valpgb: number = 66
  formulario: FormGroup
  formato: string = ''

  constructor(private gymServ: GymsService, private sanitizer: DomSanitizer, private formB: FormBuilder, private clpb: Clipboard) {
    this.formulario = formB.group(
      {
        jefe: [''],
        isshiny: [''],
        nivel: [''],
        color: [''],
        isclima: [''],
        ronda: [''],
        hora: [''],
      }
    )
  }

  ngOnInit(): void {
    this.gym = this.gymServ.getGymSel()
    if (this.gym != null) {
      this.lat = this.gym.getLat()
      this.lon = this.gym.getLon()
      let fact = 0.0018
      let latmax = String(parseFloat(this.lat) + fact)
      let latmin = String(parseFloat(this.lat) - fact)
      let lonmax = String(parseFloat(this.lon) + fact)
      let lonmin = String(parseFloat(this.lon) - fact)
      this.urlmap = "https://www.openstreetmap.org/export/embed.html?bbox=" + lonmax + "," + latmax + "," + lonmin + "," + latmin + "&layer=transportmap&marker=" + this.lat + "," + this.lon
      this.urlmapsan = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlmap);
    }

  }

  generaFormato() {
    this.isformato = true
    this.valpgb = 100
    let url = "https://www.openstreetmap.org/?mlat=" + this.gym.lat + "&mlon=" + this.gym.lon + "#map=18/" + this.gym.lat + "/" + this.gym.lon + "&layers=T"
    let datos = this.formulario.value
    let result = "*RAID POKEMON GO BARRANCABERMEJA*\n\n"
    let shiny = ''
    if (datos.isshiny) {
      shiny = " (Posible shiny ✨)"
    }
    let colorSimbol: string[] = []
    colorSimbol[0] = "💛";
    colorSimbol[1] = "💙";
    colorSimbol[2] = "❤";
    colorSimbol[3] = "";
    let indcol = 3
    if (datos.color != '') {
      indcol = datos.color
    }
    if (this.gym.paseex == 'S') {
      result += "*GIMNASIO DE INCURSIONES EX*\n";
    }
    if (datos.isclima) {
      result += "*(Potenciado por el clima)* \n";
    }
    result += "*Ronda " + datos.ronda + "*\n";
    result += "*Nivel:* " + datos.nivel + "\n";
    result += "*Raid Boss:* *" + datos.jefe.trim() + shiny + "*\n";
    result += "*Lugar:* " + this.gym.direccion + "\n";
    result += "*Gym:* " + this.gym.nombre + " " + colorSimbol[indcol] + "\n";
    result += "*Hora:* " + datos.hora + "\n";
    result += "*Coord:* " + this.gym.coordenadas + "\n";
    result += "*Favor confirmar participación y estar pendiente para entrar a la hora indicada*\n\n";
    result += "*URL mapa*: " + url
    this.formato = result
    this.copyText(this.formato)
  }

  private copyText(textToCopy: string) {
    this.clpb.copy(textToCopy);
  }

}
