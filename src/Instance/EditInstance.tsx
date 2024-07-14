import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import EditTable from '../component/EditTable';
import Ionicons from "react-native-vector-icons/Ionicons";

let EditInstance;

const EditModal = () => {
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
          {
            data.map((item, index) => (
                <EditTable key={index}  fieldName={item} value={item}  />
            ))
          }
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>Tamam</Text>
          </TouchableOpacity>
          {onCancel && (
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: '#e74c3c' }]}
                onPress={handleCancel}
              >
                <Text style={styles.closeButtonText}>İptal     </Text>
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
    width: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    paddingVertical: 20,

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
