import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../constants/styleGuide';

const onBoardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View>
        <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => navigation.navigate('Entry')}>
          <Text style={styles.buttonText}>Add New Entry</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => navigation.navigate('Exit')}>
          <Text style={styles.buttonText}>Add Exit Entry</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => navigation.navigate('Entries')}>
          <Text style={styles.buttonText}>View Entries</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default onBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginTop: hp(30),
    fontSize: wp(8),
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonBox: {
    width: wp(36),
    padding: wp(2),
    backgroundColor: '#d4ed91',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: wp(1),
    marginTop: hp(2),
  },
  buttonText: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
