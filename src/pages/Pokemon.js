import React, {Component} from 'react';
import '../App.js'
import { Input, TextArea, FormBtn } from '../components/Form';
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem} from "../components/List";
import Modal from "../components/Modal";
import './Pokemon.css';

class Pokemon extends Component {

    state = {
        id: '',
        name: '',
        type: [],
        height: '',
        weight: '',
        species: '',
        sprites: {},
        order: '',
        location: [],
        games: [],
        stats: [],
        show: false,
        modalInfo: {},
        infoType: '',
        evolutionChain: {}
    }

    componentDidMount() {
        this.loadAPokemon();
    }

    loadAPokemon = () => {

        let id = Math.floor(Math.random() * 807);
        API.getPokemon(id)
            .then(result => {
                    console.log(result.data.name);
                    console.log(JSON.stringify(result.data.types));
                    this.setState({name: result.data.name, type: result.data.types, height: result.data.height, 
                        weight: result.data.weight, sprites: result.data.sprites, id: result.data.id, species: 
                        result.data.species, order: result.data.order, location: result.data.location_area_encounters,
                        games: result.data.game_indices, stats: result.data.stats});
                    this.loadEvolutionChain(this.state.id);
                }
            )
            .catch(error => console.log(error));
    }

    loadEvolutionChain = (name) => {

        console.log("called loadEvolution Chain");
        if(this.state.id === ''){
            console.log("Error Finding Evolution Chain!");
            return 1;
        }
        else{
            console.log("id is: " + this.state.id);
            console.log("name is: " + this.state.name);
            API.getSpeciesInfo(this.state.name)
                .then(result => {
                    API.getEvolutionChain(result.data.evolution_chain.url)
                        .then(result => {
                            this.setState({
                                evolutionChain: result.data.chain.evolves_to[0]
                            })
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        }
    }

    handleInputChange = event => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.name){
            API.getPokemon(this.state.name.toLowerCase())
                .then(result => {
                    this.setState({
                        name: result.data.name, type: result.data.types, height: result.data.height,
                        weight: result.data.weight, sprites: result.data.sprites, id: result.data.id, species:
                            result.data.species, order: result.data.order, location: result.data.location_area_encounters,
                        games: result.data.game_indices, stats: result.data.stats
                    });

                    this.loadEvolutionChain(this.state.name);
                })
                .catch(error => console.log(error));
        }
    }

    keyPressed = event => {
        if(event.key === "Enter"){
            this.handleFormSubmit(event);
        }
    }

    showModal = (info) => {

        if(info === "type"){
            this.setState({
                modalInfo: this.state.type,
                infoType: 'type'
            });
        }
        else if(info === "stats"){
            this.setState({
                modalInfo: this.state.stats,
                infoType: 'stats'
            });
        }
        else if(info ==="games"){
            this.setState({
                modalInfo: this.state.games,
                infoType: 'games'
            })
        }
        else if(info === "evolutionChain"){
            this.setState({
                modalInfo: this.state.evolutionChain,
                infoType: 'evolutionChain'
            })
        }

        this.setState({
            show: !this.state.show
        });
    };

    

    render(){
        return(
            <div id='main-contents'>
            <Container fluid>
                <Row>
                    <Col size="md-12 sm-12 lg-12 xl-12">
                        <Jumbotron>
                                <div id='jumbotron-contents'>
                                    <h1>Pokedex!</h1>
                                    <strong><h2>{this.state.name.toUpperCase()}</h2></strong>
                                    <div class="img-container">
                                        <img src={this.state.sprites.front_default}></img>
                                        <img src={this.state.sprites.back_default}></img>
                                    </div>
                                </div>
                        </Jumbotron>
                    </Col>
                </Row>
                <Modal show={this.state.show} onClose={this.showModal} info={this.state.modalInfo}
                    infoType={this.state.infoType} currPokemon={this.state.name} />
                <Row>
                    <Col size="md-6 sm-6 lg-6 xl-6">
                            <form>
                                <div class='form-content'>
                                    <h3>Search for a Pokemon in the field below!</h3>
                                    <Input
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        name="name"
                                        placeholder="Name (Required)"
                                        onKeyPress={this.keyPressed}
                                    />
                                    <FormBtn
                                        disabled={!(this.state.name)}
                                        onClick={this.handleFormSubmit}
                                    >
                                        Search that Pokemon!
                                    </FormBtn>
                                </div>
                            </form>
                    </Col>
                    <Col size="md-6 sm-6 lg-6 xl-6">
                        <List>
                            <ListItem>
                                <strong>Types: </strong>
                                <button onClick={event => {
                                    this.showModal('type');
                                    }} className="btn btn-warning">View Types</button>
                            </ListItem>
                            <ListItem>
                                <strong>
                                    Weight (In hectograms): {this.state.weight}
                                </strong>
                            </ListItem>
                            <ListItem>
                                <strong>
                                    Height (In decimeters): {this.state.height}
                                </strong>
                            </ListItem>
                            <ListItem>
                                <strong>Base Stats: </strong>
                                <button onClick={event => {
                                    this.showModal('stats');
                                    }} className="btn btn-warning">View Stats</button>
                            </ListItem>
                            <ListItem>
                                <strong>Evolves into: </strong>
                                <button onClick={event => {
                                    this.showModal('evolutionChain');
                                    }} className="btn btn-warning">View Evolutions </button>
                            </ListItem>
                            <ListItem>
                                <strong>Appears In: </strong>
                                <button onClick={event => {
                                    this.showModal('games');
                                    }} className="btn btn-warning">View Game Appearances</button>
                            </ListItem>
                        </List>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }



}


export default Pokemon;