import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gym } from '../models/Gym';
import { Observable, throwError } from 'rxjs';
import { SearchResponse } from '../models/SearchResponse';
import { Pokemon } from '../models/Pokemon';
import { Nivel } from '../models/Nivel';

export interface pokemonResponse {
  sprites: {
    front_default: string
    front_shiny: string
  }
}


@Injectable({
  providedIn: 'root'
})
export class GymsService {

  gyms: Gym[] = []
  gymSel: Gym = new Gym()
  private urlApi: string = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20000"
  pokemons: Pokemon[] = []
  selpoke: Pokemon = new Pokemon()
  //pokResponse: pokemonResponse | undefined
  //imgurl: string = ''
  niveles: Nivel[] = []
  private urlNiveles: string = "https://sheets.googleapis.com/v4/spreadsheets/1xv0-KbybLDZX8j-VtAS-goMagHEcLlUxGur8f053KWo/values/niveles?key=AIzaSyC6vdsmxIL4bOU3LIShg-ceYIPxeUjYD3o"

  constructor(private clHttp: HttpClient) {
    this.getGymsJSON()
    this.getListPokemon()
    this.getNivelesJSON()
  }

  private getGymsJSON(): void {
    let urljs = "https://docs.google.com/spreadsheets/d/1xv0-KbybLDZX8j-VtAS-goMagHEcLlUxGur8f053KWo/gviz/tq?tqx=out:json"
    fetch(urljs)
      .then(res => res.text())
      .then(text => {
        let json = JSON.parse(text.substring(47).slice(0, -2))
        let datagyms = json.table.rows
        let skip = true
        let cons = 1
        for (const data of datagyms) {
          if (skip) {
            skip = false
            continue
          }
          let gym: Gym = new Gym(cons++, data.c[0].v, data.c[1].v, data.c[2].v, data.c[3].v)
          gym.getLat()
          gym.getLon()
          this.gyms.push(gym)
        }
      })
  }

  getAllGyms(): Gym[] {
    return this.gyms
  }

  setGymSel(gym: Gym) {
    this.gymSel = gym
  }

  getGymSel(): Gym {
    return this.gymSel
  }

  private getListPokemon(): void {
    this.clHttp.get<SearchResponse>(this.urlApi).subscribe(
      data => {
        let pkms: Pokemon[] = data.results
        this.pokemons = pkms
      },
      (err: HttpErrorResponse) => {
        this.handleError(err)
      }
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getResultPokemon(): Pokemon[] {
    return this.pokemons
  }

  setPokemon(selpoke: Pokemon): Observable<pokemonResponse> {
    this.selpoke = selpoke
    if (this.selpoke.name != '') {
      let url = `https://pokeapi.co/api/v2/pokemon/${this.selpoke.name}`
      return this.clHttp.get<pokemonResponse>(url)
    }
    else {
      return this.clHttp.get<pokemonResponse>('https://pokeapi.co/api/v2/pokemon/0/')
    }
  }

  private getNivelesJSON(): void {
    this.clHttp.get<SearchResponse>(this.urlNiveles).subscribe(
      data => {
        let js = JSON.stringify(data)
        let jso = JSON.parse(js)
        let ini = true
        jso.values.forEach((el: (string | undefined)[]) => {
          if (ini || el[3] == 'I') {
            ini = false
          } else {
            let nivel: Nivel
            nivel = new Nivel(el[0], el[1], el[2], el[3])
            this.niveles.push(nivel)
          }
        });
      },
      (err: HttpErrorResponse) => {
        this.handleError(err)
      }
    )    
  }
}
