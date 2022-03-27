import { Pokemon } from "./Pokemon"

export interface SearchResponse{

    count: number
    next: number | null
    previous: number | null     
    results: Pokemon[] 

}