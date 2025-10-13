(()=>{
  const conversions = [];
  
  // String to Number
  conversions.push(Number("123")); 
  conversions.push(Number("123abc"));
  conversions.push(Number(""));
  conversions.push(Number(" ")); 
  
  // Boolean to Number
  conversions.push(Number(true)); 
  conversions.push(Number(false));
  
  // Null and Undefined to Number
  conversions.push(Number(null));
  conversions.push(Number(undefined)); 
  
  // String to Boolean
  conversions.push(Boolean("")); 
  conversions.push(Boolean(" ")); 
  conversions.push(Boolean("false")); 
  
  // Number to String
  conversions.push(String(123)); 
  conversions.push(String(0)); 
  conversions.push(String(NaN)); 
  conversions.push(String(Infinity)); 
  
  // Boolean to String
  conversions.push(String(true)); 
  conversions.push(String(false)); 
  
  // Null and Undefined to String
  conversions.push(String(null)); 
  conversions.push(String(undefined));
  
  // Number to Boolean
  conversions.push(Boolean(0)); 
  conversions.push(Boolean(1)); 
  conversions.push(Boolean(NaN)); 
  conversions.push(Boolean(Infinity)); 
  
  // Implicit Coercion in Operations
  conversions.push("5" + 1); 
  conversions.push("5" - 1); 
  conversions.push("5" * 2); 
  conversions.push("5" / 2); 
  conversions.push("5" % 2); 
  
  // Coercion with ==
  conversions.push(5 == "5");
  conversions.push(false == 0); 
  conversions.push(null == undefined); 
  conversions.push([] == false); 
  conversions.push([] == ""); 
  conversions.push([1,2] == "1,2"); 
  
  // Coercion with ===
  conversions.push(5 === "5"); 
  conversions.push(false === 0); 
  conversions.push(null === undefined); 
  conversions.push([] === false); 
  conversions.push([] === "");
  conversions.push([1,2] === "1,2"); 
  
  console.log(conversions);
  })();