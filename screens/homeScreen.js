import React from 'react';
import { StyleSheet, Text, View, Alert, Image, AsyncStorage } from 'react-native';
import { Card, Title } from 'react-native-paper';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            info: {
                cityName: 'empty', 
                temperature: 'empty', 
                humidity: 'empty', 
                description: 'empty', 
                icon: 'empty',
            }
        }; 
    }

    //apikey is: 97d3bc4e197255f65b51c2e0bd6d4e8c

    async getWeatherData(){
        
        currentCity = await AsyncStorage.getItem('cityKey'); 

        if(!currentCity){
            currentCity = 'Calgary'; 
        }

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=97d3bc4e197255f65b51c2e0bd6d4e8c`)
            .then(apiData => apiData.json())
            .then(apiDataJSON => this.setState({
                info:{
                    cityName: apiDataJSON.name, 
                    temperature: apiDataJSON.main.temp, 
                    humidity: apiDataJSON.main.humidity, 
                    description: apiDataJSON.weather[0].description, 
                    icon: apiDataJSON.weather[0].icon,
                }
            })

        ) .catch(error=>{Alert.alert('Error ' + error.message)}); 
        }

    componentDidMount(){
        this.getWeatherData(); 
    }


  render(){

    var iconURL = 'http://openweathermap.org/img/w/'+ this.state.info.icon + '.png';


  return (
    <View style={styles.container}>
      <Card style={styles.weatherCard}>
        <Card.Title titleStyle={styles.cityText} title={this.state.info.cityName}></Card.Title>
        <Image style={styles.weatherIcon} source={{uri: 'http://openweathermap.org/img/w/'+ this.state.info.icon + '.png'}}
        >   
        </Image>
        <Title style={styles.bottomText}>{this.state.info.description.toUpperCase()}</Title>
        <Title style={styles.bottomText}>Temperature: {this.state.info.temperature} °F</Title>
        <Title style={styles.bottomText}>Humidity: {this.state.info.humidity}% </Title>
        
      </Card>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  weatherCard: {
    marginTop: 50, 
    width: 280, 
    height: 320,
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderRightWidth: 1, 
    borderLeftWidth: 1, 
  },

  cityText: {
      marginTop: 15, 
      fontSize: 30, 
      textAlign: 'center'

  }, 

  weatherIcon: {
      height: 130, 
      width: 130, 
      alignSelf: 'center', 

  }, 

  bottomText: {
      marginBottom: 10, 
      alignSelf: 'center'

  },
});
