module.exports = (temp , product)=>{
    let output =temp.replace(/{%productname%}/g,product.productName);
    output =output.replace(/{%image%}/g,product.image);
    output =output.replace(/{%id%}/g,product.id);
    output =output.replace(/{%country%}/g,product.from);
    output =output.replace(/{%quantity%}/g,product.quantity);
    output =output.replace(/{%price%}/g,product.price);
    output =output.replace(/{%description%}/g,product.description);
    output =output.replace(/{%nutrients%}/g,product.nutrients);
    if (!product.organic){
        output=output.replace(/{%not-organic%}/g,'not-organic');
    }
    return output ; 
}