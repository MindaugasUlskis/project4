import { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNBounceable from "@freakycoder/react-native-bounceable";
export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  async function fetchProducts() {

    setIsLoading(true);
    productData = []
    const querySnapshot = await firestore().collection("Products").get();
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      productData.push({
        name: doc.data().name,
        location: doc.data().location,
        price: doc.data().price,
        key: doc.id
      });
    });

    setProducts(productData);
    setIsLoading(false)

  }
  useEffect(() => { fetchProducts() }, [])

  if (isLoading == true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
    )
  }
  const filterHandler = () => {
    fetchProducts()
  }
  const deletePress = (key) => {

    console.log(key)
    firestore()
      .collection('Products')
      .doc(key)
      .delete()
      .then(() => {
        console.log('Product Deleted');
      });
    fetchProducts()
  }

  return (
    <View style={{ height: "100%", paddingTop: 10 }}>
      <Text style={{ color: "tomato", fontSize: 20, marginBottom: 5, alignSelf: "center" }}>
        Product List
      </Text>
      <ScrollView>

        {products.map(item =>
          <View style={styles.container}>
            

            <View>
            <Text style={{ color: "tomato", paddingTop: 20 }}>
              Product: {item.name}
            </Text>
            <Text style={{ color: "tomato" }}>
              Price: {item.price}
            </Text>
            <Text style={{ color: "tomato" }}>
              Location: {item.location}
            </Text>
            </View>
            <View>
            <RNBounceable style={styles.cont} onPress={() => deletePress(item.key)}>
              <Text style={{ color: "tomato", }}>Delete</Text>
            </RNBounceable>
            </View>
          </View>
        )}

      </ScrollView>
      <RNBounceable style={styles.refreshBtn} onPress={() => filterHandler()}>
        <Text style={{ color: "#DDDDDD" }}>Refresh</Text>
      </RNBounceable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: "5%",
    height: 120,
    flexDirection: "row",
    justifyContent:"space-between"

  },
  refreshBtn: {
    position: "absolute",
    width: 90,
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
    marginRight: 20,
    top: "95%",
    alignSelf: 'center',
    borderWidth: 1
  },
  cont: {
    width: 75,
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    borderColor: "tomato",
    borderWidth: 1,
    marginRight: 20,
    marginTop: 30,

  }
})