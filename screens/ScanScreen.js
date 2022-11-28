import * as React from 'react';
import {useState} from 'react';
import { Text, View, TouchableOpacity, StyleSheet , ScrollView, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';

export default function ScanScreen() {

const [collectedData, setCollectedData] = useState("");
const [scan, setScan] = useState(true)



  const onPress = () => setScan(true)
  const CollectData = (data) =>{
    d = JSON.parse(data)
    setCollectedData(d)
    console.log(collectedData)
    setScan(false)


  }
  const onPressAdd =  async () =>{
      firestore().collection('Products').add(collectedData)
      Alert.alert('Alert', 'Product has been added to the database',[
        {text: 'Ok', onPress: () => console.log('alert closed')}
      ])
  }

    return (
        
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {scan && <Text  style={{color:"tomato", fontSize:20, marginBottom:5 }}>
            Find a product Qr code and scan it!
          </Text>}
        {scan &&
        <QRCodeScanner
        showMarker = {false}
        reactivate = {true}
        onRead = {(data) => CollectData(data.data)}
        cameraContainerStyle = {{alignSelf: "center",}}
        cameraStyle={{overflow:'hidden', position: 'absolute', borderRadius:55, height: 500, width: 350,
         alignSelf: 'center', justifyContent: 'center' ,}}
        flashMode={RNCamera.Constants.FlashMode.off}
        
      />}
      {scan == false &&
      <View>
        
        <Text style={{color:"tomato", fontSize:20, marginBottom:25, marginTop:25, }}>Product information</Text>
       <View style={styles.infoCOntainer}>
        <Text style={{color:"tomato"}}>Name: {collectedData.name}</Text>
        <Text style={{color:"tomato"}}>Price: {collectedData.price}</Text>
        <Text style={{color:"tomato"}}>Location: {collectedData.location}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{color:"tomato"}}>New Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressAdd} style={styles.button}>
          <Text style={{color:"tomato"}}>Add to DataBase</Text>
        </TouchableOpacity>

        </View>
}
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      borderRadius:18,
      paddingHorizontal:25,
      marginBottom:25
      
    },
    infoCOntainer:{
      borderColor:"#DDDDDD",
      borderWidth: 2,
      backgroundColor:"#DDDDDD",
      padding:12,
      borderRadius:20,
      marginBottom:25
    },
    scrollViewContainer:{
flex:1,
       justifyContent: 'center',
        alignItems: 'center' 

    }
  });

  