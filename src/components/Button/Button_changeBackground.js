import React ,{Component} from "react";
import { Text ,StyleSheet,TouchableHighlight,View} from "react-native";
import * as global from './global'

// This component can be used to change the background of the button onPress
export default class Button extends Component {
  
  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
  }
  _onPress(){
    
      if(global.button){
        global.button.setState({ pressStatus: false });
      }
      if(!this.state.pressStatus)
      {
        global.button = this;
        this.setState({ pressStatus: true });
        this.props.onPress();   
      }
      else{
          global.button = null;
          this.setState({ pressStatus: false });  
      }
    }
  render() {
    return (
        <TouchableHighlight
          onPress = {this._onPress.bind(this)}
          activeOpacity={1}
          style={ this.state.pressStatus ? styles.buttonPress : styles.button }
        >
          <Text style={ this.state.pressStatus ? styles.buttonTextPress : styles.buttonText }>{this.props.title}</Text>
        </TouchableHighlight>
      )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF872C'
  },
  buttonTextPress: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  buttonPress: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF872C',
  },
});