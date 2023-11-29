import React from "react";
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Image, Link } from 'react-native';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



const AccountHolder = () => {
    return (
        <ImageBackground source={require('../Global/images/Reed.jpg')} style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Image source={require('../Global/images/logo.png')} style={styles.logo} />
                    <View style={{ width: '120%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={styles.title}>MAIN ACCOUNT HOLDER </Text>
                    </View>

                    <View>
                        <Text style={styles.subtitle}>TELL US ABOUT YOURSELF</Text>
                    </View>

                    <View>
                        <TextField id="standard-basic" label="Name" variant="standard" />
                        <TextField id="standard-basic" label="Surname" variant="standard" />
                    </View>

                    <View>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native"> </InputLabel>

                                <NativeSelect defaultValue={30} inputProps={{ name: 'Gender', id: 'uncontrolled-native', }} >
                                    <option value={10}>Male</option>
                                    <option value={20}>Female</option>
                                    <option value={30}>Prefer not to say</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </View>

                    <View>
                        <TextField id="standard-basic" label="Email" variant="standard" />
                        <TextField id="standard-basic" label="Location" variant="standard" />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>CONTINUE</Text>
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
        color: 'white',
        fontWeight: 'bold',
    },
})

export default AccountHolder
