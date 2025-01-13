import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {COLOR, wp, hp} from '../constants/styleGuide';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/images/left.png')}
          style={{
            height: 20,
            width: 20,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray,
    elevation: 3,
    marginBottom: 10,
  },
  backButton: {
    marginRight: wp(3),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: COLOR.black,
  },
});

export default Header;
