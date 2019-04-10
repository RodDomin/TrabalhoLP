var fs = require('fs');

module.exports = {

    escreveArq: (data) =>{

        var json = {
            Code: data[0],
            Name: data[1],
            Manufacturer: data[2],
            Year: data[3],
            BuyPrice: data[4],
            SalePrice: data[5]
        }
        var jsonData = JSON.stringify(json);
    
        fs.writeFile(`./Data/${data[0]}.json`, jsonData, (err) => {
            if(err){
                console.log(err);
            }
        });
    },

    removeArq: () => {

    }
};
