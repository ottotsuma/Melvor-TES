export async function setup({ onCharacterLoaded, onInterfaceReady }) {
    onCharacterLoaded(ctx => {
        const bannedList = {
            "Crown_of_Rhaelyx": true,
            "Cooking_Gloves": true,
            "Mining_Gloves": true,
            "Smithing_Gloves": true,
            "Gem_Gloves": true,
            "Thieving_Gloves": true,
            "Empty_Food": true,
            "Lemonade_Full": true,
            "Locked_Chest": true,
            "Locked_Chest_Key": true,
            
        }

        const bannedNameSpace = {
            "tes": true
        }

        const initialPackage = ctx.gameData.buildPackage(itemPackage => {
            //Generate Equipment
            game.items.equipment.registeredObjects.forEach(equipment => {
                if (equipment && equipment.validSlots && equipment.validSlots[0] &&
                    (equipment.validSlots[0] === 'Boots' ||
                        equipment.validSlots[0] === 'Gloves' ||
                        equipment.validSlots[0] === 'Helmet' ||
                        equipment.validSlots[0] === 'Platebody' ||
                        equipment.validSlots[0] === 'Platelegs' ||
                        equipment.validSlots[0] === 'Shield'
                    )) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[equipment.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [{
                                itemID: `${equipment.namespace}:${equipment.localID}`,
                                minQuantity: 1,
                                maxQuantity: 1,
                                weight: 1
                            }]
                        },
                    })
                }
            });

            // Generate Weapons
            game.items.weapons.registeredObjects.forEach(weapon => {
                if (weapon && weapon.validSlots && weapon.validSlots[0] &&
                    (weapon.validSlots[0] === 'Weapon')) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[weapon.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${weapon.namespace}:${weapon.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });

            // // food
            game.items.food.registeredObjects.forEach(food => {
                if (food) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[food.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${food.namespace}:${food.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });
            // bones
            game.items.bones.registeredObjects.forEach(bones => {
                if (bones) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[bones.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${bones.namespace}:${bones.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });
            // potions
            game.items.potions.registeredObjects.forEach(potions => {
                if (potions) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[potions.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${potions.namespace}:${potions.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });
            // openables
            game.items.openables.registeredObjects.forEach(openables => {
                if (openables) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[openables.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${openables.namespace}:${openables.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });
            // composts
            game.items.composts.registeredObjects.forEach(composts => {
                if (composts) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[composts.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${composts.namespace}:${composts.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });
            // tokens
            game.items.tokens.registeredObjects.forEach(tokens => {
                if (tokens) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[tokens.localID]) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${tokens.namespace}:${tokens.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            });
        });
        initialPackage.add();
    });
}