import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Pressable, TextInput } from 'react-native';
import Fooditem from './Components/Fooditem';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MaterialIcons} from '@expo/vector-icons';


export function MainScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [cost, onChangeNumber] = useState(null);
  const [food, onChangeText] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodInObject, setFoodInObject] = useState([]);


  const handleAddFood = () => {
    setFoodItems([...foodItems, [food,cost]])
    setFoodInObject([...foodInObject, {food,cost}])
  }

  const foodOutInObject = () => {
    let outPutString = JSON.stringify(foodInObject)
    return <Text> {outPutString} </Text>
  }

  const removeFoodItem = (index) => {
    let copyList = [...foodItems];
    let copy2List = [...foodInObject];
    copyList.splice(index, 1);
    copy2List.splice(index, 1);
    setFoodItems(copyList);
    setFoodInObject(copy2List);
    foodOutInObject();
  }

  return (
    <SafeAreaView style={styles.container}>

      <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modalVisible} 
        >
        <View style={styles.modalMain}>
          <View style={styles.modalTop}></View>
          <View style={styles.modalBottom}>
            <View style={styles.bottomMain}>
              <View style={styles.titleClose}>
                <Text style={styles.modalHeading}>Add Food</Text>
                <MaterialIcons
                  name='close'
                  size={24}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View style={styles.bottomForm}>
                <View style={styles.inputBoxContainer}>
                  <Text style={styles.inputHeading}>Food Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={food}
                    placeholder="Enter Food name"
                  />
                </View>
                <View>
                  <Text style={styles.inputHeading}>Food Price</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={cost}
                    placeholder="Enter Food Price"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.finalFoodList}>
                  <TouchableOpacity style={styles.mainFinalButton} onPress={() => {setModalVisible(false); 
                    onChangeText('');
                    onChangeNumber(null);
                    handleAddFood();
                    foodOutInObject(); 
                    }}>
                    <View style={styles.finalButton}>
                      <Text style={styles.finalButtonText}>Add Food Item</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modal2Visible}
        >
          <View style={styles.newPage}>
            <MaterialIcons
              name='close'
              size={24}
              onPress={() => setModal2Visible(false)}
            />
            <View style={styles.outPutInPage}>
              {
                foodOutInObject()
              }
            </View>
          </View>
        </Modal>


      <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modalEditVisible} 
        >
        <View style={styles.modalMain}>
          <View style={styles.modalTop}></View>
          <View style={styles.modalBottom}>
            <View style={styles.bottomMain}>
              <View style={styles.titleClose}>
                <Text style={styles.modalHeading}>Edit Food</Text>
                <MaterialIcons
                  name='close'
                  size={24}
                  onPress={() => setModalEditVisible(false)}
                />
              </View>
              <View style={styles.bottomForm}>
                <View style={styles.inputBoxContainer}>
                  <Text style={styles.inputHeading}>New Food Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={food}
                    placeholder="Enter New Food name"
                  />
                </View>
                <View>
                  <Text style={styles.inputHeading}>New Food Price</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={cost}
                    placeholder="Enter New Food Price"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.finalFoodList}>
                  <TouchableOpacity style={styles.mainFinalButton} onPress={() => {setModalEditVisible(false); 
                    onChangeText('');
                    onChangeNumber(null); 
                    handleAddFood();
                    foodOutInObject();
                    }}>
                    <View style={styles.finalButton}>
                      <Text style={styles.finalButtonText}>Edit Food Item</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>  



      {/* <StatusBar style="auto" /> */}
    <View style={styles.foodList}>
      {/* <Text style={styles.heading}>Food List</Text> */}
      <View style={styles.foodItem}>
        {/* <Fooditem text={"Food Item-1"} cost={"100"} />
        <Fooditem text={"Food Item-2"} cost={"200"} /> */}
        {
          foodItems.map((food, index) => {
            return (
              <View style={styles.boxMain}>
                <Fooditem key={index} food={food[0]} cost={food[1]} />
                <MaterialIcons
                  name='edit'
                  size={25}
                  onPress={() => {setModalEditVisible(true); removeFoodItem();}}
                />
                <MaterialIcons
                  name='delete'
                  size={30}
                  onPress={() => removeFoodItem()}
                />
              </View>
            )
          })
        }
      </View>
      <View style={styles.addFoodItem}>
        <TouchableOpacity style={styles.mainAddButton} onPress={() => setModalVisible(true)}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+    Add Food Item</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.finalFoodList}>
      <TouchableOpacity style={styles.mainFinalButton} onPress={() => setModal2Visible(true)}>
        <View style={styles.finalButton}>
          <Text style={styles.finalButtonText}>Final Food List</Text>
        </View>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Food List'}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({

  outPutInPage: {
    marginVertical: 20,
  },

  boxMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between',
  },

  newPage: {
    padding: 20,
    margin: 20,
  },

  //Modal Page

  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 12,
  },

  bottomForm: {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },


  titleClose: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  modalHeading: {
    fontSize: 20,
    fontWeight: '900',
  },

  inputHeading: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 5,
  },

  bottomMain: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalTop: {
    height: '55%',
  },

  modalBottom: {
    height: '45%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',  
  },

  //MainPage

  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  foodList: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },


  //Food Items List Area


  foodItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'gray',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 10,
    width: '100%',
  },


  //Add Food Items Button


  addFoodItem: {
    paddingVertical: 10,
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
  },

  mainAddButton: {
    width: '90%',
  },

  addButton: {
    marginVertical: 2,
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },



// Final Food Items Button



  finalFoodList: {
    width: '90%',
    paddingVertical: 10,
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: 'green',
    marginBottom: 40,
  },

  mainFinalButton: {
    width: '90%',
  },

  finalButton: {
    marginVertical: 2,
  },

  finalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  }

});
