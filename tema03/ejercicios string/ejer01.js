(()=>{
  const conversions = [];
  
  // String to Number
  conversions.push(Number("123")); // 123
  conversions.push(Number("123abc")); // NaN
  conversions.push(Number("")); // 0
  conversions.push(Number(" ")); // 0 
  
  // Boolean to Number
  conversions.push(Number(true)); // 1
  conversions.push(Number(false)); // 0
  
  // Null and Undefined to Number
  conversions.push(Number(null)); // 0
  conversions.push(Number(undefined)); // NaN 
  
  // String to Boolean
  conversions.push(Boolean("")); // false
  conversions.push(Boolean(" ")); // true
  conversions.push(Boolean("false")); // true
  
  // Number to String
  conversions.push(String(123)); // "123"
  conversions.push(String(0)); // "0"
  conversions.push(String(NaN)); // "NaN"
  conversions.push(String(Infinity)); // "Infinity"
  
  // Boolean to String
  conversions.push(String(true)); // "true"
  conversions.push(String(false)); // "false"
  
  // Null and Undefined to String
  conversions.push(String(null)); // "null"
  conversions.push(String(undefined)); // "undefined"
  
  // Number to Boolean
  conversions.push(Boolean(0)); // false
  conversions.push(Boolean(1)); // true
  conversions.push(Boolean(NaN)); // false
  conversions.push(Boolean(Infinity)); // true
  
  // Implicit Coercion in Operations
  conversions.push("5" + 1); // "51"
  conversions.push("5" - 1); // 4
  conversions.push("5" * 2); // 10
  conversions.push("5" / 2); // 2.5
  conversions.push("5" % 2); // 1
  
  // Coercion with ==
  conversions.push(5 == "5"); // true
  conversions.push(false == 0); // true
  conversions.push(null == undefined); // true
  conversions.push([] == false); // true
  conversions.push([] == ""); // true
  conversions.push([1,2] == "1,2"); // true
  
  // Coercion with ===
  conversions.push(5 === "5"); // false
  conversions.push(false === 0); // false
  conversions.push(null === undefined); // false
  conversions.push([] === false); // false
  conversions.push([] === ""); // false
  conversions.push([1,2] === "1,2"); // false
  
  console.log(conversions);
  })();