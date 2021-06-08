import React, {Component} from "react";
import { List, ListItem, ModalList} from "../List";
import { Input, TextArea, FormBtn } from '../Form';
import "./Modal.css";

class Modal extends Component{
    

    onClose = event => {
        console.log("clicking exit on modal");
        this.props.onClose && this.props.onClose(event);
    }

    render(){
        if(!this.props.show){
            return null;
        }

        if(this.props.infoType === 'type'){
            return (
                <div className="modal-fade" role="dialog" tabindex="-1">
                    <div className={["modal-dialog", "modal-dialog-centered"].join(' ')} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.infoType.toUpperCase()}</h5>
                            </div>
                            <div className="modal-body">
                                {this.props.info.length ? (
                                    <ModalList>
                                        {this.props.info.map(type => (
                                            <ListItem key={type.type.name}>
                                                <strong>
                                                    {type.type.name}
                                                </strong>
                                            </ListItem>
                                        ))}
                                    </ModalList>
                                ) : (
                                    <h3>Error fetching Type!</h3>
                                )}
                                <br></br>
                                <div>
                                    <FormBtn onClick={event => {
                                        this.onClose(event);
                                    }}>Close</FormBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'stats'){
            return (
                <div className="modal-fade" role="dialog" tabindex="-1">
                    <div className={["modal-dialog", "modal-dialog-centered"].join(' ')} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.infoType.toUpperCase()}</h5>
                            </div>
                            <div className="modal-body">
                                {this.props.info.length ? (
                                    <ModalList>
                                        {this.props.info.map(stat => (
                                            <ListItem key={stat.stat.name}>
                                                <strong>
                                                    {stat.stat.name}: {stat.base_stat}
                                                </strong>
                                            </ListItem>
                                        ))}
                                    </ModalList>
                                ) : (
                                    <h3>Error fetching Stats!</h3>
                                )}
                                <br></br>
                                <div>
                                    <FormBtn onClick={event => {
                                        this.onClose(event);
                                    }} className="center">Close</FormBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'games'){
            return (
                <div className="modal-fade" role="dialog" tabindex="-1">
                    <div className={["modal-dialog", "modal-dialog-centered"].join(' ')} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.infoType.toUpperCase()}</h5>
                            </div>
                            <div className="modal-body">
                                {this.props.info.length ? (
                                    <ModalList>
                                        {this.props.info.map(game => (
                                            <ListItem key={game.version.name}>
                                                <strong>
                                                    {game.version.name}
                                                </strong>
                                            </ListItem>
                                        ))}
                                    </ModalList>
                                ) : (
                                    <h3>Error fetching Games!</h3>
                                )}
                                <br></br>
                                <div>
                                    <FormBtn onClick={event => {
                                        this.onClose(event);
                                    }} className="center">Close</FormBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'evolutionChain'){
            if(this.props.info === undefined || this.props.info.length === 0){
                return(
                    <div className="modal-fade" role="dialog" tabindex="-1">
                        <div className={["modal-dialog", "modal-dialog-centered"].join(' ')} role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{this.props.infoType.toUpperCase()}</h5>
                                </div>
                                <div className="modal-body">
                                <div>
                                    <div>No known Evolutions!</div>
                                    <br></br>
                                    <FormBtn onClick={event => {
                                        this.onClose(event);
                                    }} className="center">Close</FormBtn>
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
            else{


                let evolutionList = [];
                try{
                    if (this.props.info.species.name !== this.props.currPokemon && 
                        this.props.info.evolves_to[0].species.name !== this.props.currPokemon){
                        evolutionList.push(this.props.info.species.name);
                    }
                }catch(error){
                    evolutionList.push('No currently known Evolutions!');
                }
                try{
                    if (this.props.info.evolves_to[0].species.name !== this.props.currPokemon){
                        evolutionList.push(this.props.info.evolves_to[0].species.name);
                    }else{
                        evolutionList.push('No currently known Evolutions!');
                    }
                }catch(error){}
                
                return(

                    <div className="modal-fade" role="dialog" tabindex="-1">
                        <div className={["modal-dialog", "modal-dialog-centered"].join(' ')} role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{this.props.infoType.toUpperCase()}</h5>
                                </div>
                                <div className="modal-body">
                                    {evolutionList.length ? (
                                        <ModalList>
                                        {evolutionList.map(evolution => (
                                            <ListItem key={evolution}>
                                        <strong>
                                            {evolution}
                                        </strong>
                                            </ListItem>
                                        ))}
                                        </ModalList>
                                    ):(
                                        <h3>Error fetching Evolutions!</h3>
                                    )
                                }
                                    <br></br>
                                    <div>
                                        <FormBtn onClick={event => {
                                            this.onClose(event);
                                            }}className="center">Close</FormBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else{
            return (

                <div className="modal-fade" role="dialog" tabindex="-1">
                    <div className={["modal-dialog", "modal-dialog-centered"].join(' ')} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.infoType.toUpperCase()}</h5>
                            </div>
                            <div className="modal-body">
                                <div>ERROR: No information to show!</div>
                                <br></br>
                                <div>
                                    <FormBtn onClick={event => {
                                        this.onClose(event);
                                    }} className='toggle-button'>Close</FormBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Modal;