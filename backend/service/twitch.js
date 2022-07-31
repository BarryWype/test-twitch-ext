const Boom = require('boom');
const jsonwebtoken = require('jsonwebtoken');
const color = require('color');
const request = require('request');

const twitch = {
    token: '',
    secret: '',
    STRINGS: {
        secretEnv: "Using environment variable for secret",
        clientIdEnv: "Using environment variable for client-id",
        ownerIdEnv: "Using environment variable for owner-id",
        serverStarted: 'Server running at %s',
        secretMissing: "Missing value for secret",
        clientIdMissing: "Missing value for client-id",
        ownerIdMissing: "Missing value for owner-id",
        messageSendError: 'Error sending message to channel %s: %s',
        pubsubResponse: 'Message to c:%s returned %s',
        cyclingColor: 'Cycling color for c:%s on behalf of u:%s',
        colorBroadcast: 'Broadcasting color %s for c:%s',
        sendColor: 'Sending color %s to c:%s',
        cooldown: 'Please wait before clicking again',
        invalidAuthHeader: 'Invalid authorization header',
        invalidJwt: 'Invalid JWT',
    },
    bearerPrefix: 'Bearer ',
    userCooldowns: {},
    channelColors: {},
    initialColor: color('#6441A4'),
    channelCooldownMs: 1000,
    colorWheelRotation: 30,
    channelCooldowns: {},
    verboseLog: process.env.VERBOSE ? console.log.bind(console) : () => { },
    serverTokenDurationSec: 30,

    colorCycleHandler(req) {
        console.log(req.header.authorization);
        // Verify all requests.
        const payload = this.verifyAndDecode(req.headers.authorization);
        const { channel_id: channelId, opaque_user_id: opaqueUserId } = payload;

        console.log(`channelColors : ${this.channelColors}`);
        console.log(`channelId : ${channelId}`);
        console.log(`initialColor : ${this.initialColor}`);
        // Store the color for the channel.
        let currentColor = this.channelColors[channelId] || this.initialColor;

        // Bot abuse prevention:  don't allow a user to spam the button.
        if (this.userIsInCooldown(opaqueUserId)) {
            throw Boom.tooManyRequests(this.STRINGS.cooldown);
        }

        // Rotate the color as if on a color wheel.
        this.verboseLog(this.STRINGS.cyclingColor, channelId, opaqueUserId);
        currentColor = color(currentColor).rotate(this.colorWheelRotation).hex();

        // Save the new color for the channel.
        this.channelColors[channelId] = currentColor;

        // Broadcast the color change to all other extension instances on this channel.
        this.attemptColorBroadcast(channelId);

        return currentColor;
    },

    verifyAndDecode(header) {
        if (header && header.startsWith(this.bearerPrefix)) {
            try {
                this.token = header.substring(this.bearerPrefix.length);
                this.secret = Buffer.from(process.env.TWITCH_SECRET, 'base64');
                return jsonwebtoken.verify(this.token, this.secret, { algorithms: ['HS256'] });
            }
            catch (ex) {
                throw Boom.unauthorized(this.STRINGS.invalidJwt);
            }
        }
        throw Boom.unauthorized(this.STRINGS.invalidAuthHeader);
    },

    userIsInCooldown(opaqueUserId) {
        // Check if the user is in cool-down.
        const cooldown = this.userCooldowns[opaqueUserId];
        const now = Date.now();
        if (cooldown && cooldown > now) {
            return true;
        }

        // Voting extensions must also track per-user votes to prevent skew.
        this.userCooldowns[opaqueUserId] = now + this.userCooldownMs;
        return false;
    },

    attemptColorBroadcast(channelId) {
        // Check the cool-down to determine if it's okay to send now.
        const now = Date.now();
        const cooldown = this.channelCooldowns[channelId];
        if (!cooldown || cooldown.time < now) {
            // It is.
            this.sendColorBroadcast(channelId);
            this.channelCooldowns[channelId] = { time: now + this.channelCooldownMs };
        } else if (!cooldown.trigger) {
            // It isn't; schedule a delayed broadcast if we haven't already done so.
            cooldown.trigger = setTimeout(this.sendColorBroadcast, now - cooldown.time, channelId);
        }
    },

    sendColorBroadcast(channelId) {
        console.log('sendColorBroadcast');

        // Set the HTTP headers required by the Twitch API.
        const headers = {
            'Client-ID': this.clientId,
            'Content-Type': 'application/json',
            'Authorization': this.bearerPrefix + this.makeServerToken(channelId),
        };

        // Create the POST body for the Twitch API request.
        const currentColor = color(this.channelColors[channelId] || this.initialColor).hex();
        const body = JSON.stringify({
            content_type: 'application/json',
            message: currentColor,
            targets: ['broadcast'],
        });

        // Send the broadcast request to the Twitch API.
        this.verboseLog(this.STRINGS.colorBroadcast, currentColor, channelId);
        request(
            `https://api.twitch.tv/extensions/message/${channelId}`,
            {
                method: 'POST',
                headers,
                body,
            }
            , (err, res) => {
                if (err) {
                    console.log(this.STRINGS.messageSendError, channelId, err);
                } else {
                    this.verboseLog(this.STRINGS.pubsubResponse, channelId, res.statusCode);
                }
            });
    },

    makeServerToken(channelId) {
        const payload = {
            exp: Math.floor(Date.now() / 1000) + this.serverTokenDurationSec,
            channel_id: channelId,
            user_id: this.ownerId, // extension owner ID for the call to Twitch PubSub
            role: 'external',
            pubsub_perms: {
                send: ['*'],
            },
        };
        console.log('makeServerToken');
        return jsonwebtoken.sign(payload, this.secret, { algorithm: 'HS256' });
    }

}

module.exports = twitch