'use strict'
// connect the table and the form in js
let formEl = document.getElementById('myForm');
let tableEl= document.getElementById('myTable');
// build the constructor
let dataArray=[];
function Order(custName,type){
    this.custName=custName;
    this.type=type;
    this.minPrice=7;
    this.maxPrice=20;
    dataArray.push(this)

}
// generate Random function 
Order.prototype.randomPrice=function(){
    return Math.floor(Math.random() * (this.maxPrice - this.minPrice) -this.minPrice )
}
// active the form 
formEl.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault();
    let custName=event.target.custName.value;
    let type=event.target.type.value;
    let newOrder=new Order(custName,type);
      

    setitems()
    newOrder.render();

}

// render the data from form into a table 
Order.prototype.render=function(){
    
    tableEl.textContent='';

    let th1El=document.createElement('th');
    tableEl.appendChild(th1El);
    th1El.textContent='Order Image';
    let th2El=document.createElement('th');
    tableEl.appendChild(th2El);
    th2El.textContent='Order Detials'

    for (let index = 0; index < dataArray.length; index++) {
        console.log(dataArray)
        let trEl= document.createElement('tr')
        tableEl.appendChild(trEl);
        let td1El = document.createElement('td');
        trEl.appendChild(td1El);
        let imgEl= document.createElement('img');
        imgEl.src =`/img/${this.type}.jpg`
        td1El.appendChild(imgEl);
        //something wrrong here when I appened child the img 
        let td2El = document.createElement('td');
        trEl.appendChild(td2El);
        td2El.textContent=`Customer Name: ${this.custName} , Food Type :  ${this.type} Food Price:${this.randomPrice()}  `
    

    }    

}

//save table data in localStorage and get the data from it 
function setitems(){
    let data=JSON.stringify(dataArray);
    localStorage.setItem('Order', data);
}

function getitems(){
    let sObj= localStorage.getItem('Order');
    let nObj = JSON.parse(sObj);
    console.log(nObj)
    if (nObj !== null){
        // dataArray=nObj;
        for (let index = 0; index < nObj.length; index++) {
            let newObj;
            newObj= new Order(nObj[index].custName , nObj[index].type)
            
            
        }
        newObj.render();
    }

}
getitems();