import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {COLOR, hp, wp} from '../constants/styleGuide';
import {getTrips} from '../utils/api';
import Header from '../components/Header';

const AllEntriesScreen = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store error message

  const formatDateTime = dateString => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} - ${hours}:${minutes}`;
  };

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await getTrips();
      if (data.success) {
        setEntries(data.data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred while fetching entries.');
    } finally {
      setLoading(false);
    }
  };

  const handleExit = async item => {
    navigation.navigate('Exit', {item: item});
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const renderItem = ({item, index}) => (
    <View key={index} style={styles.entryCard}>
      <Text style={styles.entryText}>
        <Text style={styles.label}>Number Plate:</Text> {item.NumberPlate}
      </Text>
      <Text style={styles.entryText}>
        <Text style={styles.label}>Entry Point:</Text> {item.EntryInterchange}
      </Text>
      <Text style={styles.entryText}>
        <Text style={styles.label}>Entry Time:</Text>{' '}
        {formatDateTime(item.EntryDateTime)}
      </Text>
      {!(item.TripStatus === 'Active') && (
        <>
          <Text style={styles.entryText}>
            <Text style={styles.label}>Exit Point:</Text>{' '}
            {item.ExitInterchange || 'N/A'}
          </Text>
          <Text style={styles.entryText}>
            <Text style={styles.label}>Exit Time:</Text>{' '}
            {formatDateTime(item.ExitDateTime) || 'N/A'}
          </Text>
          <Text style={styles.entryText}>
            <Text style={styles.label}>Base Rate:</Text> $
            {item.baseRate || '0.00'}
          </Text>
          <Text style={styles.entryText}>
            <Text style={styles.label}>Distance Cost:</Text> $
            {item.distanceCost || '0.00'}
          </Text>
          <Text style={styles.entryText}>
            <Text style={styles.label}>Sub Total:</Text> $
            {item.subtotal || '0.00'}
          </Text>
          <Text style={styles.entryText}>
            <Text style={styles.label}>Total:</Text> ${item.total || '0.00'}
          </Text>
        </>
      )}
      {item.TripStatus === 'Active' && (
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => handleExit(item)}>
          <Text style={styles.exitButtonText}>Add Exit Entry</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={'All Entries'} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.black} />
        ) : error ? ( // Display error if it exists
          <Text style={styles.errorText}>{error}</Text>
        ) : entries.length > 0 ? (
          <FlatList
            data={entries.sort(
              (a, b) => new Date(b.EntryDateTime) - new Date(a.EntryDateTime),
            )}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.noDataText}>No entries found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: wp(95),
    flexGrow: 1,
    paddingBottom: hp(2),
  },
  entryCard: {
    borderWidth: 1,
    borderColor: COLOR.gray,
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryText: {
    fontSize: wp(4.2),
    marginBottom: hp(0.5),
    color: COLOR.black,
    lineHeight: hp(2.5),
  },
  label: {
    fontWeight: 'bold',
    color: COLOR.black,
  },
  noDataText: {
    fontSize: wp(4.5),
    color: COLOR.gray,
    textAlign: 'center',
    marginTop: hp(5),
  },
  errorText: {
    fontSize: wp(4.5),
    color: 'red',
    textAlign: 'center',
    marginTop: hp(5),
  },
  exitButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    marginTop: hp(1.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exitButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
});

export default AllEntriesScreen;
