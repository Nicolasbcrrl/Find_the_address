import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState} from 'react';

export default function App() {
  const[region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    LongitudeDelta: 0.0221,
  });
  const[research, setResearch] = useState('');

  const fetchlocalisation = () => {
    if (!research) {
      Alert.alert('Please enter a keyword');
      return;
    }
    fetch("https://www.mapquestapi.com/geocoding/v1/address?key=pWBMs7bqfHmTAojNXOLdm3RQg9wvi6P1&location=" + research)
      .then(response => response.json())
      .then(data => setRegion({...region, latitude: data.results[0].locations[0].latLng.lat, longitude: data.results[0].locations[0].latLng.lng}))
      .catch(err => Alert.alert('Error', err.message))
  }
console.log(region);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, height:"80%"}}
        region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
        }}/>
      </MapView>
      <View style={{height: "15%"}}>
        <TextInput
          style={{fontSize:18, width:200}}
          placeholder='keyword'
          onChangeText={text => setResearch(text)}
        />
        <Button
          title="show"
          onPress={fetchlocalisation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});