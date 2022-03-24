import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Gym } from 'src/app/models/Gym';
import { GymsService } from 'src/app/services/gyms.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

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
  mensajeToast: string = ''
  valcant: string = '0'

  constructor(private gymServ: GymsService, private sanitizer: DomSanitizer, private formB: FormBuilder, private clpb: Clipboard, private router: Router) {
    this.formulario = formB.group(
      {
        jefe: [''],
        isshiny: [''],
        nivel: [''],
        color: [''],
        isclima: [''],
        ronda: [''],
        hora: [''],
        cantidad: [''],
      }
    )
  }

  ngOnInit(): void {
    this.gym = this.gymServ.getGymSel()
    if (this.gym != null && this.gym.id != 0) {
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
    else {
      this.router.navigate([''])
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
      shiny = " ✨"
    }
    let colorSimbol: string[] = []
    colorSimbol[0] = "💛"
    colorSimbol[1] = "💙"
    colorSimbol[2] = "❤"
    colorSimbol[3] = "🤍"
    let indcol = 3
    if (datos.color != '') {
      indcol = datos.color
    }
    let nivstr = ''
    switch (datos.nivel) {
      case '1':
        nivstr = '1️⃣'
        break
      case '3':
        nivstr = '3️⃣'
        break
      case '5':
        nivstr = '5️⃣'
        break
      case 'M':
        nivstr = 'Ⓜ️🧬'
        break
      default:
        nivstr = ''
        break
    }
    let horaatk = datos.hora
    let hora = horaatk.substr(0, 2)
    let min = horaatk.substr(3, 2)
    let mr = 'AM'
    if (hora > 12) {
      hora = hora - 12
      mr = 'PM'
    }
    else if (hora == 12) { mr = 'PM'; }
    horaatk = hora * 1 + ':' + min + ' ' + mr
    var conf = datos.cantidad
    if (conf == 0) {
      conf = '';
    }
    else {
      conf = '*Van ' + conf+'*';
    }
    if (this.gym.paseex == 'S') {
      result += "*GIMNASIO DE INCURSIONES EX*\n"
    }
    if (datos.isclima) {
      result += "*(Potenciado por el clima)* \n"
    }
    if (datos.ronda!=''){
      result += "*" + datos.ronda + "*\n"
    }    
    result += "*Nivel:* " + nivstr + "\n"
    result += "*Raid Boss:* *" + datos.jefe.trim() + shiny + "*\n"
    result += "*Lugar:* " + this.gym.direccion + "\n"
    result += "*Gym:* " + this.gym.nombre + " " + colorSimbol[indcol] + "\n"
    result += "*Hora:* " + horaatk + "\n"
    result += "*Coord:* " + this.gym.coordenadas + "\n"
    result += "*Favor confirmar participación y estar pendiente para entrar a la hora indicada*\n\n"
    result += "*URL mapa*: " + url + "*\n\n"
    result += conf
    this.formato = result
    this.mensajeToast = 'Formato copiado al portapapeles.'
    this.copyText(this.formato)
  }

  private copyText(textToCopy: string) {
    this.clpb.copy(textToCopy);
  }

  copyCoord(coord: string) {
    this.mensajeToast = 'Coordenadas copiada al portapapeles.'
    this.isformato = true
    this.clpb.copy(coord)
  }

  toastClose() {
    this.isformato = false
  }

}
