//reading the data and making it one big array
const fs=require("fs");
let data=fs.readFileSync("data.txt","utf-8");
data=data.split("\n")
// console.log(data);

//making it an array of objects like --api
let sales=[];
let months=["january","february","march"]
for(let i=1;i<data.length;i++){
    let currdata=data[i].trim().split(",")
    sales.push({
        date:currdata[0],
        itemname:currdata[1],
        priceforone:currdata[2],
        quantity:currdata[3],
          totalprice:currdata[4]
        
    })
}
// console.log(sales)

//Q.1 total sales of store
function totalsalesofstore(){
    let totalsales=0;
    sales.map((item)=>{
        totalsales +=parseInt(item.totalprice)
    })
    return totalsales
}
console.log(`Total sales of store --->${totalsalesofstore()}`)


//Q.2 monthwise sales total
function monthwisesales(){
let results={}
sales.map((item)=>{
    let month=new Date(item.date).getMonth()
    if(results[months[month]] !=undefined){
        results[months[month]] +=parseInt(item.totalprice)
    }
    else{
        results[months[month]]=parseInt(item.totalprice)
    }
})
return results
}
console.log(monthwisesales())

// Q.3 Most popular item (most quantity sold) in each month.
function mostpopularitem(){
    let results={}
    for(let i=0;i<=2;i++){
        let mp=new Map()
     for(let item of sales){
            let month=new Date(item.date).getMonth()
            if(month>i){
                break;
            }
            if(month===i){
                if(mp.has(item.itemname)){
                      mp.set(item.itemname,mp.get(item.itemname) + parseInt(item.quantity))
                }
                else{
                    mp.set(item.itemname,parseInt(item.quantity))
                }
            }

        }
        let maxquantity=Number.MIN_SAFE_INTEGER;
        let itemname;
        for(key of mp){
            if(key[1]>maxquantity){
                 maxquantity=key[1];
                 itemname=key[0]
            }
        }
         results[months[i]]={
            nameofitem:itemname,
            quantity:maxquantity
         }
    }
    return results;
}
console.log(mostpopularitem())


//Q.4  Items generating most revenue in each month.
function mostrevenueitem(){
    let results={}
    for(let i=0;i<=2;i++){
        let mp=new Map()
     for(let item of sales){
            let month=new Date(item.date).getMonth()
            if(month>i){
                break;
            }
            if(month===i){
                if(mp.has(item.itemname)){
                      mp.set(item.itemname,mp.get(item.itemname) + parseInt(item.totalprice))
                }
                else{
                    mp.set(item.itemname,parseInt(item.totalprice))
                }
            }

        }
        let maxrevenue=Number.MIN_SAFE_INTEGER;
        let itemname;
        for(key of mp){
            if(key[1]>maxrevenue){
                 maxrevenue=key[1];
                 itemname=key[0]
            }
        }
         results[months[i]]={
            nameofitem:itemname,
            Revenue:maxrevenue
         }
    }
    return results;
}
console.log(mostrevenueitem())





//Q.5 For the most popular item, find the min, max and average number of orders each month.
let x=mostpopularitem()
// console.log(Object.keys(x).length)
let maxorderofmostpopular=0;
let minorderofmostpopular=Number.MAX_SAFE_INTEGER;
let avgofmostpopular=0;
let minmonth;
let maxmonth;

//for finding maxsale
for(let i=0;i<=2;i++){
if(x[months[i]].quantity > maxorderofmostpopular){
    maxorderofmostpopular=x[months[i]].quantity
    maxmonth=months[i]
}
}


//for finding minsale
for(let i=0;i<=2;i++){
    if(x[months[i]].quantity < minorderofmostpopular){
        minorderofmostpopular=x[months[i]].quantity
        minmonth=months[i]
    }
    }

//for finding avg sale     
for(let i=0;i<=2;i++){
    avgofmostpopular +=x[months[i]].quantity
        
    }
    

console.log(`max order of ${x[months[0]].nameofitem} is ${maxorderofmostpopular} done in ${maxmonth}`)
console.log(`min order of ${x[months[0]].nameofitem} is ${minorderofmostpopular} done in ${minmonth}`)
console.log(` the avg order of ${x[months[0]].nameofitem}is ${avgofmostpopular/Object.keys(x).length}`)
