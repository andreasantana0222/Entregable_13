let archivo='chat.txt';
const fs=require ('fs');

class Chat {
    constructor() {
        // incializar variables
        this.archivo=archivo;
    }

    read(){
      //console.log('read');
     const contenido = fs.readFileSync(this.archivo, 'utf-8');
     this.listaProductos=JSON.parse(contenido);
     //console.log(JSON.parse(contenido));
     //Envio objeto
     return JSON.parse(contenido);

   }

   save(objeto){
     console.log('save');

     const contenido =  this.read();
     //const contenido =  [];

     //console.log('read');
     //console.log(contenido);
     console.log('objeto');
     console.log(objeto);
     console.log('push');
     contenido.push(objeto);
    console.log(contenido);

     let item={
       author:objeto.author,
       text:objeto.text,
       email:objeto.email,
       datetime:(new Date(Date.now())).toLocaleString()
     }

      fs.writeFileSync(archivo,JSON.stringify(contenido,null,'\t'));
     return item;
   }


}

module.exports = new Chat();
