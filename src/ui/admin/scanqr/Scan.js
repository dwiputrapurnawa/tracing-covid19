import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
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
