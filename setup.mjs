export function setup(ctx) {
    console.log("Welcome to The Elder scrolls");

    console.table(game.items.allObjects.filter(item => !game.golbinRaid.bannedItems.has(item) && item instanceof WeaponItem && item.namespace==="melvorD"), ["_name"])

    let count = 0;
    game.items.forEach(item => {
        if (item.namespace && item.namespace === 'pathOfMelvor') count++;
    });
    console.log(count)

    ctx.gameData.buildPackage(pkg => {
        pkg.items.modify({
            id: "tes:Elder_Scrolls",
            lootTable: {
                add: [{
                  itemID: 'melvorD:Dragon_Battleaxe',
                  minQuantity: 1,
                  maxQuantity: 1,
                  weight: 1
                }]
             },
        })
      }).add()
}


