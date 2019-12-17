import React, {Component} from "react";
import { List, ListItem } from "../List";

class Modal extends Component{
    

    onClose = event => {
        console.log("clicking exit on modal");
        this.props.onClose && this.props.onClose(event);
    }

    render(){

        console.log(this.props);
        console.log(JSON.stringify(this.props));
        if(!this.props.show){
            return null;
        }

        if(this.props.infoType === 'type'){
            console.log('displaying types');
            return (
                <div>
                    <h2>{this.props.infoType.toUpperCase()}</h2>
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
                            <h3>Error fetching type!</h3>
                        )}
                    <div>
                        <button onClick={event => {
                            this.onClose(event);
                        }}>Close</button>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'stats'){
            console.log('displaying stats');
            console.log(JSON.stringify(this.props.info));
            return (
                <div>
                    <h2>{this.props.infoType.toUpperCase()}</h2>
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
                            <h3>Error fetching type!</h3>
                        )}
                    <div>
                        <button onClick={event => {
                            this.onClose(event);
                        }}>Close</button>
                    </div>
                </div>
            );
        }
        else if(this.props.infoType === 'games'){
            console.log('displaying games');
            return (
                <div>
                    <h2>{this.props.infoType.toUpperCase()}</h2>
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
                            <h3>Error fetching type!</h3>
                        )}
                    <div>
                        <button onClick={event => {
                            this.onClose(event);
                        }}>Close</button>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <div>ERROR: No information to show!</div>
                    <div>
                        <button onClick={event => {
                            this.onClose(event);
                        }}>Close</button>
                    </div>
                </div>
            );
        }
    }
}

export default Modal;