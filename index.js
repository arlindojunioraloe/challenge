'use strict';
var express = require('express');
var router = express.Router();
var ordenado;

function getDATA() {
    var fs = require('fs');
    var jsonContent = fs.readFileSync('./products.json', 'utf8');
    try {
        var data = JSON.parse(jsonContent)
        console.log(data[1]);
        return data;
    } catch (err) {
        console.error(err)
    }
}

/* Filtra ordenação menor preço*/
function ordenaCRESC() {
    //var ordenado = getDATA();
    try {
        ordenado.sort(function (a, b) {
            if (parseFloat(a.price) > parseFloat(b.price)) {
                return 1;
            }
            if (parseFloat(b.price) > parseFloat(a.price)) {
                return - 1;
            }
            return 0;
        });

    } catch (e) {
        console.error(err)
    }
    return ordenado;
}

/* Filtra ordenação maior preço*/
function ordenaDECRESC() {
    //var ordenado = getDATA();
    try {
        ordenado.sort(function (a, b) {
            if (parseFloat(a.price) > parseFloat(b.price)) {
                return -1;
            }
            if (parseFloat(b.price) > parseFloat(a.price)) {
                return 1;
            }
            return 0;
        });

    } catch (e) {
        console.error(err)
    }
    return ordenado;
}

/* Filtra pelo o atributo specifications */
function filtroSPEC(filtro) {
    ordenado = getDATA();
    try {
        if (filtro != undefined && filtro != "") {
            for (var i = 0; i < ordenado.length; i++) {
                var x = 0;
                for (var j = 0; j < ordenado[i].specifications.length; j++) {
                    if (ordenado[i].specifications[j] == filtro) {
                        x = x + 1;
                    }
                }
                if (x == 0) {
                    ordenado.splice(i, 1);
                    i = i - 1;
                }
            }
        }
        return ordenado;
    } catch (e) {
        console.error(err)
    }
    return ordenado;
}

/* GET home page. */
router.get('/', function (req, res) {
    ordenado = getDATA();
    res.render('index', { title: 'Express', data: getDATA()});
});

/* GET Ordem crescente. */
router.get('/crescente', function (req, res) {
    res.render('index', { data: ordenaCRESC() });
});

/* GET Ordem decrescente. */
router.get('/decrescente', function (req, res) {
    res.render('index', { data: ordenaDECRESC() });
});

/* POST Consulta por filtro. */
router.post('/busca', function (req, res) {
    const filtro = req.body.name;
    res.render('index', { data: filtroSPEC(filtro) });
});

module.exports = router;
