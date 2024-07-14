import React from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useGlobalContext } from "../context/GlobalContext";
import { FORM } from "../constant/actionTypes/ReducerStateType";
import { SET_DBCONNECTION } from "../constant/actionTypes/ReducerActionType";
import axios from "axios";
import Navigation from "../service/Navigation";
import { HOME } from "../constant/actionTypes/NavigationType";
import AxiosInstance from "../Instance/AxiosInstance";

const Connection = () => {
    const {state, dispatchAction} = useGlobalContext();

    const onConnect = async () => {
        await AxiosInstance.post("api/db/connect", state.form.dbConnection)
            .then(res => {
                console.log("Connected");
                Navigation.navigate(HOME);
            })
            .catch(err => {
                console.log("Connection failed " + err);
                Alert.alert("Connection failed", "Please check your connection");
            });
       
    }

    const onChangeText = (field:string,text: string) => {
        dispatchAction(FORM, SET_DBCONNECTION, {fieldName: field, value: text});
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>DB MANAGER</Text>
            <View style={styles.body} >
                <TextInput placeholder="Enter your url" style={styles.input} onChangeText={(text)=>{onChangeText("url",text)}}/>
                <TextInput placeholder="Enter your username" style={styles.input} onChangeText={(text)=>{onChangeText("username",text)}}/>
                <TextInput placeholder="Enter your password" style={styles.input} onChangeText={(text)=>{onChangeText("password",text)}}/>
                <Button title="Connect" onPress={onConnect} color={"rgba(0,23,31,0.9)"}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 30,
        fontWeight: '400',
        textAlign: 'center',
        marginVertical: 20
    },
    body: {
        justifyContent: 'center',
        padding: '10%'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'rgba(0,23,31,0.5)',
        marginVertical: '5%',
        paddingVertical: '3%',
        paddingHorizontal: '0.5%',
    }
})

export default Connection;