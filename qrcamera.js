import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reader: {
        message: 'Some message',
        data: null,
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.openPhoto();
          }}>
          <Text style={{marginTop: 20}}>Hello</Text>
        </TouchableOpacity>
        <View>
          {!this.state.reader ? (
            <Text>
              {!this.state.reader.message ? '' : `${this.state.reader.message}`}
            </Text>
          ) : (
            <Text>
              {!this.state.reader.message
                ? ''
                : `${this.state.reader.message}:${this.state.reader.data}`}
            </Text>
          )}
        </View>
      </View>
    );
  }

  openPhoto() {
    console.log('ImagePicker');
    ImagePicker.launchImageLibrary({}, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.uri) {
          var path = response.path;
          if (!path) {
            path = response.origURL;
          }
          console.log('Origurl = ', path);
          console.log(QRreader(path), '=======');
          QRreader(path)
            .then(data => {
              console.log('######## Data Read');
              this.setState({
                reader: {
                  message: 'QR data',
                  data: data,
                },
              });
              setTimeout(() => {
                this.setState({
                  reader: {
                    message: 'error message',
                    data: {},
                  },
                });
              }, 10000);
            })
            .catch(err => {
              this.setState({
                reader: {
                  message: 'Error',
                  data: {},
                },
              });
            });
        }
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 100,
    flex: 1,
    backgroundColor: '#fff',
  },
});
