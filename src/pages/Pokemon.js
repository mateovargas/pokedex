import React, {Component} from 'react';
import '../App.js'
import { Input, TextArea, FormBtn } from '../components/Form';
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem} from "../components/List";

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
        stats: []
    }

    componentDidMount() {
        console.log("component did mount!");
        this.loadAPokemon();
    }

    loadAPokemon = () => {
        console.log("called loadapokemon");
        let id = Math.floor(Math.random() * 807);
        console.log(id);
        API.getPokemonById(id)
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

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col size="md-6 sm-12">
                        <form>
                            <h1>Search for a Pokemon in the field below!</h1>
                            <Input
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                name="name"
                                placeholder="Name (Required)"
                            />
                            <FormBtn
                                disabled={!(this.state.name)}
                                onClick={this.handleFormSubmit}
                            >
                                Search that Pokemon!
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Pokedex!</h1>
                            <strong><h2>{this.state.name.toUpperCase()}</h2></strong>
                            <img src={this.state.sprites.front_default}></img>
                            <img src={this.state.sprites.back_default}></img>
                        </Jumbotron>
                        <List>
                            <ListItem>
                                <strong>
                                    Species: {this.state.species.name}
                                </strong>
                            </ListItem>
                            <ListItem>
                                <strong>Types:</strong>
                                {this.state.type.length ? (
                                    <List>
                                        {this.state.type.map(type => (
                                            <ListItem key={type.type.name}>
                                                <strong>
                                                    {type.type.name}
                                                </strong>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <h3>Error fetching type!</h3>
                                )}
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
                                {this.state.stats.length ? (
                                    <List>
                                        {this.state.stats.map(stat => (
                                            <ListItem key={stat.stat.name}>
                                                <strong>
                                                    {stat.stat.name}: {stat.base_stat}
                                                </strong>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                        <h3>Error fetching type!</h3>
                                    )}
                            </ListItem>
                            <ListItem>
                                <strong>Appears In:</strong>
                                {this.state.games.length ? (
                                    <List>
                                        {this.state.games.map(game => (
                                            <ListItem key={game.version.name}>
                                                <strong>
                                                    {game.version.name}
                                                </strong>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                        <h3>Error fetching type!</h3>
                                    )}
                            </ListItem>
                        </List>
                    </Col>
                </Row>
            </Container>
        );
    }



}


export default Pokemon;