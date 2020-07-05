const fs = require('fs');
const concesionarias = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));
const autosController ={
    index:function(req,res){
        res.set({'content-type':'text/plain;charset=utf-8'});
        res.write('_________________________\n\n');
        res.write('Estos son TODOS los autos\n');
        res.write('_________________________\n\n');
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                res.write('-------------------------------\n');
                res.write('MARCA: ' + auto.marca + '\n');
                res.write('MODELO: ' + auto.modelo + '\n');
                res.write('ANIO: ' + auto.anio + '\n');
                res.write('COLOR: ' + auto.color + '\n');
                res.write('-------------------------------\n');
            })
        })
        res.end();
    },
    filtroAutos:function(req,res){
        res.set({'content-type':'text/plain;charset=utf-8'});
        let idMarca = req.params.idmarca;
        let luz = false;
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                if(auto.marca == idMarca){
                    luz = true;
                }
            })
        })
        if(luz == true){
            res.write('____________________________________________\n\n');
            res.write('Estas son los autos de la marca ' + idMarca + '\n');
            res.write('____________________________________________\n\n');
            }
        luz = false;
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                if(auto.marca == idMarca){
                    res.write('-------------------------------\n');
                    res.write('MARCA: ' + auto.marca + '\n');
                    res.write('MODELO: ' + auto.modelo + '\n');
                    res.write('ANIO: ' + auto.anio + '\n');
                    res.write('COLOR: ' + auto.color + '\n');
                    res.write('-------------------------------\n\n');
                    luz = true;
                }
            })
        })
        if(luz == false){
            res.write('No se encontraron las marcas con ese nombre')
        }
        res.end()
    },
    datoMarca:function(req,res){
        res.set({'content-type':'text/plain;charset=utf-8'});
        let idMarca = req.params.idmarca;
        let idDato = req.params.dato;
        let luz = false;
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                if(auto.anio == idDato){
                    luz = true
                }
            })
        })
        concesionarias.forEach(function(sucursal){
            sucursal.autos.forEach(function(auto){
                if(auto.color == idDato){
                    luz = true
                }
            })
        })
        if (luz == true) {
            res.write('____________________________________________________________________\n\n');
            res.write('Estas viendo el auto de la marca ' + idMarca + ' con su ' + idDato + '\n');
            res.write('____________________________________________________________________\n\n');
        }
        luz == false;
        
        concesionarias.forEach(function(sucursal){
            let color = sucursal.autos.filter(function(auto){
                return (auto.color == idDato || auto.anio == idDato) && auto.marca == idMarca
            })
            color.forEach(function(colorsito){
                res.write('---------------------------\n\n')
                res.write('MARCA: '+ colorsito.marca+ '\n')
                res.write('MODELO: '+ colorsito.modelo+ '\n')
                res.write('AÑO: '+ colorsito.anio+ '\n')
                res.write('COLOR: '+ colorsito.color+'\n')
                res.write('---------------------------\n\n')
                luz == true;
            })
        })
        if(luz == false){
            res.write(`No se encontro el dato ingresado de la marca ${idMarca}`)
        }

        res.end();
    }, 
}

module.exports = autosController