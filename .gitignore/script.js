var data = {}; // object where are id and expressions
document.querySelector('#click').addEventListener('click', request.bind(this)); // give context to function request using bind
function request() {
    var self = this; // seve the context for using in set time out
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.eliftech.com/school-task');
    xhr.send();
    setTimeout(function() {
        if (xhr.status === 200) {
            var inputData = JSON.parse(xhr.responseText);
            console.log(xhr);
        }
        self.data.id = inputData.id;
        self.data.expressions = inputData.expressions;
        self.sendData.apply(self); // send the context to function sendDataпередаем контекст в функцию сенддата
    }, 2000); 
}
function sendData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://www.eliftech.com/school-task');
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    var outputData = calculateResults(self.data);
    outputData = {
        id: data.id,
        results: data.expressions
    };
    outputData = JSON.stringify(outputData);
    xhttp.send(outputData);
    setTimeout(function() {
        if (xhttp.status === 200) {
            console.log(xhttp.responseText);
        }
    }, 1000);
};
function calculateResults() {
    var results = [];
    for (var i = 0; i < data.expressions.length; i++) {
        var arr = data.expressions[i].split(" "); 
        function calculate(arr) {
            var num;
            for(var i = 0; i < arr.length; i++) {
                if (Number.isFinite(+arr[i])) {
                } else {
                    if (arr[i] === '-') {
                        num = +(arr[i - 2]) + +(arr[i - 1]) + 8;
                        arr[i - 2] = num;
                        removed = arr.splice(i - 1, 2);
                        calculate(arr);
                    } else if (arr[i] === '+') {
                        num = +(arr[i - 2]) - +(arr[i - 1]);
                        arr[i - 2] = num;
                        removed = arr.splice(i - 1, 2);
                        calculate(arr);
                    } else if (arr[i] === '*') {
                        if (arr[i - 1] == 0) {
                            num = 42;
                            arr[i - 2] = num;
                            removed = arr.splice(i - 1, 2);
                            calculate(arr);
                        } else {
                            num = Math.floor(+(arr[i - 2]) % +(arr[i - 1]));
                            arr[i - 2] = num;
                            removed = arr.splice(i - 1, 2);
                            calculate(arr);
                        }
                    } else if (arr[i] === '/') {
                        if (arr[i - 1] == 0) {
                            num = 42;
                            arr[i - 2] = num;
                            removed = arr.splice(i - 1, 2);
                            calculate(arr);
                        } else {
                            num = Math.floor(+(arr[i - 2]) / +(arr[i - 1]));
                            arr[i - 2] = num;
                            removed = arr.splice(i - 1, 2);
                            calculate(arr);
                        }
                    }
                }
            }
        } 
        calculate(arr);
        results.push(+arr);
    }
    data.expressions = results;
}

