const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']
// Exercise 1: Logging each name
names.forEach((name) => {
    console.log(name);
  });
  // Exercise 2: Logging each name with a matching province
  names.forEach((name, index) => {
    const province = provinces[index];
    console.log(`${name} (${province})`);
  });
  // Exercise 3: Converting province names to uppercase
  const uppercaseProvinces = provinces.map((province) => {
    return province.toUpperCase();
  });
  console.log(uppercaseProvinces);
  // Exercise 4: Creating an array with the amount of characters in each name
  const nameLengths = names.map((name) => {
    return name.length;
  });
  console.log(nameLengths);
  // Exercise 5: Sorting provinces alphabetically
  const sortedProvinces = provinces.sort();
  console.log(sortedProvinces);
  //NUMBER 2
  const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  // Exercise 1: Logging each product name
  products.forEach((product) => {
    console.log(product.product);
  });
  // Exercise 2: Filtering out products with names longer than 5 characters
  const filteredProducts = products.filter((product) => {
    return product.product.length <= 5;
  });
  console.log(filteredProducts);
  // Exercise 3: Converting prices to numbers and removing products without prices,
  // then calculating the combined price using reduce
  const combinedPrice = products
    .filter((product) => product.price !== '' && !isNaN(product.price))
    .map((product) => {
      product.price = Number(product.price);
      return product;
    })
    .reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  console.log(combinedPrice);
  // Exercise 4: Concatenating all product names using reduce
  const concatenatedNames = products.reduce((acc, product, index) => {
    acc += product.product;
    if (index < products.length - 1) {
      acc += ', ';
    }
    return acc;
  }, '');
  console.log(concatenatedNames);
  // Exercise 5: Calculating the highest and lowest-priced items using reduce
  const priceStats = products.reduce(
    (acc, product) => {
      if (product.price !== '' && !isNaN(product.price)) {
        const price = Number(product.price);
        if (price > acc.highestPrice) {
          acc.highestPrice = price;
          acc.highestProduct = product.product;
        }
        if (price < acc.lowestPrice) {
          acc.lowestPrice = price;
          acc.lowestProduct = product.product;
        }
      }
      return acc;
    },
    { highestPrice: -Infinity, lowestPrice: Infinity, highestProduct: '', lowestProduct: '' }
  );
  const priceStatsString = `Highest: ${priceStats.highestProduct}. Lowest: ${priceStats.lowestProduct}`;
  console.log(priceStatsString);
  // Exercise 6: Recreating the object with modified keys using Object.entries and reduce
  const recreatedProducts = Object.entries(products).reduce((acc, [key, value]) => {
    const modifiedKey = key === 'product' ? 'name' : key === 'price' ? 'cost' : key;
    acc[modifiedKey] = value;
    return acc;
  }, {});
  console.log(recreatedProducts);