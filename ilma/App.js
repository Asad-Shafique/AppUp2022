import React, { useEffect , useState } from "react";
import { View, Text , Button, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';



const App = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log("fIRESTORE");
    
  });

  const getuser = async () => {
    console.log("getUser");
    await firestore()
      .collection('datas')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let data = []
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data())
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
        console.log("data array : "+ data);
        setUsers(data)  
      });
      
  }

  const printuser =  () => {
    console.log("print User");
     console.log( "users" + JSON.stringify(users));
 
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>hhello app</Text>
      <TouchableOpacity onPress={()=> getuser()  }>
        <Text>press me </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> printuser()  }>
        <Text>press me </Text>
      </TouchableOpacity>
    </View>
  )
}

export default App