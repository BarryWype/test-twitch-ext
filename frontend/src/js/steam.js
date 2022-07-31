import axios from 'axios'

export default {

    callUserSteamProfile(url) {
        // create a promise for the axios request
        const promise = axios.get('http://localhost:8081/user', { params: { urlSteamProfil: url } })

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then(response => response.data.res)

        // return it
        return dataPromise
    },

    callSteamApps(steamId) {
        // create a promise for the axios request
        const promise = axios.get('http://localhost:8081/apps', { params: { steamID: steamId } })

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then(response => response.data.res)

        // return it
        return dataPromise
    },

    callGameAchivement(steamId, appId) {
        // create a promise for the axios request
        const promise = axios.get('http://localhost:8081/achivement', { params: { steamID: steamId, appID: appId } })

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then(response => response.data.res)
        
        // return it
        return dataPromise
    },

    callGameInformation(appId) {
        // create a promise for the axios request
        const promise = axios.get('http://localhost:8081/game', { params: { appID: appId } })

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then(response => response.data.res)

        // return it
        return dataPromise
    },


}