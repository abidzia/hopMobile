import React, { Component } from "react";
import { Dimensions,Alert,ScrollView,StyleSheet,TouchableOpacity, Text,Button, TextInput,  View } from 'react-native';
import MapView from 'react-native-maps';
import Trip from './Trip';
import haversine from 'haversine';
const {width , height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height

const LATTITUDE_DELTA=0.0922
const LONGITUDE_DELTA = LATTITUDE_DELTA* ASPECT_RATIO
let id= 0;
export default class MapNavigation extends Component {
  constructor(props){
    super(props);

  let watchId =  navigator.geolocation.watchPosition((position)=>{ 
    //  let distance= 0;
    //  if(this.state.previousCoordinate){
    //    distance = this.state.distance + haversine(
    //      this.state.previousCoordinate, position.coords);
    //       this.distanceInfo.setState({value: distance});
    //  }
    //   this.speedInfo.setState({value : position.coords.speed});
    //   let x = position.coords.heading;
    
    //   if((x>0 && x<=23)|| (x>338 && x<=360))
    //       this.directionInfo.setState({value: 'N'});
    //   else if((x>23 && x<=65))
    //     this.directionInfo.setState({value: 'NE'});
    //   else if((x>65 && x<=110))
    //      this.directionInfo.setState({value: 'E'});
    //   else if((x>110 && x<=155))
    //       this.directionInfo.setState({value: 'SE'});
    //       else if((x>155 && x<=203))
    //     this.directionInfo.setState({value: 'S'});
    //     else if((x>203 && x<=248))
    //     this.directionInfo.setState({value: 'SW'});
    //     else if((x>248 && x<=293))
    //     this.directionInfo.setState({value: 'W'});
    //     else if((x>293 && x<=338))
    //     this.directionInfo.setState({value: 'NW'});
          

    this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ],
    //    previousCoordinate: position.coords,
      //   distance
        });

      }, null , {distanceFilter : 10});
    
    this.state = {markers:[], watchId};
   setInterval(() =>{
    this.distanceInfo.setState({value:Math.random()*100});
    this.speedInfo.setState({value:Math.random()*15});
    this.directionInfo.setState({
     value:this.directionInfo.state === 'N'? 'NW':'N'});
    }, 1000);
  }
    componentWillUnMount(){
          navigator.geolocation.stopWatch(this.state.watchId);
    }

    addMarker(region){
      let now = (new Date).getTime();
      if(this.state.ladAddedMarker > now -5000){return;}
    
    this.setState({
        markers: [
          ...this.state.markers,{
            coordinate:region,
            key:id++
          }
        ],
        ladAddedMarker: now
  });
  }
  
  render() {
    return (
      <View style={{flex:1}}>
      <MapView style={styles.map}
      showsUserLocation
      followsUserLocation
      initialRegion={{
        latitude: 33.681536,
        longitude: 72.986558,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      >
      <MapView.Polyline 
      coordinates= {this.state.markers.map((marker) =>marker.coordinate)}
       strokeWidth={5}
      />
      </MapView>
       <View style={styles.infoWrapper}>
           <Trip title="Distance" unit="km"
           ref={(info)=> this.distanceInfo = info}/>   
           <Trip title="Speed" unit="km/h"
           ref={(info)=> this.speedInfo = info}/>   
           <Trip title="Direction" value="NE"
           ref={(info)=> this.directionInfo = info}/>   
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   position: 'absolute',
   top: 0,
   left:0,
   bottom:0,
   right:0,
   justifyContent:'flex-end',
   alignItems: 'center'    
  },
  infoWrapper:{
    position: 'absolute',
    top: 0,
    left:0,
    bottom:0,
    right:0,
    flexDirection:'row',
    flex:1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'orange'
  
  },
  radius:{
    height:50,
    width:50,
    borderColor:'rgba(o, 122, 255, 0.1)',
    borderRadius: 50/2 ,
    borderWidth:1,
    borderColor:'rgba(0, 112 ,255, 0.3)',
    alignItems:'center',
    justifyContent:'center'
  },
  marker:{
        height:20,
        width: 20,
        borderRadius:20/2,
        borderWidth:3,
        borderColor:'white',
        overflow:'hidden',
        backgroundColor:'#007AFF'
      
      }

});
