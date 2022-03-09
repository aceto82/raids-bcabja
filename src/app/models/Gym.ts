export class Gym {

    id: number
    nombre: string
    direccion: string
    coordenadas: string
    paseex: string
    lat:string=''
    lon:string=''


    constructor(id:number=0, nombre:string = "" , direccion:string = "", coord:string = "", pasex="" ){
        this.id = id
        this.nombre = nombre
        this.direccion = direccion
        this.coordenadas = coord
        this.paseex = pasex
        if (this.coordenadas.trim()!=''){
            this.getLat()
            this.getLon()
        }
    }

    getLat():string{        
        let cd:string = this.coordenadas
        this.lat = cd.substring(0,cd.indexOf(','))
        return this.lat
    }

    getLon():string{
        let cd:string = this.coordenadas
        this.lon = cd.substring(cd.indexOf(',')+2)
        return this.lon
    }    
}