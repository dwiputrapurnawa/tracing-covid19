import React, {Component} from 'react';
import {StyleSheet, View, Alert, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firestore from '@react-native-firebase/firestore';

export default class Scan extends Component {
  alertAfterScan = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () =>
            this.alertBeforeScan('Scan', 'Click OK to continue scanning'),
        },
      ],
      {cancelable: false},
    );
  };

  alertBeforeScan = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => this.scanner.reactivate()}],
      {cancelable: false},
    );
  };

  onRead = (e) => {
    firestore()
      .collection('booking')
      .doc(e.data)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          if (documentSnapshot._data.status == 'Waiting') {
            firestore()
              .collection('booking')
              .doc(e.data)
              .update({
                status: 'In',
              })
              .then(() => {
                this.alertAfterScan('Success!', 'Current booking status is in');
              });
          } else if (documentSnapshot._data.status == 'In') {
            firestore()
              .collection('booking')
              .doc(e.data)
              .update({
                status: 'Out',
              })
              .then(() => {
                this.alertAfterScan(
                  'Success!',
                  'Current booking status is out',
                );
              });
          } else if (documentSnapshot._data.status == 'Out') {
            this.alertAfterScan('Failed!', 'This booking already used');
          }
        } else {
          this.alertAfterScan('Failed!', 'Booking not found!');
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 300, height: 200}}
                 source={{uri: 'https://firebasestorage.googleapis.com/v0/b/tracing-covid19.appspot.com/o/STMIK%20Primakara%20-%20Primary%20Horizontal%20Logo.png?alt=media&token=d1d931bf-bd45-4322-9eec-04961ae18b84'}} />
        <QRCodeScanner
          ref={(node) => {
            this.scanner = node;
          }}
          onRead={this.onRead}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
