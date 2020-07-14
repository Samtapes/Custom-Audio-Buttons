import React from 'react';
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: "#fff",
    marginTop: Constants.statusBarHeight + 20,
    fontSize: 30
  },

  btn_bg: {
    width: 120,
    height: 120,
    backgroundColor: 'gray',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },

  btn: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 100,
  },

  btn_text_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn_text: {
    color: '#ffffff',
    textAlign: 'center'
  },


  plus_btn: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 90
  },

  plus_btn_text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16
  },


  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },


  modalView: {
    width: 80 + '%',
    margin: 20,
    backgroundColor: "darkgray",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  modal_title: {
    textAlign: 'center',
    fontSize: 16,
  },

  modal_subtitle: {
    marginTop: 20,
  },

  modal_input: {
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 30
  },

  modal_pick_btn: {
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginBottom: 20,
    marginTop: 10
  },

  modal_record_btn: {
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginBottom: 30,
  },

  modal_cancel_btn: {
    width: 90,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    marginRight: 20
  },

  modal_cancel_btn_text: {
    color: '#000000',
    textAlign: 'center'
  },

  modal_confirm_btn:{
    width: 90,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#000000',
  },


  modal_modal_record_btn: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'lightgray',
    marginBottom: 30,
    marginTop: 30
  },

  modal_modal_stop_btn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'lightgray',
    marginBottom: 30,
  },

  btn_bg_delete: {
    width: 70,
    height: 70,
    backgroundColor: 'gray',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },

  btn_delete: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 100,
  },

  btn_text_delete: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10
  },
})

export default styles;