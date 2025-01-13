import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {COLOR, hp, wp} from '../constants/styleGuide';
import {Dropdown} from '../components/DropDown';
import {interchanges} from '../constants/InterChangeData';
import {calculateToll} from '../utils/tollCalculator';
import {updateTrip} from '../utils/api';
import Header from '../components/Header';

const ExitScreen = ({navigation, route}) => {
  const {item} = route?.params;
  const [selectedInterchange, setSelectedInterchange] =
    useState('Select Interchange');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [numberPlate, setNumberPlate] = useState(item.NumberPlate || '');
  const [exitDateTime, setExitDateTime] = useState(new Date().toISOString());
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelect = item => {
    setSelectedInterchange(item);
    setDropdownVisible(false);
  };

  const formatDateTime = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const validateNumberPlate = plate => {
    const regex = /^[A-Za-z]{3}-\d{3}$/;
    return regex.test(plate);
  };

  // Validate exit time
  const validateExitTime = time => {
    return !isNaN(new Date(time).getTime()); // Validates if it's a correct date
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

    if (!validateExitTime(exitDateTime)) {
      setErrorMessage('Invalid exit time. Please enter a valid date and time.');
      return;
    }

    const tripData = {
      EntryInterchange: item.EntryInterchange,
      NumberPlate: numberPlate,
      EntryDateTime: item.EntryDateTime,
      ExitDateTime: exitDateTime,
      TripStatus: 'Completed',
      ExitInterchange: selectedInterchange,
    };

    try {
      const toll = calculateToll(
        tripData.EntryInterchange,
        tripData.ExitInterchange,
        tripData.ExitDateTime,
        tripData.NumberPlate,
      );

      const combinedData = {
        ...tripData,
        baseRate: toll.baseRate,
        discount: toll.discount,
        distanceCost: toll.distanceCost,
        subtotal: toll.subtotal,
        total: toll.total,
      };

      const response = await updateTrip(item.id, combinedData);

      if (!response.success) {
        setErrorMessage(
          response.message || 'Failed to update Toll Tax. Please try again.',
        );
        return;
      }

      Alert.alert('Success', 'Toll Tax updated successfully!');
      setSelectedInterchange('Select Interchange');
      setNumberPlate('');
      setExitDateTime(new Date().toISOString());
      setErrorMessage('');
      navigation.replace('Entries');
    } catch (error) {
      console.error('Error updating Toll Tax:', error);

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
      <Header title={'Add Exit Entry'} />
      <View style={styles.container}>
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
          placeholder="Number-Plate (LLL-NNN)"
          placeholderTextColor={COLOR.gray}
          value={numberPlate}
          onChangeText={setNumberPlate}
        />
        <TextInput
          style={styles.input}
          placeholder="Exit Time (Auto/Modifiable)"
          placeholderTextColor={COLOR.gray}
          value={exitDateTime ? formatDateTime(new Date(exitDateTime)) : ''}
          onChangeText={setExitDateTime}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Calculate</Text>
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
    alignSelf: 'center',
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

export default ExitScreen;
