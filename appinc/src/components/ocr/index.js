import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, NativeModules } from 'react-native';
import Camera from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';
import Spinner from 'react-native-spinkit';
import config from './config';
import styles from './styles';

class OCR extends Component {
    state = {
        loading: false,
        showApiResponse: false,
    };

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    playSoundOnCapture={false}>
                    <View><Text>{this.state.loading}</Text></View>
                    {
                        (!this.state.loading) ?
                            <Text
                                style={styles.capture}
                                onPress={this.takePicture.bind(this)} />
                            :
                            <View>
                                <Spinner
                                    style={styles.spinner}
                                    isVisible={true}
                                    size={70}
                                    type={'Bounce'}
                                    color={'white'} />
                            </View>

                    }
                </Camera>
            </View>
        );
    }

    takePicture() {
        if (!this.state.loading) {
            this.setState({
                loading: true
            });

            const options = {};
            this.camera.capture({ metadata: options })
                .then((data) => {

                    resizeImage(data.path, (resizedImageUri) => {
                        NativeModules.RNImageToBase64.getBase64String(resizedImageUri, async (err, base64) => {
                            if (err) {
                                console.error(err)
                            }
                            console.log('converted to base64');
                            let result = await checkForText(base64);

                            console.log(['API response', result.responses[0].fullTextAnnotation.text]);
                            Alert.alert(result.responses[0].fullTextAnnotation.text);
                            this.setState({
                                loading: false, showApiResponse: true
                            });
                        })
                    })
                })
                .catch(err => console.error(err));
        } else {
            console.log('NO GO' + this.state.loading)
        }
    }
}

// Função responsável por ajustar a imagem em 640x480 (recomendação google)
function resizeImage(path, callback, width = 640, height = 480) {
    ImageResizer.createResizedImage(path, width, height, 'JPEG', 80).then((resizedImageUri) => {
        callback(resizedImageUri);
    }).catch((err) => {
        console.error(err)
    });
}

// Chamada a API do Google Cloud Vision passando a foto no body
async function checkForText(base64) {
    return await
        fetch(config.googleCloud.api + config.googleCloud.apiKey, {
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
        }).then((response) => {
            return response.json();
        }, (err) => {
            console.error('promise rejected')
            console.error(err)
        });
}

export default OCR;

