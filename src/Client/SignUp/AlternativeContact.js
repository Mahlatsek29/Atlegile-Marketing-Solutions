import React from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Image, Link } from 'react-native';
import { TextField } from '@mui/material';




const AlternativeContact = () => {
    
    return (
        <ImageBackground src={require('../../Global/images/Reed.jpg')} style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Image src={require('../../Global/images/logo.png')} style={styles.logo} />

                    <View>
                        <Text style={styles.subtitle}>ALTERNATIVE CONTACT</Text>
                    </View>

                    <View>
                        <TextField id="standard-basic" label="Name" variant="standard" />
                        <TextField id="standard-basic" label="Phone" variant="standard" />
                    </View>


                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.buttonn}>
                            <Text style={styles.buttonTextt}>NOT NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '30%',
        marginLeft: '69%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 50,
        marginBottom: 150,
        resizeMode: 'contain',
        marginLeft: '29%'
    },
    title: {
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: '30%'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#072840',
        borderRadius: 40,
        width: 200,
        height: 40,
        marginLeft: '15%'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    buttonn: {
        marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        width: 200,
        height: 40,
        marginLeft: '15%',
        borderWidth: 1,
        borderColor: '#072840'
    },
    buttonTextt: {
        color: '#072840',
        fontWeight: 'bold',
    }

})

export default AlternativeContact
