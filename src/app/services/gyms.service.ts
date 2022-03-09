import { Injectable } from '@angular/core';
import { Gym } from '../models/Gym';

@Injectable({
  providedIn: 'root'
})
export class GymsService {

  gyms: Gym[] = []
  gymSel: Gym = new Gym()
  
  constructor() { 
    this.getGymsJSON()
  }

  private getGymsJSON(): void {
    let urljs = "https://docs.google.com/spreadsheets/d/1xv0-KbybLDZX8j-VtAS-goMagHEcLlUxGur8f053KWo/gviz/tq?tqx=out:json"
    fetch(urljs)
      .then(res => res.text())
      .then(text => {
        let json = JSON.parse(text.substring(47).slice(0, -2))
        let datagyms = json.table.rows
        let skip = true
        let cons = 0
        for (const data of datagyms) {
          if (skip){
            skip = false
            continue
          }
          let gym:Gym = new Gym(cons++, data.c[0].v, data.c[1].v, data.c[2].v, data.c[3].v)
          gym.getLat()
          gym.getLon()
          this.gyms.push(gym)          
        }                
    })
  }

  getAllGyms(): Gym[]{
    return this.gyms
  }

  setGymSel(gym:Gym){
    this.gymSel = gym
  }

  getGymSel(): Gym{
    return this.gymSel
  } 
}
