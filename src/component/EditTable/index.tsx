import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../context/GlobalContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FORM } from "../../constant/actionTypes/ReducerStateType";
import { UPDATE_DBTABLES } from "../../constant/actionTypes/ReducerActionType";


const EditTable = ({ label, fieldName, value,handleSave }) => {
    const { state ,dispatchAction } = useGlobalContext();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    const handleEdit = () => {
        setIsEditing(true);
    };
   
    const handleCancel = async() => {
        setText(value);
        setIsEditing(false);
    };

    return (
        <View>
            {label && <Text style={styles.title}>{label}</Text>}
            {isEditing ? (
                <View style={styles.item}>
                    <TextInput
                        onChangeText={(text) => {
                            setText(text);
                            dispatchAction(FORM, UPDATE_DBTABLES, { fieldName: fieldName, value: text });
                        }}
                        style={styles.input}
                        autoFocus
                        value={text}
                    />
                    <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Ionicons name="close" size={10} color="white" />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        if(text !== value){

                            handleSave();
                        }
                        setIsEditing(false);
                        
                    }} style={styles.saveButton}>
                        <Ionicons name="checkmark" size={10} color="white" />

                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.item}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.description}>{text}</Text>
                    <Ionicons name="create-outline" size={15} color="white" onPress={handleEdit} style={{position:'absolute',right:'3%'}}/>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: "400",
        margin: 10,
        color: "white",
    },
    description: {
        fontSize: 16,
        margin: 10,
        color: "white",
        fontWeight: "200",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(0, 23, 31, 0.66)",
        alignItems: "center",
        borderRadius: 60,
        position: "relative",
        paddingRight: 10,

    },
    input: {
        color: "white",
        fontSize: 16,
        flex: 1,
        padding: '3.5%',
        fontWeight: "300",
    },
    saveButton: {
        marginLeft: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    cancelButton: {
        marginLeft: 10,
        backgroundColor: '#DC3545',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
})
export default EditTable;