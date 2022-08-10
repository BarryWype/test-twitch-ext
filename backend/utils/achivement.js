
const achivement = {

    formatResponse(game, achievements) {
        console.log('game', game.availableGameStats.achievements[0])
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEEE')
        console.log('achivements', achievements.playerstats.achievements[0])
        let listFormat = []
        achievements.playerstats.achievements.forEach(( achivement, index ) => {
            console.log(achivement.achieved === 0);
            console.log(game.availableGameStats.achievements[index].icongray)
            achivement.icon = achivement.achieved === 0 ? game.availableGameStats.achievements[index].icongray : game.availableGameStats.achievements[index].icon
            console.log(achivement);
            listFormat.push(achivement);
        });
        return listFormat;
    }
}

module.exports = achivement