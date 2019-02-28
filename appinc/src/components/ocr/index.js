import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Alert,
    Image, TouchableOpacity, NativeModules, Dimensions, TextInput, AsyncStorage
} from 'react-native';
import config from './config';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
var ImagePicker = NativeModules.ImageCropPicker;
import axios from 'axios';

class OCR extends Component {
    state = {
        avatarSource: null,
        videoSource: null,
        imagePath: null,
        image: null,
        images: null,
        text: null,
    };


    pickSingleWithCamera(cropping) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 480,
            height: 640,
            includeExif: false,
            includeBase64: true,
        }).then(async image => {
            console.tron.log(image);
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                images: null,
                imagePath: image.path
            });
            const responseOcr = await this.checkForText(image.data);
            await console.tron.log(['teste', responseOcr]);
            if (responseOcr.responses[0]) {
                await this.setState({ text: responseOcr.responses[0].fullTextAnnotation.text });
            }
        }).catch(err => console.error(err));
    }

    // Chamada a API do Google Cloud Vision passando a foto no body
    async checkForText(base64) {
        console.tron.log(['Vamos enviar para o google! '])
        const body = JSON.stringify({
            "requests": [
                {
                    "image": {
                        "content": base64
                    },
                    "features": [
                        {
                            "type": "DOCUMENT_TEXT_DETECTION"
                        }
                    ]
                }
            ]
        });

        /*
        const responseAxios = await axios.post(config.googleCloud.api + config.googleCloud.apiKey, body);
        await console.tron.log(['axios@@@', responseAxios]);


         axios({
            method: 'post',
            url: config.googleCloud.api + config.googleCloud.apiKey,
            body,
        })
            .then((resp) => {
                console.tron.log(['teste no axios', resp]);
            }).catch(err => {
                console.tron.log(['teste err no axios', err]);
            }); */

        return await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
            method: 'POST',
            body: JSON.stringify({
                "requests": [
                    {
                        "image": {
                            "content": base64
                        },
                        "features": [
                            {
                                "type": "DOCUMENT_TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            })
        }).then(response => {
            return response.json();
            console.tron.log('Chegou a resposta!', response)
            this.showResult(response);
        }).catch(err => console.tron.log(['err', err]));
        await console.tron.log(['ferrou', response])
    }

    showResult = (result) => {
        console.tron.log(['result', result]);
        console.tron.log(['API response', result.responses[0].fullTextAnnotation.text]);
        Alert.alert(result.responses[0].fullTextAnnotation.text);
    }


    render() {
        const { text } = this.state;
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarContainer2}><Icon name="add-a-photo" size={30} style={styles.icon} />
                            <View style={styles.text_foto}>
                                <Text style={styles.text}>Tirar uma foto</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    text && (
                        <View style={styles.input}>
                            <Text style={styles.info_text}>{this.state.text} </Text>
                        </View>
                    )
                }
            </View>
        );
    }
}

export default OCR;
