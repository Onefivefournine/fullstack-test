/**
 * Very simple boilerplate Api class
 */

class Api {
    constructor( baseUrl ) {
        this.baseUrl = baseUrl
    }
    async fetchUrl( url ) {
        let res = await fetch( this.baseUrl + url )
        return res.json()
    }
}

export default new Api( 'http://localhost:3030' )