class Articulo {
    constructor(codigo, nombreA, precio, cantidad, descripcion, siguiente) {
        this._codigo = codigo;
        this._nombreA = nombreA;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
        this._siguiente;
    }
    get codigo() {
        return this._codigo;
    }
    toString() {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nombreA + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion + this._siguiente;
    }
}

class Inventario {
    constructor(tabla, clave, aux, auxc) {
        this._articulo = 0;
        this._inicio = 0;
        this._nuevo = null;
        this._tabla = tabla;
        this._clave = clave;
        this._sumador = 0;
        this._aux = aux;
        this._auxc = 0;
    }
    get articulo() {
        return this._articulo;
    }
    get clave() {
        return this._clave;
    }
    get aux() {
        return this._aux;
    }
    get auxc() {
        return this._auxc;
    }
    set aux(articulo) {
        this._aux = articulo;
    }
    agregar(ubicacion, nombreA, precio, cantidad, descripcion, clave) {
        if (this._sumador <= 20) {
            let aux = 0;
            if (ubicacion === '' || ubicacion === (this._sumador + 1).toString()) {
                this._clave = clave;
                aux = this._articulo;
                if (this._sumador === 0) {
                    this._articulo = new Inventario(this._clave, nombreA, precio, cantidad, descripcion, aux.siguiente);
                } else {

                    while (aux._siguiente != null) {
                        aux = aux._siguiente;
                    }
                    aux._siguiente = new Inventario(this._clave, nombreA, precio, cantidad, descripcion, aux.siguiente);
                }
                this._sumador++;
                this._clave++;
                alert('articulo agregado');
            } else if (Number(ubicacion) > 0 && Number(ubicacion) < this._sumador) {
                aux = this._articulo;
                let auxc = 0;
                while (clave > auxc) {
                    aux = aux._siguiente;
                    auxc++;
                }
                aux.siguiente = aux;
                aux = new Inventario(this._clave, nombreA, precio, cantidad, descripcion, aux.siguiente);
                this._clave++;
                alert('articulo agregado correctamente');
            } else {
                alert('Posicion no válida');
            }
            this.mostrarTa();
        } else {
            alert('inventario lleno');
        }
    }

    /* agregar(nuevo) {
        let nuevo = new Articulo(this._clave, nombreA, precio, cantidad, descripcion);   
         if(this._articulo != null) { 
                         this._inicio = nuevo;
                     }
                     else {
                         _agregar(nuevo, this._inicio);
                     }
                 this.mostrarTa();
     }
     */
    buscar(codigo) {
        codigo = Number(codigo);
        let aux = this._articulo;
        if (this._articulo._codigo === codigo) {
            revisor = this._articulo;
            alert('Articulo encontrado. ');
        } else {
            while (aux._codigo != codigo) {
                aux = aux._siguiente;
            }
            if (aux._codigo === codigo) {
                revisor = aux;
                alert('Articulo encontrado. ');
            } else {
                alert('Articulo no encontrado. ');
            }
        }
        return revisor;
    }
    eliminar(codigo) {
        codigo = Number(codigo);
        if (this.revision(codigo) === 1) {
            let aux = this._articulo;
            if (aux._codigo === codigo) {
                this._articulo = aux._siguiente;
            } else {
                while (aux._siguiente != null) {
                    if (aux.siguiente._codigo === codigo) {
                        aux = aux._siguiente;
                    }
                }
            }
            alert('Se ha eliminado el articulo correctamente');
        } else {
            alert('El código ingresado no existe, por favor verifique de nuevo');
        }
        this.mostrarTa();
    }
    revision(codigo) {
        codigo = Number(codigo);
        let revisor = -1;
        let aux = this._articulo;
        if (this._articulo._codigo === codigo) {
            revisor = 1;
        } else {
            while (aux._codigo != codigo && aux.codigo != null) {
                aux = aux._siguiente;
            }
            if (aux._codigo === codigo) {
                revisor = 1;
            }
        }
        return revisor;
    }
    mostrarTa() {
        this._tabla.innerHTML = '';
        let etiquetarA = [];
        let aux = this._articulo;
        let auxc = 0;
        for (let i = 0; i < this._sumador; i++) {
            etiquetarA[auxc] = document.createElement('p');
        }
        etiquetarA[auxc] = document.createElement('p'); {
            while (aux != null) {
                etiquetarA[auxc].innerHTML = aux._siguiente;
                auxc++;
                this._tabla.appendChild(etiquetarA[aux]);
            }
        }
        for (let i = 0; i < this._sumador; i++) {
            etiquetarA[i].innerHTML = this._articulo[i].toString();
            this._tabla.appendChild(etiquetarA[i]);
        }
    }
    invertirTa() {
        let inversor;
        aux = this._articulo;
        auxc = 0;
        while (aux != null) {
            inversor = new string(aux + aux._siguiente + inversor)
        }
        this._tabla.innerHTML = '';
        let etiquetarA = [];
        for (let i = 0; i < this._contador; i++) {
            etiquetarA[i] = document.createElement('p');
        }
        while (aux != null) {
            etiquetarA[auxc].innerHTML = aux.toString();
            auxc++;
            this._tabla.appendChild(etiquetarA[auxc]);
        }
    }
}

class Main {
    constructor() {


        var inventario = new Inventario(document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
        document.querySelector('#agregar').addEventListener('click', () => {
            let clave = Number(document.querySelector('#codigo').value);
            let ubicacion = document.querySelector('#ubicacion').value;
            let nombreA = document.querySelector('#nombreA').value;
            let precio = Number(document.querySelector('#precio').value);
            let cantidad = Number(document.querySelector('#cantidad').value);
            let descripcion = document.querySelector('#descripcion').value;

            inventario.agregar(ubicacion, nombreA, precio, cantidad, descripcion, clave);
            document.querySelector('#codigo').value = inventario.clave;
        });
        document.querySelector('#buscar').addEventListener('click', () => {
            let buscarArticulo = inventario.buscar(document.querySelector('#buscarCod').value);
            document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
        });
        document.querySelector('#eliminar').addEventListener('click', () => {
            inventario.eliminar(document.querySelector('#eliminarCodigo').value);
            document.querySelector('#codigo').value = inventario.clave;
        });
        document.querySelector('#invertir').addEventListener('click', () => {
            almacen.invertirTa();
        });
    }
}

new Main();