const express = require('express');
const router = express.Router();
const productos = require('../api/producto');



/// GET api/productos/listar-------------------------------------------------
router.get('/productos/listar',(req, res) => {
  try {

    if(productos.read().length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{
      res.type('json').send(JSON.stringify(productos.read(), null, 2) + '\n');
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});


// GET api/productos/listar/:id-------------------------------------------------
router.get('/productos/listar/:id', async (req, res) => {

  try {

    if (req.params.id>productos.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id-1;
      res.type('json').send(JSON.stringify(productos.read()[id], null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
});

// POST /api/productos/guardar-------------------------------------------------
router.post('/productos/guardar', async (req, res) => {

  try {
    let objeto=req.body;
    console.log('guardar');
    productos.save(objeto);


  } catch (e) {

    console.error({error : 'error al guardar'})
    res.status(500).send(JSON.stringify({error : 'error al guardar'}));
  }

});


// PUT /api/productos/actualizar/:id-------------------------------------------------
router.put('/productos/actualizar/:id', async (req, res) => {

  try {

    if (req.params.id>productos.read().length || req.params.id<1){
      res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
    } else{
      let id=req.params.id;
      let objeto=req.body;
      return res.type('json').send(JSON.stringify(productos.update(id,objeto), null, 2) + '\n');
    }
  } catch (e) {
    console.error({error : 'producto no encontrado'})
    res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
  }
  });

  // DELETE /api/productos/borrar/:id-------------------------------------------------
  router.delete('/productos/borrar/:id', async (req, res) => {

    try {
      //console.log(`id ${req.params.id} `);
      //if (req.params.id>controller.read().length || req.params.id<1){
      if (req.params.id<1){
        res.type('json').send(JSON.stringify({error : 'producto no encontrado'}, null, 2) + '\n');
      } else{
        let id=req.params.id;
        //console.log(id);
        return res.type('json').send(JSON.stringify(productos.delete(id), null, 2) + '\n');
      }
    } catch (e) {
      console.error({error : 'producto no encontrado'})
      res.status(500).send(JSON.stringify({error : 'producto no encontrado'}));
    }
    });



// GET api/productos/vista-------------------------------------------------
router.get('/productos/vista',(req, res) => {
  try {

    if(productos.read().length=0){
      res.type('json').send(JSON.stringify({error : 'no hay productos cargados'}, null, 2) + '\n');
    }else{
      //res.type('json').send(JSON.stringify(controller.read(), null, 2) + '\n');
      let data=productos.read();

        res.render('vista', { hayProductos : true, productos:data});
    }


    } catch (e) {
    console.error({error : 'no hay productos cargados'})
    res.status(500).send(JSON.stringify({error : 'no hay productos cargados'}));

  }
});



module.exports = router;
