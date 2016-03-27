module.exports = {
    loadHeroes (cb) {
        cc.loader.loadRes('data/heroes.json', function(err, data){
            if (err) {
                cc.log(err);
            } else {
                let heroes = data;
                let count = heroes.length;
                for (let i = 0; i < data.length; ++i) {
                    let heroInfo = heroes[i];
                    let posArr = heroInfo.iconPos.split('|');
                    let anchorArr = heroInfo.portraitAnchor.split('|');
                    heroInfo.iconPos = cc.p(parseFloat(posArr[0]), parseFloat(posArr[1]));
                    heroInfo.portraitAnchor = cc.p(parseFloat(anchorArr[0]), parseFloat(anchorArr[1]));
                    let sfUrl = 'heroes/' + heroInfo.id + '.png/' + heroInfo.id;
                    cc.loader.loadRes(sfUrl, function(err, spriteFrame) {
                        if (err) {
                            cc.log(err);
                        } else {
                            heroInfo.sf = spriteFrame;
                            if (--count <= 0) {
                                return cb(heroes);
                            }
                        }
                    })
                }
            }
        });
    }
};
