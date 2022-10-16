export class Nivel {

    private id: string
    private descripcion: string
    private icono: string
    private estado: string


    constructor(id: string = '1', descripcion: string = "", icono: string = "", estado: string = "") {
        this.id = id
        this.descripcion = descripcion
        this.icono = icono
        this.estado = estado
    }

    public getId() {
        return this.id
    }

    public getDescripcion() {
        return this.descripcion
    }

    public getIcono() {
        return this.icono
    }

    public getEstado() {
        return this.estado
    }


}