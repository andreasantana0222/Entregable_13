const socketio = io.connect();
const form = document.querySelector('#formulario')
const inputTitle = document.querySelector('#input-title')
const inputPrice = document.querySelector('#input-price')
const inputImg = document.querySelector('#input-img')

const template= Handlebars.compile(`
  <h1>Vista de Productos</h1>
              <br>
              {{#if hayProductos}}
                  <div class="table-responsive">
                      <table class="table table-dark">
                          <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
                          {{#each hayProductos}}
                              <tr> <td>{{this.title}}</td> <td>$ {{this.price}}</td> <td><img width="50" src={{this.thumbnail}} alt="not found"></td> </tr>
                          {{/each}}
                      </table>
                  </div>
              {{else}}
                  <h3 class="alert alert-warning">No se encontraron productos</h3>
              {{/if}}
          <a href="/" class="btn btn-info m-3">Volver</a>
  `);

  form.addEventListener('submit', (e) => {
      e.preventDefault()
      const title = inputTitle.value.trim()
      const price = inputPrice.value.trim()
      const thumbnail = inputImg.value.trim()

      if (title.length < 1) {return}
      if (price.length < 1) {return}
      if (thumbnail.length < 1) {return}

      // envio el objeto con socket
      socketio.emit('guardar', {
          title: title,
          price: price,
          thumbnail: thumbnail
      })

      inputTitle.value = ''
      inputPrice.value = ''
      inputImg.value = ''
  })

  // actualizo template con la data del server
  socketio.on('actualizar', data => {
      let html = template({hayProductos: data})
      document.querySelector("#lista-productos").innerHTML = html
  });
