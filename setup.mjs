export async function setup({ onCharacterLoaded, onModsLoaded, onInterfaceReady }) {

    modifierData.increasedDragonBreathDamage = {
        get langDescription() {
            return getLangString('MODIFIER_DATA_increasedDragonBreathDamage');
        },
        description: '+${value}% damage taken from dragonbreath',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.wardsave = {
        get langDescription() {
            return getLangString('MODIFIER_DATA_wardsave');
        },
        description: '+${value}% (MAX: 90%) to take 0 damage from a hit.',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.increasedFlatDamageWhileTargetHasMaxHP = {
        get langDescription() {
            return getLangString('MODIFIER_DATA_increasedFlatDamageWhileTargetHasMaxHP');
        },
        description: '+${value} damage while the target is fully healed.',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.increasedPercDamageWhileTargetHasMaxHP = {
        get langDescription() {
            return getLangString('MODIFIER_DATA_increasedPercDamageWhileTargetHasMaxHP');
        },
        description: '+${value}% damage while the target is fully healed.',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.decreaseFlatDamageWhileTargetHasMaxHP = {
        get langDescription() {
            return getLangString('MODIFIER_DATA_decreaseFlatDamageWhileTargetHasMaxHP');
        },
        description: '-${value}% damage while you are fully healed.',
        isSkill: false,
        isNegative: false,
        tags: ['combat']
    };

    onModsLoaded(async (ctx) => {
        if (cloudManager.hasTotHEntitlement) {
            console.log('hasTotHEntitlement')
            await ctx.gameData.addPackage('data-toth.json');
        } else {
            console.log('Vinilla')
        }
    });

    // Random attack?
    // While wearing a shit ring, kill x ?
    // Dialoge mod
    // Monster category mod
    // MonsterStats.KilledByPlayer

    onCharacterLoaded(ctx => {
        ctx.patch(Character, 'modifyAttackDamage').after((damage, target, attack) => {
            let newDamage = damage
            // Remove all damage and return if wardsaved
            if (target && target.modifiers && target.modifiers.wardsave) {
                // let temp_save = target.modifiers.wardsave
                // if (temp_save > 90) {
                //     temp_save = 90
                // }
                // const roll = Math.floor(Math.random() * 100) + 1
                // if (temp_save > roll) {
                //     return 0;
                // }

                let wardsaveChance = Math.min(target.modifiers.wardsave, 90);
                if (rollPercentage(wardsaveChance)) {
                    return 0;
                }

            }
            // Add HP full damage
            if (!target.monster && target.stats.maxHitpoints === target.hitpoints) {
                // do damage to player
                let percDamage = 0
                if (game.combat.enemy.modifiers.increasedPercDamageWhileTargetHasMaxHP) {
                    percDamage = newDamage * (game.combat.enemy.modifiers.increasedPercDamageWhileTargetHasMaxHP / 100)
                }
                let flatDam = 0
                if (game.combat.enemy.modifiers.increasedFlatDamageWhileTargetHasMaxHP) {
                    flatDam = game.combat.enemy.modifiers.increasedFlatDamageWhileTargetHasMaxHP
                }
                newDamage = newDamage + flatDam + percDamage
            }
            if (target.monster && target.stats.maxHitpoints === target.hitpoints) {
                // Do damage to monster
                let percDamage = 0
                if (game.combat.player.modifiers.increasedPercDamageWhileTargetHasMaxHP) {
                    percDamage = newDamage * (game.combat.player.modifiers.increasedPercDamageWhileTargetHasMaxHP / 100)
                }
                let flatDam = 0
                if (game.combat.player.modifiers.increasedFlatDamageWhileTargetHasMaxHP) {
                    flatDam = game.combat.player.modifiers.increasedFlatDamageWhileTargetHasMaxHP
                }
                newDamage = newDamage + flatDam + percDamage
            }
            if (target && target.modifiers && target.modifiers.decreaseFlatDamageWhileTargetHasMaxHP && target.stats.maxHitpoints === target.hitpoints) {
                newDamage = newDamage - target.modifiers.decreaseFlatDamageWhileTargetHasMaxHP
            }
            // If it's a dragon breath re-calc
            if (attack.isDragonbreath) {
                // Flat calc
                newDamage = newDamage + target.modifiers.increasedDragonBreathDamage

                // % calc
                // newDamage *= (1 - (target.modifiers.increasedDragonBreathDamage - target.modifiers.decreasedDragonBreathDamage)) / 100
            }
            // return re-calced damage
            return newDamage
        })

        const bannedList = {
            "Sweetroll": true,
            "Crown_of_Rhaelyx": true,
            "Cooking_Gloves": true,
            "Mining_Gloves": true,
            "Smithing_Gloves": true,
            "Gem_Gloves": true,
            "Thieving_Gloves": true,
            "Empty_Food": true,
            "Empty_Equipment": true,
            "Meteorite_Dust": true,
            "Lemonade_Full": true,
            "Locked_Chest": true,
            "Locked_Chest_Key": true,
            "I_Cant_See_Helmet": true,
            "Lemonade_Nope_this_is_half_full_now": true,
            "Lemonade_Wow_this_is_slow": true,
            "Lemonade_Maybe_this_is_half_full": true,
            "Lemonade_Just_over_half_full": true,
            "Lemonade_Half_full": true,
            "Lemonade_A_little_bit_more_now": true,
            "Lemonade_Has_a_bit_now": true,
            "Lemonade_Not_much": true,
            "Lemonade_Not_as_empty_as_before": true,
            "Lemonade_Still_very_empty": true,
            "Lemonade_Very_empty": true,
            "Lemonade_Empty": true,
            "Lemonade_Just_fill_it_up_already": true,
            "Lemonade_Still_not_full": true,
            "Lemonade_Again_still_not_full": true,
            "Lemonade_Less_than_before_because_you_drank_some": true,
            "Lemonade_Back_to_where_we_were_before": true,
            "Lemonade_Haha_just_joking_hurry_up": true,
            "Lemonade_Wait_for_it": true,
            "Lemonade_Wait_for_it2": true,
            "Lemonade_Oh_still_not_full": true,
            "Lemonade_YAY_ITS_FINALLY_FULL": true,
            "Lemonade_What_about_now": true,
            "Lemonade_Now": true,
            "Lemonade_Okay_this_looks_pretty_full_now": true,
            "Lemonade_Wait_this_might_be_half_full_now": true,
            "Lemonade_How_full_is_it_supposed_to_be": true,
            "Lemonade_Still_almost_full": true,
            "Lemonade_Almost_full": true
        }

        const bannedNameSpace = {
            "tes": true
        }

        const categoryBan = {
            "Limes": true,
            "Lemon": true,
            "Events": true,
            "Event": true
        }

        const initialPackage = ctx.gameData.buildPackage(itemPackage => {
            game.items.registeredObjects.forEach(item => {
                if (item) {
                    // Skip the item if its localID is in the bannedList
                    if (bannedList[item.localID]) {
                        return;
                    }
                    if (bannedNameSpace[item.namespace]) {
                        return;
                    }
                    if (categoryBan[item.category]) {
                        return;
                    }
                    if (item.swalData) {
                        return;
                    }
                    itemPackage.items.modify({
                        id: "tes:Elder_Scrolls",
                        dropTable: {
                            add: [
                                {
                                    itemID: `${item.namespace}:${item.localID}`,
                                    minQuantity: 1,
                                    maxQuantity: 1,
                                    weight: 1
                                }
                            ]
                        },
                    })
                }
            })
        });
        initialPackage.add();

        game.monsters.forEach(monster => {
            // if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Bitterfish_Clan_Goblin_Shaman') {
            //     const killCount = game.stats.monsterKillCount(monster)
            //     if (killCount > 0) {
            //         let elem = document.getElementById("tutorial-tes:Miscarcand")
            //         let name = ""
            //         while (name != "COMBAT-AREA-MENU") {
            //             name = elem.parentNode.nodeName
            //             elem = elem.parentNode
            //         }
            //         elem.style.display = 'none'
            //     }
            // }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Bloody_Hand_Tribe_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Cracked_Wood_Cave")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Dust_Eater_Clan_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Barren_Mine")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Rock_Biter_Clan_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Timberscar_Hollow")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Sharp_Tooth_Clan_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Derelict_Mine")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Skull_Breaker_Clan_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Wenderbek_Cave")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'Three_Feather_Clan_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Plundered_Mine")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
            if (monster && monster.localID && monster.namespace === "tes" &&  monster.localID === 'White_Skin_Clan_Goblin_Shaman') {
                const killCount = game.stats.monsterKillCount(monster)
                if (killCount > 0) {
                    let elem = document.getElementById("tutorial-tes:Goblin_Jims_Cave")
                    let name = ""
                    while (name != "COMBAT-AREA-MENU") {
                        name = elem.parentNode.nodeName
                        elem = elem.parentNode
                    }
                    elem.style.display = 'none'
                }
            }
        })
    });

    // const myDialogBox = mod.api.dbox.create('my-dialog-box', {
    //     title: 'My First Dialog Box',
    //     startingDialogId: 'start-here',
    //     characters: [{
    //       id: 'golbin',
    //       name: 'Friendly Golbin',
    //       alignment: 'friendly',
    //       media: game.monsters.getObjectByID('melvorD:Golbin').media
    //     }],
    //     dialogs: [{
    //       id: 'start-here',
    //       character: 'golbin',
    //       text: ['Welcome to Melvor Idle!', 'This dialog was created in dbox.'],
    //       options: [
    //         { to: 'be-nice', text: 'Thank you, Golbin. Very cool!', isSpeech: true },
    //         { to: 'be-mean', text: 'Who cares?', isSpeech: true }
    //       ]
    //     }, {
    //       id: 'be-nice',
    //       character: 'golbin',
    //       text: 'Here\'s something to take with you on your journeys!',
    //       options: [{ rewards: { gp: 100, items: { id: 'melvorD:Bronze_Dagger' } } }]
    //     }, {
    //       id: 'be-mean',
    //       character: 'golbin',
    //       text: ['Take this sword and stick it...', '...somewhere safe.'],
    //       options: [{ rewards: { items: { id: 'melvorD:Bronze_Sword' } } }]
    //     }]
    //   }, ctx);

    onInterfaceReady(() => {
        ui.createStatic('#modal-book--The_Black_Horse_Courier_Waterfront', document.body);
        document.body.querySelector('.modal.The_Black_Horse_Courier_Waterfront').id = 'The_Black_Horse_Courier_Waterfront';

        ui.createStatic('#modal-book--recommendation_letter', document.body);
        document.body.querySelector('.modal.recommendation_letter').id = 'recommendation_letter';

        // Dialog
        // document.getElementById('woodcutting-container').firstElementChild.after(myDialogBox.root);
    });
}