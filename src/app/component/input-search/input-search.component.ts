import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { GymsService } from 'src/app/services/gyms.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  search: string = ''
  listpokes: Pokemon[] = []
  pokeSearch: Pokemon[] = []
  @Output() selpokemon:EventEmitter<Pokemon> = new EventEmitter()

  constructor(private gymsrv: GymsService) {     
  }
  

  ngOnInit() {
    this.getAllPokemon()
  } 

  getAllPokemon(){
    this.listpokes = this.gymsrv.getResultPokemon()
  }

  buscarPoke(){
    if (this.search.length>=3){
      if (this.listpokes.length==0){
        this.getAllPokemon()        
      }
      let pokes: Pokemon[] = this.listpokes.filter(x => x.name.toUpperCase().includes(this.search.toUpperCase()))
      this.pokeSearch = pokes      
    }    
  } 

  selectedPoke(poke: Pokemon){    
    //this.gymsrv.setPokemon(poke)    
    this.selpokemon.emit(poke)
  }

}