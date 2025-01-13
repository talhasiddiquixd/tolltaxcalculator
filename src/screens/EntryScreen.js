import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import {COLOR, hp, wp} from '../constants/styleGuide';
import {Dropdown} from '../components/DropDown';
import {interchanges} from '../constants/InterChangeData';

import {formatDateTime} from '../utils/common';
import Header from '../components/Header';
import {createTrip} from '../utils/api';

const EntryScreen = ({navigation}) => {
  const [selectedInterchange, setSelectedInterchange] =
    useState('Select Interchange');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [numberPlate, setNumberPlate] = useState('');
  const [entryDateTime, setEntryDateTime] = useState(new Date().toISOString()); // Auto-generate current date/time
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelect = item => {
    setSelectedInterchange(item);
    setDropdownVisible(false);
  };

  // Regular expression to validate number plate in LLL-NNN format
  const validateNumberPlate = plate => {
    const regex = /^[A-Za-z]{3}-\d{3}$/; // Three letters followed by a dash and three digits
    return regex.test(plate);
  };

  const validateEntryTime = time => {
    return !isNaN(new Date(time).getTime());
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    if (selectedInterchange === 'Select Interchange') {
      setErrorMessage('Please select an interchange.');
      return;
    }

    if (!numberPlate.trim() || !validateNumberPlate(numberPlate)) {
      setErrorMessage('Invalid number plate. Please use the format: LLL-NNN.');
      return;
    }

    if (!validateEntryTime(entryDateTime)) {
      setErrorMessage('Invalid exit time. Please enter a valid date and time.');
      return;
    }

    console.log('Submit');
    const tolltaxData = {
      EntryInterchange: selectedInterchange,
      NumberPlate: numberPlate,
      EntryDateTime: entryDateTime,
      TripStatus: 'Active',
    };

    try {
      const response = await createTrip(tolltaxData);
      console.log(response);

      if (!response.success) {
        setErrorMessage(
          response.message || 'Failed to create tolltax. Please try again.',
        );
        return;
      }

      Alert.alert('Success', 'Toll Tax Entry Added successfully!');
      setSelectedInterchange('Select Interchange');
      setNumberPlate('');
      setErrorMessage('');
      navigation.replace('Entries');
    } catch (error) {
      console.error('Error creating tolltax:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'Add New Entry'} />
      <View style={styles.container}>
        {/* Display error message if exists */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.selectInterChangeBox}>
          <TouchableOpacity
            style={[styles.input, {alignItems: 'center', width: '100%'}]}
            onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Text style={styles.inputText}>{selectedInterchange}</Text>
            <Image
              source={require('../assets/images/down.png')}
              style={styles.downIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Dropdown
          data={interchanges}
          visible={dropdownVisible}
          onSelect={handleSelect}
        />
        <TextInput
          style={styles.input}
          placeholder="Number Plate (LLL-NNN)"
          placeholderTextColor={COLOR.gray}
          value={numberPlate}
          onChangeText={setNumberPlate}
        />
        <TextInput
          style={styles.input}
          placeholder="Date Time (Auto/Modifiable)"
          placeholderTextColor={COLOR.gray}
          value={entryDateTime ? formatDateTime(new Date(entryDateTime)) : ''}
          onChangeText={setEntryDateTime}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(5),
    justifyContent: 'center',
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  selectInterChangeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downIcon: {
    width: wp(6),
    height: wp(6),
  },
  input: {
    height: hp(6),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: wp(1),
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    fontSize: wp(4),
    color: COLOR.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    width: wp(25),
    height: hp(6),
    backgroundColor: '#d4ed91',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: wp(1),
  },
  submitText: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
});

export default EntryScreen;
