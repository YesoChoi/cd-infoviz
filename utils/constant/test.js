import workerData from '@/data/worker-data.json'

export const WORKER_DATA = workerData;

export const SHOE_DATA = {
  Upper: ['Vietnam', 'China', 'Taiwan', 'Indonesia', 'Japan', 'Thailand', 'South Korea'],
  Sole: ['Indonesia', 'Vietnam', 'South Korea'],
  'Sub-material': ['Vietnam', 'China'],
  'Finished Goods': [
    'Vietnam', 'Indonesia', 'China', 'India', 'Brazil', 
    'Taiwan', 'South Korea', 'Bosnia', 'Italy', 'Argentina', 'Japan'
  ],
};

// export const WORKER_DATA = {
//   Upper: {
//     Vietnam: { totalWorkers: 10167, lineWorkers: 8640 },
//     China: { totalWorkers: 7513, lineWorkers: 5637 },
//     Taiwan: { totalWorkers: 4298, lineWorkers: 2672 },
//     Indonesia: { totalWorkers: 2454, lineWorkers: 1711 },
//     Japan: { totalWorkers: 1883, lineWorkers: 1560 },
//     Thailand: { totalWorkers: 1132, lineWorkers: 812 },
//     'South Korea': { totalWorkers: 522, lineWorkers: 283 },
//   },
//   Sole: {
//     Indonesia: { totalWorkers: 816, lineWorkers: 643 },
//     Vietnam: { totalWorkers: 323, lineWorkers: 178 },
//     'South Korea': { totalWorkers: 105, lineWorkers: 50 },
//   },
//   'Sub-material': {
//     Vietnam: { totalWorkers: 5918, lineWorkers: 4489 },
//     China: { totalWorkers: 1800, lineWorkers: 950 },
//   },
//   'Finished Goods': {
//     Vietnam: { totalWorkers: 335536, lineWorkers: 296842 },
//     Indonesia: { totalWorkers: 237600, lineWorkers: 208917 },
//     China: { totalWorkers: 84689, lineWorkers: 71621 },
//     India: { totalWorkers: 29773, lineWorkers: 28083 },
//     Brazil: { totalWorkers: 13015, lineWorkers: 11555 },
//     Taiwan: { totalWorkers: 4213, lineWorkers: 1097 },
//     'South Korea': { totalWorkers: 2507, lineWorkers: 905 },
//     Bosnia: { totalWorkers: 1998, lineWorkers: 1835 },
//     Italy: { totalWorkers: 501, lineWorkers: 425 },
//     Argentina: { totalWorkers: 340, lineWorkers: 330 },
//     Japan: { totalWorkers: 5, lineWorkers: 4 },
//   },
// };




export const calculateTotalWorkers = (country, workerType = 'total') => {
  const targetDataType = workerType + 'Workers'
  let total = 0;
  console.log(targetDataType)
  Object.values(WORKER_DATA).forEach(category => {
    if (category[country]) {
      total += category[country][targetDataType];
    }
  });
  return total;
};

export const CITIES = [
    {
        name: 'Seoul',
        country: 'South Korea',
        lat: 37.5665,
        lng: 126.9780,
   
    },
    {
        name: 'Tokyo',
        country: 'Japan',
        lat: 35.6762,
        lng: 139.6503,
       
    },
    {
        name: 'Beijing',
        country: 'China',
        lat: 39.9042,
        lng: 116.4074,

    },
    {
        name: 'Shanghai',
        country: 'China',
        lat: 31.2304,
        lng: 121.4737,
 
    },
    {
        name: 'Bangkok',
        country: 'Thailand',
        lat: 13.7563,
        lng: 100.5018,
    },
    {
        name: 'Jakarta',
        country: 'Indonesia',
        lat: -6.2088,
        lng: 106.8456,
    },
    {
        name: 'Mumbai',
        country: 'India',
        lat: 19.0760,
        lng: 72.8777,
    },
    {
        name: 'Delhi',
        country: 'India',
        lat: 28.6139,
        lng: 77.2090,
    },
    {
        name: 'Taipei',
        country: 'Taiwan',
        lat: 25.0330,
        lng: 121.5654,
    },
    {
        name: 'Ho Chi Minh City',
        country: 'Vietnam',
          lat: 10.8231,
        lng: 106.6297,
    },
    {
        name: 'Osaka',
        country: 'Japan',
        lat: 34.6937,
        lng: 135.5023,
    }
];
