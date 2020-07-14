import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableHighlight, Modal, TextInput } from 'react-native';
import styles from './styles.js';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-community/async-storage';


// var BTNS = [
  // {
  //   id: "0",
  //   title: "First Item",
  //   audio: audio
  // },
// ];


// async function checkStorage(){
//   if(await AsyncStorage.getItem('BTNS') == null){
//     console.log(null);
    
//     BTNS = [];
//   }

//   else{
//     BTNS = JSON.parse(await AsyncStorage.getItem('BTNS'));
//     console.log("Tem botoes criados");
//   }
// }

// checkStorage();



// Função de tocar áudio do botão
async function playSong(item){
  var t = item.audio.uri;
  
  const soundObject = new Audio.Sound();
  soundObject.setOnPlaybackStatusUpdate();
  await soundObject.loadAsync({uri: t});
  await soundObject.playAsync();
}

// Botão
const Item = ({ item }) => (
  <View style={styles.btn_bg}>
    <TouchableHighlight
      underlayColor="darkred"
      onPress={() => playSong(item)}
      style={styles.btn}>
    <View style={styles.btn_text_container}>
      <Text style={styles.btn_text}>{item.title}</Text>
    </View>
    </TouchableHighlight>
  </View>
);


const StartPage = () => {
  const [selectedId, setSelectedId] = useState(null);

  // Renderizando botão
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  // Renderizando botão (da modal deletar)
  const renderDeleteItem = ({ item }) => {
    return (
      <DeleteItem
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };


  const [modalVisible, setModalVisible] = useState(false);

  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  const [btnName, setBtnName] = useState("");

  const [audio, setAudio] = useState();

  const [BTNS, setBTNS] = useState([]);


  useEffect(() => {
    AsyncStorage.getItem('BTNS', (err, result) => {
      if(result == null){
        console.log(null);
        
        setBTNS([]);
      }
      else{
        AsyncStorage.getItem('BTNS', (err, result) => {
          console.log("Tem botoes criados");
          setBTNS(JSON.parse(result))
        });
      }
    })
  }, [])
  
 



  // Botão
  const DeleteItem = ({ item }) => (
    <View style={styles.btn_bg_delete}>
      <TouchableHighlight
        underlayColor="darkred"
        onPress={() => deleteBtn(item)}
        style={styles.btn_delete}>
      <View style={styles.btn_text_container}>
        <Text style={styles.btn_text_delete}>{item.title}</Text>
      </View>
      </TouchableHighlight>
    </View>
  );
  

  // Função de deletar botão
  async function deleteBtn(item){
    for(var i = 0; i < BTNS.length; i++){
      if(BTNS[i].id === item.id){
        var aux;
        setBTNS((BTNS) => aux = BTNS);
        aux.splice(i, 1)
        await setBTNS(aux);
        setModalDeleteVisible(false);

        await AsyncStorage.setItem('BTNS', JSON.stringify(aux));
      }
    }
  }


  // Confirmando botão criado
  async function confirmAudio(){
    if(audio != undefined && btnName != ""){
      if(audio.type != "cancel"){
        setModalVisible(false); 
        var aux;
        await setBTNS((BTNS) => aux = BTNS);
        aux.push({id:String(BTNS.length), title: btnName, audio: audio})
        // await setBTNS((BTNS) => [...BTNS, ]);

        setBtnName("");
        setAudio(undefined);

        await AsyncStorage.setItem('BTNS', JSON.stringify(aux))
      }

      else{
        alert("Selecione um áudio! Ou grave um novo!")
      }
    }

    else{
      alert("Preencha o formulário corretamente!");
    }
  }
  


  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Modal Criar novo botão */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); setBtnName(""); setAudio(undefined);
        }}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>

            <Text style={styles.modal_title}>Criar Novo Botão</Text>

            <Text style={styles.modal_subtitle}>Nome:</Text>
            <TextInput value={btnName} style={styles.modal_input} onChangeText={text => setBtnName(text)}/>


            {/* Audio picker */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableHighlight
                underlayColor="white"
                onPress={async() => setAudio(await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory: true}))}
                style={styles.modal_pick_btn}>
                <View style={styles.btn_text_container}>
                  <Text style={styles.modal_cancel_btn_text}>Escolha um áudio</Text>
                </View>
              </TouchableHighlight>
            </View>

            {/* Buttons confirm and cancel */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableHighlight
                underlayColor="rgba(255,255,255,0.5)"
                onPress={() => {setModalVisible(false); setBtnName(""); setAudio(undefined);}}
                style={styles.modal_cancel_btn}>
                <View style={styles.btn_text_container}>
                  <Text style={styles.modal_cancel_btn_text}>Cancel</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="rgba(255,255,255,0.5)"
                onPress={confirmAudio}
                style={styles.modal_confirm_btn}>
                <View style={styles.btn_text_container}>
                  <Text style={styles.btn_text}>Confirm</Text>
                </View>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </Modal>



      {/* Modal Deletar botão */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDeleteVisible}
        onRequestClose={() => {
          setModalDeleteVisible(false);
        }}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>

            <Text style={styles.modal_title}>Deletar Botão</Text>

          
            {/* Audio Buttons Render */}
            <FlatList
              numColumns={3}
              style={{marginVertical: 20, flexDirection: 'row', alignContent: 'center', alignSelf: 'center'}}
              data={BTNS}
              renderItem={renderDeleteItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />


            {/* Buttons confirm and cancel */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableHighlight
                underlayColor="rgba(255,255,255,0.5)"
                onPress={() => setModalDeleteVisible(false)}
                style={[styles.modal_cancel_btn, {marginRight: 0}]}>
                <View style={styles.btn_text_container}>
                  <Text style={styles.modal_cancel_btn_text}>Fechar</Text>
                </View>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </Modal>



      {/* Title */}
      <Text style={styles.title}>Audio Buttons!</Text>


      {/* Audio Buttons Render */}
      <FlatList
        numColumns={3}
        style={{marginTop: 20}}
        data={BTNS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />


      {/* Buttons */}
      <View style={{flexDirection: 'row'}}>
      {/* Add Buttons Button */}
      <TouchableHighlight
        underlayColor="darkgray"
        onPress={() => setModalVisible(true)}
        style={styles.plus_btn}>
        <View style={styles.btn_text_container}>
          <Text style={styles.plus_btn_text}>+</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor="darkgray"
        onPress={() => setModalDeleteVisible(true)}
        style={[styles.plus_btn, {marginLeft: 10}]}>
        <View style={styles.btn_text_container}>
          <Text style={styles.plus_btn_text}>-</Text>
        </View>
      </TouchableHighlight>
      </View>

    </View>
  );
};

export default StartPage;