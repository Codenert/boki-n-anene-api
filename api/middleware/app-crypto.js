exports.get_secret = () => {

    var data = process.env.API_KEY.split("-")
    console.log('original: ' + data.join("-"))

    var result = []
    var finalResult = ""
    data.forEach(element => {
        result.push(splitNumberAndLetters(element))
    });
    data = result
    console.log('after step one: ' + data.join('-'))

    // find the max value
    var newString = combine(data[1], data[2], data[3])

    data = [data[0], newString, data[4]]
    console.log(data.join('-'))

    data[0] =  "!@#%^&*" + data[0] 
    data[data.length-1] = data[data.length-1] + ")("

    console.log(data.join('-'))

    newString = combine(data[0], data[1], data[2])

    data = newString

    return data
}

splitNumberAndLetters = (input) => {
    var result = []
    var numbers = ""
    var letters = ""
    for (var i = 0; i<input.length; i++) {
        var element = input.charAt(i)
        if (element.charCodeAt(0) >= 48 && element.charCodeAt(0) <= 57) {
            if (letters) {
                result.push(letters)
                letters = ""
            }
            numbers += element
        } else {
            if (numbers) {
                result.push(change(numbers))
                numbers = ""
            }
            letters += element
        }
    }

    if (numbers) {
        result.push(change(numbers))
    }

    if (letters)
        result.push(letters)

    return result.join("")
    
}

combine = (first, second, third) => {
    var length = [first.length, second.length, third.length].max()
    var newString = ""
    for (var i=0; i<length; i++) {
        var s = first.charAt(i) ? first.charAt(i) : "X"
        var t = second.charAt(i) ? second.charAt(i) : "X"
        var f = third.charAt(i) ? third.charAt(i) : "X"
        newString += s + t + f
    }
    return newString
}

change = (numbers) => {
    var number = 0
    // special number
    if (numbers == "01" || numbers == "02" || numbers == "03" || numbers == "04" || numbers == "05" || numbers == "06"
    || numbers == "07" || numbers == "08" || numbers == "09") {
        number = parseInt(numbers)
        numbers = number.isEven() ? "0" + (number / 2) : "A0" + ((number + 1) / 2)
    } else {
        number = parseInt(numbers)

        numbers = number.isEven() ? numbers / 2 : "A" + (number + 1) / 2
    }

    return numbers
}

Number.prototype.isEven = function() {
    return this % 2 === 0
}

Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };