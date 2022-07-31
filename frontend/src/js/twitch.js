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

}