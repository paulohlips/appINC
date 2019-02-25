import React from 'react';
import { View, ScrollView } from 'react-native';
import { InputText, AudioRec, Camera, MyDatePicker, GeoLocation, Veiculos, Check, Scanner, Sketch, Vestigios, OCR } from '../../../../components';
import styles from './styles';


const ComponentList = (props) => (
  <View style={styles.container}>
    <ScrollView>

      {
        props.data.component_type === 'ocr' && (
          <View style={styles.component}>
            <OCR data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'scanner' && (
          <View style={styles.component}>
            <Scanner data={props.data} />
          </View>
        )
      }

      {
        props.data.component_type === 'croqui' && (
          <View style={styles.component}>
            <Sketch data={props.data} />
          </View>
        )
      }

      {
        props.data.component_type === 'vestigio' && (
          <View style={styles.component}>
            <Vestigios data={props.data} />
          </View>
        )
      }

      {
        props.data.component_type === 'camera' && (
          <View style={styles.component}>
            <Camera data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'text' && (
          <View style={styles.component}>
            <InputText data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'audiorec' && (
          <View style={styles.component}>
            <AudioRec data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'date' && (
          <View style={styles.component}>
            <MyDatePicker data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'geoloc' && (
          <View style={styles.component}>
            <GeoLocation data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'veiculo' && (
          <View style={styles.component}>
            <Veiculos data={props.data} />
          </View>
        )
      }
      {
        props.data.component_type === 'checkbox' && (
          <View style={styles.component}>
            <Check data={props.data} />
          </View>
        )
      }

    </ScrollView>
  </View>
);

export default ComponentList;
