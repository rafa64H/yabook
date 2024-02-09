export const monthsAndDays = [
  {
    month: 1,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
  {
    month: 2,
    days: Array.from({ length: 28 }, (v, i) => i + 1), // For non-leap years
  },
  {
    month: 3,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
  {
    month: 4,
    days: Array.from({ length: 30 }, (v, i) => i + 1),
  },
  {
    month: 5,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
  {
    month: 6,
    days: Array.from({ length: 30 }, (v, i) => i + 1),
  },
  {
    month: 7,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
  {
    month: 8,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
  {
    month: 9,
    days: Array.from({ length: 30 }, (v, i) => i + 1),
  },
  {
    month: 10,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
  {
    month: 11,
    days: Array.from({ length: 30 }, (v, i) => i + 1),
  },
  {
    month: 12,
    days: Array.from({ length: 31 }, (v, i) => i + 1),
  },
];

export const years = Array.from({ length: 104 }, (v = 1920, i) => v + i);
