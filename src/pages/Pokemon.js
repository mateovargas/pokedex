import React, {Component} from 'react';
import '../App.js'
import { Input, TextArea, FormBtn } from '../components/Form';
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem} from "../components/List";
import Modal from "../components/Modal";

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
        infoType: ''
    }

    componentDidMount() {
        console.log("component did mount!");
        this.loadAPokemon();
    }

    loadAPokemon = () => {
        console.log("called loadapokemon");
        let id = Math.floor(Math.random() * 807);
        console.log(id);
        API.getPokemon(id)
            .then(result => {
                    console.log(result.data.name);
                    console.log(JSON.stringify(result.data.types));
                    this.setState({name: result.data.name, type: result.data.types, height: result.data.height, 
                        weight: result.data.weight, sprites: result.data.sprites, id: result.data.id, species: 
                        result.data.species, order: result.data.order, location: result.data.location_area_encounters,
                        games: result.data.game_indices, stats: result.data.stats})
                }
            )
            .catch(error => console.log(error));
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
        else{
            this.setState({
                modalInfo: this.state.games,
                infoType: 'games'
            })
        }

        this.setState({
            show: !this.state.show
        });
    };

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Pokedex!</h1>
                            <strong><h2>{this.state.name.toUpperCase()}</h2></strong>
                            <img src={this.state.sprites.front_default}></img>
                            <img src={this.state.sprites.back_default}></img>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6 sm-12">
                        <Container>
                            <form>
                                <h1>Search for a Pokemon in the field below!</h1>
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
                            </form>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6 sm-12"> 
                        <Modal show={this.state.show} onClose={this.showModal} info={this.state.modalInfo} infoType={this.state.infoType} />
                        <Container>
                            <List>
                                <ListItem>
                                    <strong>
                                        Species: {this.state.species.name}
                                    </strong>
                                </ListItem>
                                <ListItem>
                                    <strong>Types:</strong>
                                    <button onClick={event => {
                                        this.showModal('type');
                                    }}>View Types</button>
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
                                    <strong>Base Stats:</strong>
                                    <button onClick={event => {
                                        this.showModal('stats');
                                    }}>View Stats</button>
                                </ListItem>
                                <ListItem>
                                    <strong>Appears In:</strong>
                                    <button onClick={event => {
                                        this.showModal('games');
                                    }}>View Game Appearances</button>
                                </ListItem>
                            </List>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }



}


export default Pokemon;