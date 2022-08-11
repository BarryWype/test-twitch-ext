<template>
  <div class="app">
    <div class="container">
      <h1
        v-if="nickname"
        class="nickname"
      >
        {{ nickname }}
      </h1>
      <h1 v-else>
        The broadcaster need to configure the extension
      </h1>
      <p v-if="achivements.length === 0">
        Vide
      </p>
      <div
        v-else
        class="d-flex flex-column gap-2"
      >
        <div>
          Count: {{ achivementsDone.length }} / {{ achivementsTodo.length + achivementsDone.length }}
        </div>
        <div class="progress">
          <div
            ref="progressbar"
            class="progress-bar w-75"
            role="progressbar"
            aria-label="progress bar"
            :style="progressBarStyle"
            :aria-valuenow="achivementsDone.length"
            aria-valuemin="0"
            :aria-valuemax="achivementsTodo.length + achivementsDone.length"
          ></div>
        </div>
        <div v-if="achivementsTarget.length">
          <div class="d-flex flex-column gap-2">
            <div
              v-for=" (achi, index) in achivementsTarget"
              :key="index"
              class="success target d-flex flex-row gap-2 position-relative"
            >
              <div class="d-flex success__image">
                <img :src="achi.icon" />
              </div>
              <div class="success__content text-start d-flex flex-column">
                <h4 class="success__title">
                  {{ achi.name }}
                </h4>
                <div
                  :id="`todo-${index}`"
                  class="success__description"
                >
                  {{ achi.description }}
                </div>
              </div>
              <div
                class="success__remove-target position-absolute"
                @click="removeFromTarget(achi)"
              >
                x
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Todo</h2>
          <div class="d-flex flex-column gap-2">
            <div
              v-for=" (achi, index) in achivementsTodo"
              :key="index"
              class="success d-flex flex-row gap-2"
              @click="addToTarget(achi)"
            >
              <div class="d-flex success__image">
                <img :src="achi.icon" />
              </div>
              <div class="success__content text-start d-flex flex-column">
                <h4 class="success__title">
                  {{ achi.name }}
                </h4>
                <div
                  :id="`todo-${index}`"
                  class="success__description"
                >
                  {{ achi.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Done</h2>
          <div class="d-flex flex-column gap-2">
            <div
              v-for="( achi, index ) in achivementsDone"
              :key="index"
              class="success d-flex flex-row "
            >
              <div class="d-flex success__image">
                <img :src="achi.icon" />
              </div>
              <div class="success__content text-start d-flex flex-column">
                <h4 class="success__title">
                  {{ achi.name }}
                </h4>
                <div class="success__description collapse">
                  {{ achi.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const twitchExt = window.Twitch.ext

export default {
    name: "App",

    data() {
        return {
            nickname: null,
            steamID: null,
            appID: null,
            achivements: [],
            achivementsTarget: []
        }
    },

    computed: {
        achivementsDone() {
            if (!this.achivements) return false

            return this.achivements.filter(a => a.achieved)
        },

        achivementsTodo() {
            if (!this.achivements) return false

            return this.achivements.filter(a => !a.achieved)
        },

        progressBarStyle() { // TODO
            const done = this.achivementsDone.lenght
            const todo = this.achivementsTodo.lenght
            const total = parseInt(todo) + parseInt(done)

            const progress = (parseInt(done) / total) * 100

            return { width: `${progress}%` }
        }

    },

    beforeMount() {
        this.$twitch.init()
    },

    created() {
        let self = this
        twitchExt.configuration.onChanged(function () {
            self.handleInit()
            self.handleClickAchivement()
            self.handleClickApps()
        })
    },

    methods: {
        handleInit() {
            console.log("init")
            if (twitchExt.configuration.broadcaster) {
                let content = JSON.parse(twitchExt.configuration.broadcaster.content)
                console.log(content)
                try {
                    // Parsing the array saved in broadcaster content
                    console.log(content.appID)
                    this.steamID = content.steamID
                    this.appID = content.appID
                    this.$steam.callUserSteamProfile(this.steamID).then(data => {
                        this.nickname = data.nickname
                    })
                }
                catch (e) {
                    console.log("Invalid config")
                }
            }
        },

        handleClickAchivement() {
            this.$steam.callAchivementState(this.steamID, this.appID).then(data => {
                console.log(data)
                this.achivements = data
            })
        },

        handleClickApps() {
            console.log('appId', this.appID)
            this.$steam.callGameInformation(this.appID).then(data => {
                console.log("app", data)
            })
        },

        addToTarget(achi) {
            this.achivementsTarget.push(achi)
        },

        removeFromTarget(achi) {
            this.achivementsTarget.splice(this.achivementsTarget.indexOf(achi), 1)
        }
    },
}
</script>

<style lang="scss">
.app {
  padding-top: 1rem;
  color: #c7d5e0;
  background-color: #1b2838;
}

h2 {
  text-align: left;
}

.nickname {
  font-weight: 600;
}

.progress {
  --bs-progress-bar-bg: #288cfb;
  background-color: white;
}

.success {
  border: 2px solid #2a475e;
  border-radius: 0.5rem;
  overflow: hidden;

  &.target {
    border: 2px solid #FFD700;
  }

  &__image {
    width: 64px;

    img {
      object-fit: contain;
    }
  }

  &__content {
    padding-left: 0.5rem;
  }

  &__description {
    font-size: 0.75rem;
  }

  &__remove-target {
    top: 0;
    right: 5px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
