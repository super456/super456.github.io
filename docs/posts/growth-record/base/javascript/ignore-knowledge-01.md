---
title: 容易被忽略的知识点（一）
date: 2018-06-23 20:05:01
tag:
 - JavaScript
categories:
 - 前端进击
---
# 容易被忽略的知识点（一）
学习JavaScript也有一段时间了，但是总有一些基础知识点容易搞混或者忘记，所以当自己回顾这些这些知识点的时候会模糊不清，又要重新看一遍资料，为了以后方便，所以这里记录一下，也是为了更深入的理解透彻。

## （一）、函数

1. 使用未声明的变量时，它将自动被视为全局变量，即便你在函数中首次使用它亦如此。

   ```javascript
      function playTurn(player,location){
    //    使用变量points前，我们忘了关键字var声明它，因此它被自动视为全局变量
       points=0;
       if(location==1){
           points=points+100;
       }
       return points;
     }

   ```

2. 如果局部变量与全局变量同名，它将“遮住”全局变量。

   ```javascript
   var beanCounter=10;//全局变量
   function getNumberOfItems(ordertype){
       var beanCounter=0;//局部变量
       if(ordertype=="order"){
        //
       }
       return beanCounter;
   }
   ```

   因此每次调用函数使用的是局部变量beanCounter时，都会遮住全局变量，但是全局变量和局部变量不会相互影响：如果你修改其中的一个，对另一个不会有任何影响，它们是彼此独立的变量。

3. 如果形参与全局变量同名，它会遮住全局变量。

4. 函数声明和函数表达式区别：
   - 使用函数声明时，函数将在执行代码前创建；而使用函数表达式时，函数将在运行阶段执行代码时创建。（简单的说浏览器执行代码分两遍时，第一遍分析所有的函数声明，并定义函数声明创建的函数，第二遍浏览器从上到下顺序执行代码，并定义函数表达式创建的函数。）

   - 使用函数声明时，将创建一个与函数同名的变量，并让它指向函数；而使用函数表达式时，通常不给函数指定名称，因此你要么在代码中将函数赋给一个变量，要么以其他方式使用函数表达式。

5. 函数用法：可以将函数赋给变量；可以将函数传递给函数；可以从函数返回函数。

   ```javascript
      //可以将函数传递给函数
     //定义一个对象变量
           var passengers = [{
            name: "dudu",
            paid: true,
            ticket: "firstclass"
        }, {
            name: "jane",
            paid: true,
            ticket: "coach"
        }, {
            name: "Sue",
            paid: false,
            ticket: "firstclass"
        }, {
            name: "Fujia",
            paid: true,
            ticket: "caoach"
        }];
        //创建一个传递函数，参数一个是对象一个是函数
        function processPassengers(passengers, testFunction) {
            for (var i = 0; i < passengers.length; i++) {
                if (testFunction(passengers[i].name)) {
                    return false;
                }
            }
            return true;
        }

        //创建需要作为参数传递的函数
        function checkNoFlyList(passenger) {
            return (passenger.name === "dudu");
        }

        // 向函数传递函数
        var allCanFly = processPassengers(passengers, checkNoFlyList);//第一个参数是对象，第二个参数是函数
        if (allCanFly) {
            alert("这架飞机不能起飞，因为有乘客在禁飞名单里面");
        }
   ```

   ```javascript
   //可以从函数返回函数
   //定义一个对象变量
      var passengers = [{
            name: "dudu",
            paid: true,
            ticket: "firstclass"
        }, {
            name: "jane",
            paid: true,
            ticket: "coach"
        }, {
            name: "Sue",
            paid: false,
            ticket: "firstclass"
        }, {
            name: "Fujia",
            paid: true,
            ticket: "caoach"
        }];

       function createDrinkOrder(passenger) {
            var orderFunction;//创建一个变量用于存储要返回的函数
            if (passenger.ticket === "firstclass") {
                orderFunction = function() {//定义返回的函数代码
                    alert("Would you like a cocktail or wine?");
                };
            } else {
                orderFunction = function() {//定义返回的函数代码
                    alert("Your choice is cola or water.");
                };
            }
            return orderFunction;//返回创建的函数
        }

        function serveCustomer(passenger) {
            var getDrinkOrderFunction = createDrinkOrder(passenger);//注意这里是将返回的函数赋给变量引用
            getDrinkOrderFunction();//引用变量指向返回的函数

        }

        function servePassengers(passengers) {
            for (var i = 0; i < passengers.length; i++) {
                serveCustomer(passengers[i]);
            }
        }

        servePassengers(passengers);

   ```

## （二）、对象

1. 可以随时增删属性： `fido.dogYears=35;`就新增对象fido的一个属性dogYears，并赋值为35 , `delete fido.dogYears;`删除了一个对象fido的属性dogYears，如果成功删除了属性，delete表达式将返回true，仅当属性无法删除时，delete才返回false。如果对象属于浏览器而受到保护，即便你要删除的属性在对象中不存在，delete也将返回true。

2. 对象变量存储的不是对象本身，而是指向对象的引用，因此对象变量也被称为引用变量。

3. 向函数传递对象时，函数获得的是指向该对象的引用的副本，而不是对象本身的副本。因此，如果在函数中修改属性的值，修改的将是原始对象的值。

4. 调用对象的方法时，关键字this指向其方法被调用的对象。要在对象的方法中访问对象的属性，必须使用句点表示法，但使用关键字this而不是对象名。

   ```javascript
   var fiat={
       make:"Fiat",
       started:false,
       start:function(){
           this.started=true;
       },
       stop:function(){
           this.started=false;
       },
       drive:function(){
           if(this.started){
               alert("Zoom Zoom");
           }else{
               alert("You need to start the engine first.");
           }
       }
   };

   ```

5. 需要创建大量类似的对象时，适合使用构造函数。注意`new`和`this`的使用。

## （三）、类型

1. `undefined`类型:
   - 没有return语句的函数返回的值。
   - 未赋值的变量的值。
   - 稀疏数组中不存在的数组元素的值。
   - 已删除的属性的值。
   - 创建对象时没有赋给属性的值。

2. `null`表示对象不存在，跟`undefined`的区别是：在应该提供一个对象，但无法创建或找到时，将提供`null`；在变量未初始化、对象没有指定属性或数组没有指定元素时，将返回`undefined`。

3. `NaN`表示无法用数字表示的数值结果，但它的类型仍是数字，注意：`NaN!=NaN`。判断一个数是不是`NaN`，使用`isNaN()`。

   ```javascript
   var test=0/0;
   console.log(typeof test);//number
   ```

4. 在JavaScript中总共有5个假值：`undefined`，`null`，`0`，`""`和`false`；其他值都是真值。

## （四）、闭包

1. 闭包：名词，指的是函数和引用环境。包含自由变量的函数与为所有这些自由变量提供了变量绑定的环境一起，被称为闭包。

   ```javascript
           function makeCounter() {
            var count = 0;

            function Counter() {
                count = count + 1;
                return count;
            }
            return Counter;//这是一个闭包
        }
        var doCount = makeCounter();//调用函数试，获得的是一个闭包：一个函数及其环境
        console.log(doCount());
        console.log(doCount());

   ```

## （五）、原型

1. 原型：对象可以从其他对象那里继承属性和行为。更具体地说，js使用原型式继承，其中其行为被继承的对象称为原型（对象继承另一个对象后，就可以访问其多有的方法和属性）。

2. 给构造函数的原型添加属性后，使用这个构造函数创建的实例都将继承这些属性。即便是以前创建的实例也不例外。

3. 使用自定义的原型对象时，务必将原型的属性`constructor`设置为相应的构造函数，以保持一致。

4. 要调用函数并指定函数体中`this`指向的对象，可调用其方法`call()`；

   ```javascript
    //定义一个构造函数
    function Dog(name, breed, weight) {
            this.name = name;
            this.breed = breed;
            this.weight = weight;
        }
        //给构造函数原型添加属性
        Dog.prototype.species = "Canine";
        //给构造函数原型添加方法
        Dog.prototype.bark = function() {
            if (this.weight > 25) {
                console.log(this.name + "Says Woof");
            } else {
                console.log(this.name + "says Yip");
            }
        };

        Dog.prototype.run = function() {
            console.log("Run");
        };
        Dog.prototype.wag = function() {
            console.log("wag");
        };

        //定义一个继承Dog构造函数的新的构造函数
        function ShowDog(name, breed, weight, handler) {
            // this.name = name;
            // this.breed = breed;
            // this.weight = weight;

            // Dog(name, breed, weight);  后面调用Dog原型属性会返回undefined

            Dog.call(this, name, breed, weight);//注意这里要使用this
            this.handler = handler;
        }

        //
        //ShowDog.prototype = new Dog();
        ShowDog.prototype.constructor = ShowDog;//设置构造函数ShowDog的原型指向自己本身
        ShowDog.prototype.league = "Webville";
        ShowDog.prototype.stack = function() {
            console.log("Stack");
        };
        ShowDog.prototype.bait = function() {
            console.log("Bait");
        };

        ShowDog.prototype.gait = function(kind) {
            console.log(kind + "ing");
        }
        ShowDog.prototype.groom = function() {
            console.log("Groom");
        }

        var scotty = new ShowDog("Scotty", "Scottish Terrish", 15, "Cookie");
        console.log(scotty.name); //undefined，原因是showDog中使用的是：        Dog(name, breed, weight);
        scotty.stack();
        scotty.bark();
        console.log(scotty.league);
        console.log(scotty.species);

        console.log("scotty constructor is:" + scotty.constructor); //showDog
   ```

## 参考文献
- 《Head First JavaScript 程序设计》
