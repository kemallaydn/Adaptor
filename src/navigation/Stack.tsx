import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Connection from "../screen/Connection";
import Home from "../screen/Home";

const Stack = createNativeStackNavigator();

function appStack() {
    return (
        <Stack.Navigator  screenOptions={{ headerShown: false,animation:'none'}}>
            <Stack.Screen name="Connection" component={Connection} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}
export default appStack;