import axios from "axios";

export default {
    getPokemon: function(name){
        return axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
    },
    getSpeciesInfo: function(name){
        return axios.get("https://pokeapi.co/api/v2/pokemon-species/" + name);
    },
    getEvolutionChain: function(url){
        return axios.get(url);
    }
}