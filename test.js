


const utils = {
    isObject: value => value?.constructor === Object,
    isArray:  value => Array.isArray(value),
};


const types = {
    isNumber: value => typeof value === "number",
    isString: value => typeof value === "string",
};



class Model {

    // static scheme = {
    //     id: 
    // };

    #data = null;

    constructor(data){
        this.setData(data);
    }

    validate(data){

    }

    setData(data){ this.#data = this.validate(data); }
    getData(){ return this.#data; }


}



class User extends Model {

    static scheme = {
        id:    types.isNumber,
        name:  types.isString,
        email: types.isString,
    };


    constructor(data){

    }

}

const m = new Model();

console.log(utils.isObject(m));