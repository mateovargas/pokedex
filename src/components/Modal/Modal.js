import React, {Component} from "react";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from '../Form';
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
                <div className="center">
                    <h2 className="center">{this.props.infoType.toUpperCase()}</h2>
                    {this.props.info.length ? (
                        <List>
                            {this.props.info.map(type => (
                                <ListItem key={type.type.name}>
                                    <strong>
                                        {type.type.name}
                                    </strong>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>Error fetching Type!</h3>
                        )}
                    <div>
                        <FormBtn onClick={event => {
                            this.onClose(event);
                        }}>Close</FormBtn>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'stats'){
            return (
                <div className="center">
                    <h2 className="center">{this.props.infoType.toUpperCase()}</h2>
                    {this.props.info.length ? (
                        <List>
                            {this.props.info.map(stat => (
                                <ListItem key={stat.stat.name}>
                                    <strong>
                                        {stat.stat.name}: {stat.base_stat}
                                    </strong>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>Error fetching Stats!</h3>
                        )}
                    <div>
                        <FormBtn onClick={event => {
                            this.onClose(event);
                        }} className="center">Close</FormBtn>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'games'){
            return (
                <div className="center">
                    <h2 className="center">{this.props.infoType.toUpperCase()}</h2>
                    {this.props.info.length ? (
                        <List>
                            {this.props.info.map(game => (
                                <ListItem key={game.version.name}>
                                    <strong>
                                        {game.version.name}
                                    </strong>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>Error fetching Games!</h3>
                        )}
                    <div>
                        <FormBtn onClick={event => {
                            this.onClose(event);
                        }} className="center">Close</FormBtn>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'evolutionChain'){
            if(this.props.info.length === 0){
                return(
                    <div className="center" >
                        <h2 className="center">No known Evolutions!</h2>
                        <div>
                            <FormBtn onClick={event => {
                                this.onClose(event);
                            }} className="center">Close</FormBtn>
                        </div >
                    </div >
                );
            }
            else{
            console.log('evolution chain is: \n' + JSON.stringify(this.props.info, undefined, 4));

            let evolutionList = [];
            evolutionList.push(this.props.info.name);
            console.log('evolList is: ' + evolutionList.toString());
            return(
                <div className = "center" >
                    <h2 className="center">{this.props.infoType.toUpperCase()}</h2>
                    { this.props.info.length ? (
                    <List>
                        {this.props.info.map(evolution => (
                            <ListItem key={evolution.species.name}>
                                <strong>
                                    {evolution.species.name}
                                </strong>
                            </ListItem>
                        ))}
                    </List>
                ):(
                        <h3>Error fetching Evolutions!</h3>
                    )
                    }
                        <div>
                            <FormBtn onClick={event => {
                            this.onClose(event);
                            }}className="center">Close</FormBtn>
                        </div>
                    </div>
                );
            }
        }
        else{
            return (
                <div>
                    <div>ERROR: No information to show!</div>
                    <div>
                        <FormBtn onClick={event => {
                            this.onClose(event);
                        }} className='toggle-button'>Close</FormBtn>
                    </div>
                </div>
            );
        }
    }
}

export default Modal;