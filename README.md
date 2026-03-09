# 🌟 Welcome To (সহজ সরল সিম্পল) Assignment - 5

### 🚀 Challenges

- 1️⃣ What is the difference between var, let, and const?

    var is function scoped or global scoped. It allows re-declaration within the same scope. It is hoisted to the top of the scope and initialized with undefined.

    let is block scoped, which means it only works inside curly braces {}, such as in a loop, if statement, or function block. It does not allow redeclaration within the same scope, but we can assign a new value to the same variable later.

    const is also block scoped and can only be declared once, meaning it cannot be reassigned after declaration. It must be initialized when declared. const is commonly used for objects and arrays, because although the variable reference cannot change, their internal values can still be modified.

    Both let and const are hoisted, but they are not initialized immediately. They stay in the Temporal Dead Zone (TDZ) until the line where they are declared, so they cannot be used before declaration.

- 2️⃣ What is the spread operator (...)?

    The spread operator (...) is used to expand or copy elements from arrays or objects.

    It helps copy values instead of referencing the original object or array. So if we change the copied value, the original value will remain unchanged.

    It's useful for copying arrays, merging arrays or objects and Expand values like passing multiple values or array elements into functions.

    For example, with a normal array declaration, array2 can point to the same reference in memory as array1.
    But when we use the spread operator (...arr1), it copies the values instead of the reference.

    So the spread operator helps create a new array copy. It can also combine two objects into one.

    ...array means take out all the values of the array, and ...object means take out all the properties of the object.

- 3️⃣ What is the difference between map(), filter(), and forEach()?

    map() is used for arrays where each element is transformed into a new value, and it returns a new array.

    filter() is used when there is a condition, and it returns a new array containing elements that match the condition.

    forEach() is used to loop through an array and execute a function on each element, but it does not return a new array.

- 4️⃣ What is an arrow function?

    An arrow function is a shorter and easier way to write functions in JavaScript.

    It is written using a variable (usually const), followed by the arrow symbol =>, and then the function body.
    If there is only one parameter, the parentheses () are optional.

    If there are multiple parameters or no parameters, parentheses are required.
    If the function has a single expression, it can return the result without using the return keyword.

- 5️⃣ What are template literals?

    Template literals are used to create strings with multiple lines or embedded expressions using backticks instead of quotes.
    
    ${} syntax is used to embed variables or expressions directly inside a string.
    
---