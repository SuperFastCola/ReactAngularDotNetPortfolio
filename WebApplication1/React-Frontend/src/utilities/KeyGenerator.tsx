class KeyGenerator {

    public createItemKey(){
        return Math.ceil((Math.random() * 1000) * 10000);
    }
}

export {KeyGenerator};