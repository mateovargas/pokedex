import axios from "axios";

export default {
    getPokemon: function(name){
        return axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
    }
}