

import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; const AccountHolder = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); const handleSignup = () => {
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password); navigation.navigate("AlternativeContact");
    }; return (
        <ImageBackground
            source={require("../Global/images/Reed.jpg")}
            style={styles.background}
        >
            <View style={styles.container}>
                <View>
                    <Image
                        source={require("../Global/images/logo.png")}
                        style={styles.logo}
                    />
                </View>        <View style={{ width: "75%" }}>
                    <Text style={styles.title}>MAIN ACCOUNT HOLDER</Text>
                    <Text style={styles.titles}>TELL US ABOUT YOURSELF</Text>
                </View>        <View style={{ width: "75%" }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 69 }}>
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>      </View>
        </ImageBackground>
    );
}; const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#FFFFFF",

    padding: 20,
        borderRadius: 10,
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        height: "95%",
        marginLeft: "69%",
    },
    title: {
        // fontSize: 25,
        marginBottom: 20,
        fontWeight: "bold",
        marginRight: "50%",
        width: "75%",
    },
    titles: {
        fontSize: 22,
        width: "140%",
        // marginBottom: 20,
        fontWeight: "bold",
        // marginRight: '40%',
        marginTop: "-6%",
    },
    input: {
        height: 40,
        // marginBottom: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginVertical: 10,
    },
    button: {
        backgroundColor: "#072840",
    paddingVertical: 10,
        borderRadius: 30,
        marginTop: 10,
        width: "80%",
        marginVertical: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    logo: {
        width: 150,
        height: 50,
        marginBottom: 150,
        resizeMode: 'contain',
        paddingVertical: '50%',
    },
}); export default AccountHolder;
