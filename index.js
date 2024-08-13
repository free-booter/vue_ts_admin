let salesData = [
  { country: 'USA', year: 2020, sales: 500000 },
  { country: 'China', year: 2020, sales: 450000 },
  { country: 'Germany', year: 2020, sales: 300000 },
  { country: 'India', year: 2020, sales: 200000 },
  { country: 'Brazil', year: 2020, sales: 150000 },
  { country: 'USA', year: 2021, sales: 550000 },
  { country: 'China', year: 2021, sales: 470000 },
  { country: 'Germany', year: 2021, sales: 320000 },
  { country: 'India', year: 2021, sales: 220000 },
  { country: 'Brazil', year: 2021, sales: 160000 },
  { country: 'USA', year: 2022, sales: 600000 },
  { country: 'China', year: 2022, sales: 490000 },
  { country: 'Germany', year: 2022, sales: 340000 },
  { country: 'India', year: 2022, sales: 240000 },
  { country: 'Brazil', year: 2022, sales: 170000 },
  { country: 'USA', year: 2023, sales: 650000 },
  { country: 'China', year: 2023, sales: 510000 },
  { country: 'Germany', year: 2023, sales: 360000 },
  { country: 'India', year: 2023, sales: 260000 },
  { country: 'Brazil', year: 2023, sales: 180000 },
  { country: 'USA', year: 2024, sales: 700000 },
  { country: 'China', year: 2024, sales: 530000 },
  { country: 'Germany', year: 2024, sales: 380000 },
  { country: 'India', year: 2024, sales: 280000 },
  { country: 'Brazil', year: 2024, sales: 190000 },
]

const years = salesData.reduce((prev,cur) => {
  if(!prev.includes(cur.year)) {
    prev.push(cur.year)
  }
  return prev
},[])
console.log(years);
const arr = []
salesData.forEach(element => {
  arr.push(Object.values(element))
});
console.log(arr.flat(1));

