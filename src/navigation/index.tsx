import React from "react";
import {  NavigationContainer } from '@react-navigation/native';
import Stack from "./Stack";
import Navigation from "../service/Navigation";

function Navigator(){
    return(
        <NavigationContainer ref={Navigation.setTopLevelNavigator}>
            <Stack/>
        </NavigationContainer>
    )
}
export default Navigator;