import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import EditTable from '../component/EditTable';
import Ionicons from "react-native-vector-icons/Ionicons";
import FancyButton from '../component/Button';
import { useGlobalContext } from '../context/GlobalContext';
import AxiosInstance from './AxiosInstance';
import { SET_TABLE_DATA, UPDATE_TABLE_DATA } from '../constant/actionTypes/ReducerActionType';
import { FORM } from '../constant/actionTypes/ReducerStateType';

let EditInstance:any = null;

const EditModal = () => {
  const { state, dispatchAction } = useGlobalContext();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);
  const [onCancel, setOnCancel] = useState(null);


  EditInstance = {
    show: (title, message, onConfirmCallback = null, onCancelCallback = null) => {
      setData(title);
      setMessage(message);
    
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  };

  const handleClose = () => {
    if (onConfirm) onConfirm();
    setVisible(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setVisible(false);
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {
              Object.entries(data).map(([key,value], index) => (
              <View key={index} style={{marginVertical:'2%'}}>
                <EditTable key={index} fieldName={key} value={value} label={undefined} handleSave={()=>{
                  console.log(state.form.selectionTableRow)
                  AxiosInstance.put(`api/db/update?tableName=${state.form.selectionTable}&id=${state.form.selectionTableRow?.id}`, state.form.selectionTableRow).then(async res=>{
                    console.log(res.data);
                    await AxiosInstance.get("api/db/allDbTables?tableName=" + state.form.selectionTable)
                    .then(async res => {
                      console.log(res.data);
                      
                      dispatchAction(FORM, SET_TABLE_DATA, res.data);
              
                    })
                    .catch(err => {
                      console.log("Connection failed " + err);
                    });
                  })

                  console.log("Save");
                }}  />
              </View>
            ))
          }
          </ScrollView>
          <FancyButton title="Tamam" onPress={handleClose} />
  
          {onCancel && (
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: '#e74c3c' }]}
                onPress={handleCancel}
              >
                <Text style={styles.closeButtonText}>İptal </Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '75%',
   

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  modalTitle: {
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#e74c3c',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 9,
  },
  alertIcon: {
    width: 40,
    height: 40,
  },
});

export { EditModal, EditInstance };
