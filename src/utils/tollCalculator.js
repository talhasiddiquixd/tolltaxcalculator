export const calculateToll = (entry, exit, entryDate, numberPlate) => {
  const baseRate = 20;
  const distanceRates = {
    'Zero Point': 0,
    'NS Interchange': 5,
    'Ph4 Interchange': 10,
    'Ferozpur Interchange': 17,
    'Lake City Interchange': 24,
    'Raiwand Interchange': 29,
    'Bahria Interchange': 34,
  };

  console.log(entry, exit);

  const distance = Math.abs(distanceRates[exit] - distanceRates[entry]);
  console.log('Distance: ' + distance);
  const dayOfWeek = new Date(entryDate).getDay();
  console.log('Day', dayOfWeek);
  const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
  const distanceRate = isWeekend ? 0.3 : 0.2;

  const distanceCost = distance * distanceRate;

  let subtotal = baseRate + distanceCost;

  const lastNumber = parseInt(numberPlate.split('-')[1], 10) % 2;
  const discounts = {
    1: dayOfWeek === 1 || dayOfWeek === 3,
    0: dayOfWeek === 2 || dayOfWeek === 4,
  };

  let discount = 0;
  if (discounts[lastNumber]) {
    discount = subtotal * 0.1;
    subtotal -= discount;
  }

  const holidays = ['03/23', '08/14', '12/25'];
  const entryDateFormatted = new Date(entryDate).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });

  let holidayDiscount = 0;
  if (holidays.includes(entryDateFormatted)) {
    holidayDiscount = subtotal * 0.5;
    subtotal -= holidayDiscount;
  }

  const total = subtotal;

  return {
    baseRate: baseRate.toFixed(2),
    distanceCost: distanceCost.toFixed(2),
    subtotal: subtotal.toFixed(2),
    discount: (discount + holidayDiscount).toFixed(2),
    total: total.toFixed(2),
  };
};
