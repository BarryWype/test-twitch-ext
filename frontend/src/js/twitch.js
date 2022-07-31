import axios from 'axios'

const twitch = window.Twitch.ext

export default {
    ...twitch,

    token: null,
    tuid: null,

    init() {

        this.onContext(function (context) {
            twitch.rig.log(context)
        })

        this.onAuthorized(auth => {

            // save our credentials
            this.token = auth.token
            this.tuid = auth.userId
        })
    },

    log(item) {
        if (window.clientInformation.oscpu) { // empty in dev rig, filled in browser 
            console.log(item)
        } else {
            twitch.rig.log(item)
        }
    },

    testBackend() {
        this.log(this.token)
        console.log(this.token)

        // create a promise for the axios request
        const promise = axios.get('http://localhost:8081/user')

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then(response => response.data.a)

        // return it
        return dataPromise
    },

    testBackend2(url) {
        this.log(this.token)
        console.log(this.token)

        // create a promise for the axios request
        const promise = axios.get('http://localhost:8081/user', { params: { urlSteamProfil: url } })

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then(response => response.data.a)

        // return it
        return dataPromise
    },


}