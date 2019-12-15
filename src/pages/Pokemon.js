import React, {Component} from 'react';
import '../App.js'
import { Input, TextArea, Formbtn } from '../components/Form';
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";

class Pokemon extends Component {

    state = {
        name: '',
        type: '',
        height: '',
        weight: ''
    }

    componentDidMount() {
        console.log("component did mount!");
        this.loadAPokemon();
    }

    loadAPokemon = () => {
        console.log("called loadapokemon");
        //let id = Math.random(Math.floor(Math.random() * 150));
        API.getPokemonById(12)
            .then(result => {
                    console.log(result.data.name);
                    this.setState({name: result.data.name, type: result.data.type, height: result.data.height, weight: result.data.weight})
                }
            )
            .catch(error => console.log(error));
        /**this.setState({ name: 'Charizard', type: 'Fire-Flying', height: 14, weight: 16 });**/
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col size='md-6'>
                        <Jumbotron>
                            <h1>Kanto Online Pokedex</h1>
                        </Jumbotron>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Results</h1>
                        </Jumbotron>
                        <List>
                            <ListItem>
                                <strong>
                                    Name: {this.state.name}
                                    <br></br>
                                    Type: {this.state.type}
                                    <br></br>
                                    Weight: {this.state.weight}
                                    <br></br>
                                    Height: {this.state.height}
                                </strong>
                            </ListItem>
                        </List>
                    </Col>
                </Row>
            </Container>
        );
    }



}


export default Pokemon;