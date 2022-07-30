import axios from 'axios'

const twitch = window.Twitch.ext

export default {
    ...twitch,

    token: null,
    tuid: null,

    init() {

        this.onContext(function (context) {
            twitch.rig.log(context);
        });

        this.onAuthorized((auth) => {

            // save our credentials
            this.token = auth.token;
            this.tuid = auth.userId;

            setAuth(token);
        });
    },

    log(item) {
        if (window.clientInformation.oscpu) { // empty in dev rig, filled in browser 
            console.log(item)
        } else {
            twitch.rig.log(item)
        }
    },

    testBackend() {
        // if (!this.token) { return this.log('Not authorized'); }
        this.log(this.token)

        axios.get('http://localhost:8081/color/query', {
            headers: {
                "Authorization": 'Bearer ' + this.token,
            },
        }).then((response) => this.log(response))
    },


}