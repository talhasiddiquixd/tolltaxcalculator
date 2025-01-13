import {db} from '../constants/db';

const COLLECTION_NAME = 'tolltaxes';

export const createTrip = async tolltax => {
  try {
    if (!tolltax || typeof tolltax !== 'object') {
      return {
        success: false,
        data: null,
        message: 'Invalid toll tax data',
      };
    }

    const docRef = await db.collection(COLLECTION_NAME).add(tolltax);

    return {
      success: true,
      data: {id: docRef.id, ...tolltax},
      message: 'Toll Tax created successfully',
    };
  } catch (error) {
    console.error('Error creating toll tax:', error);
    return {
      success: false,
      data: null,
      message: error.message || 'Error creating toll tax',
    };
  }
};

// Get all trips
export const getTrips = async () => {
  try {
    const querySnapshot = await db.collection(COLLECTION_NAME).get();

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No toll taxes found',
      };
    }

    return {
      success: true,
      data,
      message: 'Toll Taxes fetched successfully',
    };
  } catch (error) {
    console.error('Error fetching toll taxes:', error);
    return {
      success: false,
      data: null,
      message: error.message || 'Error fetching toll taxes',
    };
  }
};

// Update a trip
export const updateTrip = async (id, updatedTrip) => {
  try {
    if (!id || !updatedTrip || typeof updatedTrip !== 'object') {
      throw new Error('Invalid Toll Tax ID or data');
    }

    const tripRef = db.collection(COLLECTION_NAME).doc(id);

    await tripRef.update(updatedTrip);

    return {
      success: true,
      data: {id, ...updatedTrip},
      message: 'Toll Tax updated successfully',
    };
  } catch (error) {
    console.error('Error updating toll tax:', error);
    return {
      success: false,
      data: null,
      message: error.message || 'Error updating toll tax',
    };
  }
};
