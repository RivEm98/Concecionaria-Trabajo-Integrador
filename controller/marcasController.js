const fs = require('fs')
const concesionarias = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));
const marcasController ={
    index:function(req,res){
        res.set({'content-type':'text/plain;charset=utf-8'})
        res.write('_________________\n\n')
        res.write("Todas las marcas: \n")
        res.write('_________________\n\n')
        let mar =[];
        concesionarias.forEach(m=>{
            m.autos.forEach(m=>{
                mar.push(m.marca)
            })
        })
         mar = mar.filter((a, index) =>mar.indexOf(a) === index)
        mar.forEach(m=>{
            res.write("-"+m+"\n")

        })
       res.end()
    },
    filtroMarca:function(req,res){
        res.set({'content-type':'text/plain;charset=utf-8'})
        let idmarca = req.params.idmarca;
        let luz = false;
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                if(auto.marca == idmarca){
                    luz = true;
                }
            })
        })
        if(luz == true){
        res.write('______________________________________________\n\n')
        res.write('Estas viendo los autos de la marca ' +'"'+ idmarca+'"' +'\n')
        res.write('______________________________________________\n\n')
        }
        luz = false;
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                if(auto.marca == idmarca){
                    res.write('-------------------------------\n');
                    res.write('MARCA: ' + auto.marca + '\n');
                    res.write('MODELO: ' + auto.modelo + '\n');
                    res.write('AÑO: ' + auto.anio + '\n');
                    res.write('-------------------------------\n\n');
                    luz = true;
                }
            })  
        })
        
        if(luz == false){
            res.write('No se encontraron las marcas con ese nombre')
        }
        res.end()
    }
}

module.exports = marcasController