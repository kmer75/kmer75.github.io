export class Client {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public description?: string,
        public imgPath?: string,
        public telephone?: string,
        public email?: string,
        public genre?: string,
        public rue?: string,
        public zipcode?: string,
        public ville?: string,
        public pays?: string,
        public latitude?: number,
        public longitude?: number
    ) { }


    //public adresse : string = this.rue + ', ' + this.ville + ', ' + this.zipcode;

}
