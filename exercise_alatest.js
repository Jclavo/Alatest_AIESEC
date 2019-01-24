/**
 * @file Programming exercise Alatest
 * @Author José Clavo Tafur
 *
 * The goal with this exercise is to write a program that can handle any number
 * of price lists (operators) and then can calculate which operator that is cheapest
 * for a certain number.
 *
 */

/**
 * Find the cheapest operator for a phone number.
 * @param operators     			Array of operator's objects
 * @param phoneNumber				Number to compare with each operator prefix
 * @returns cheapestOperatorIndex   The cheapest "price" of operator's array index, otherwise -1
 */
function searchCheapestOperator(operator,phoneNumber)
{
	var cheapestOperatorIndex = searchCheapestOperatorIndex(operator,phoneNumber)
	
	if (cheapestOperatorIndex != '-1')
	{
		return operator[cheapestOperatorIndex]
	}
	return cheapestOperatorIndex
}


/**
 * Add a operator and its information (prefix and price)
 * @param operators Array of operator's objects
 * @param operator  Operator's description
 * @param prefix	Operator's prefix
 * @param price		Operator's price
 * @returns
 */
function addOperatorInfo(operators,operator,prefix,price) {
  
  var operatorInfo = {
  operator : operator,
  prefix   : prefix,
  price    : price
  };
  
  operators.push(operatorInfo)
}

/**
 * Find the cheapest operator index for a phone number.
 * @param operators     			Array of operator's objects
 * @param phoneNumber				Number to compare with each operator prefix
 * @returns cheapestOperatorIndex   The cheapest "price" of operator's array index, otherwise -1
 */
function searchCheapestOperatorIndex(operators,phoneNumber)
{
//variables
	var cheapestOperatorsIndexes = []
		flagExistOperator = 0
	    lengthOperators = 0
	    lengthCheapestOperators = 0
	    cheapestOperatorIndex = -1
	    i = 0
	    j = 0
	
//logic
	lengthOperators = operators.length
	
	for (i = 0; i < lengthOperators; i++) {
		
		if (comparePrefix(phoneNumber,operators[i]['prefix']) == 0) {
			
			/**
			 * Compare if the operator index is into the array cheapestOperatorsIndexes
			 * if it is, the highest prefix is saved. if there is not operator index into 
			 * the array cheapestOperatorsIndexes it is added
			 */
			
			flagExistOperator = 0
			lengthCheapestOperators = cheapestOperatorsIndexes.length
			
			for (j = 0; j < lengthCheapestOperators; j++) {
				
				if (operators[i]['operator'] == operators[cheapestOperatorsIndexes[j]]['operator'] ) {
					
					if (operators[i]['prefix'] > operators[cheapestOperatorsIndexes[j]]['prefix']) {
						cheapestOperatorsIndexes[j] = i	
					}
					flagExistOperator = -1
				}
				
			}
			if (flagExistOperator == 0) {
				cheapestOperatorsIndexes.push(i)
			}

		}
	}
	
	lengthCheapestOperators = cheapestOperatorsIndexes.length
	if (lengthCheapestOperators > 0) {
		cheapestOperatorIndex =  searchCheapestPrice(operators,cheapestOperatorsIndexes)
	}
	return cheapestOperatorIndex
}

/**
 * Find the cheapest operator from a list which only contains the longest prefix by operator
 * @param operators					= Array of operator's objects
 * @param cheapestOperatorsIndexes  = Indexes' list which only contains the longest prefix by operator
 * @returns cheapestOperatorIndex   = The cheapest "price" of cheapestOperatorsIndexes's array index, otherwise -1
 */
function searchCheapestPrice(operators,cheapestOperatorsIndexes)
{	
	var lengthCheapestOperators = 0
	    cheapestOperatorIndex = -1
	    i = 0
	
	lengthCheapestOperators = cheapestOperatorsIndexes.length
	
	for (i = 0; i < lengthCheapestOperators; i++) {
		if(i == 0)
		{
			cheapestOperatorIndex = cheapestOperatorsIndexes[i]
		}
		else
		{
			if (operators[cheapestOperatorsIndexes[i]]['price'] < operators[cheapestOperatorIndex]['price'])
			{
				cheapestOperatorIndex = cheapestOperatorsIndexes[i]
			}	
		}
	}
	return cheapestOperatorIndex
}

/**
 * It compares if prefix (as a whole value) is into PhoneNumber
 * this comparison starts from index 0. 
 * @param phoneNumber  Number to be compared with prefix
 * @param prefix       Prefix of every operator
 * @returns 		   if the comparison is successful it returns 0, otherwise -1
 */
function comparePrefix(phoneNumber,prefix)
{
  if (phoneNumber == prefix) {
    return 0
  }
  if (prefix.length == 0) {
    return -1
  }
  for (var i = 0; i < prefix.length; i++) {
    if (phoneNumber.charAt(i) != prefix.charAt(i)) {
      return -1
    }
  }
  return 0
}


// Test

var arrayOperators = []

//Data Operator A
addOperatorInfo(arrayOperators,'A','1','0.9')
addOperatorInfo(arrayOperators,'A','268','5.1')
addOperatorInfo(arrayOperators,'A','46','0.17')
addOperatorInfo(arrayOperators,'A','4620','0.0')
addOperatorInfo(arrayOperators,'A','468','0.15')
addOperatorInfo(arrayOperators,'A','4631','0.15')
addOperatorInfo(arrayOperators,'A','4673','0.9')
//addOperatorInfo('A','4673','1.1')
addOperatorInfo(arrayOperators,'A','46732','1.1')

//Data Operator B
addOperatorInfo(arrayOperators,'B','1','0.92')
addOperatorInfo(arrayOperators,'B','44','0.5')
addOperatorInfo(arrayOperators,'B','46','0.2')
addOperatorInfo(arrayOperators,'B','467','1.0')
addOperatorInfo(arrayOperators,'B','48','1.2')

console.log(searchCheapestOperator(arrayOperators,'4620')) 
// { operator: 'A', prefix: '4620', price: '0.0' }
console.log(searchCheapestOperator(arrayOperators,'4673212345'))
// { operator: 'B', prefix: '467', price: '1.0' }
console.log(searchCheapestOperator(arrayOperators,'53212345'))
//  -1
console.log(searchCheapestOperator(arrayOperators,'4848212345')) 
// { operator: 'B', prefix: '48', price: '1.2' }
console.log(searchCheapestOperator(arrayOperators,'10000000'))
// { operator: 'A', prefix: '1', price: '0.9' }
console.log(searchCheapestOperator(arrayOperators,'68123456789'))
//  -1
console.log(searchCheapestOperator(arrayOperators,'4629900'))
// { operator: 'A', prefix: '46', price: '0.17' }
