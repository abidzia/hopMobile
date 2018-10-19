import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

export default class Trip extends Component {
    formatValue(){
        return [this.state.value.toFixed(2), this.props.unit].join ('');
    }
    constructor(props){
        super(props);
        this.state = {value: this. props.value};}
        
formatValue(){
    return this.state.value;
}
    
    render() {
        let value = this.state.value ? this.formatValue(): '-';
        return (
            <View style={[styles.runInfoWrapper,{flex:1, flexDirection: 'column-reverse'}]}>
                <Text style={styles.runInfoTitle}>{this.props.title.toUpperCase()}</Text>
                <Text style={styles.runInfoValue}>{value}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
  runInfoWrapper: {
      paddingVertical: 15
  },
  runInfoTitle: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#666'
},  runInfoValue: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    paddingVertical: 5
}

});