import React from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { TextInput, Card, List } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class SearchScreen extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            inputText: '', 
            citiesArray: [],
        }; 
    }

    fetchCities(text){
        this.setState({inputText: text}); 
        fetch(`http://autocomplete.wunderground.com/aq?query=${this.state.inputText}`)
            .then(cityObj=>cityObj.json())
            .then(cityObjJSON=>{
                this.setState({
                    citiesArray: cityObjJSON.RESULTS.slice(0,9)
                })
            })
    }

    async cardClick(name){
        console.log('List Item Clicked');
        this.setState({inputText: name})
        await AsyncStorage.setItem('cityKey', this.state.inputText); 
        this.props.navigation.navigate('Current City'); 
        
    }

    async buttonClick(){
        console.log('Button Clicked');
        await AsyncStorage.setItem('cityKey', this.state.inputText)
        this.props.navigation.navigate('Current City'); 
    }


  render(){
      cityCard = <Card style={styles.card}></Card>
      if(this.state.citiesArray.length > 0){
          cityCard = this.state.citiesArray.map(cityObjJSON=>{
              return(
                  <Card onPress={() => this.cardClick(cityObjJSON.name)} style={styles.card} key={cityObjJSON.name}>
                      <List.Item title={cityObjJSON.name}></List.Item>
                  </Card>
              )
          })
      }

  return (
    <View style={styles.container}>
        <Text style={styles.introText}>Please enter the name of your city below!</Text>

        <TextInput 
        style={styles.textInputContainer}
        value={this.state.inputText}
        onChangeText={text => this.fetchCities(text)}
        >
        </TextInput>

        <ScrollView>
            {cityCard}

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.buttonClick()}>
                <Text style={styles.buttonText}>Choose City</Text>
            </TouchableOpacity>
        </ScrollView>
        
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 25, 
  },

  introText: {
      fontSize: 17, 
      fontWeight: "bold",  


  }, 

  textInputContainer: {
      borderColor: 'black', 
      borderWidth: 1, 
      textAlign: 'center',  
      height: 40, 
      width: 280, 
  }, 

  card: {
      width: 280, 
      borderTopWidth: 1, 
      borderBottomWidth: 1, 
      borderRightWidth: 1, 
      borderLeftWidth: 1, 
  }, 

  buttonContainer: {
      height: 40, 
      width: 140, 
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1, 
      marginTop: 10, 
      marginLeft: 60, 
      borderRadius: 8,
      backgroundColor: '#75DA8B'
  }, 

  buttonText: {
      fontWeight: 'bold',
  }



});
