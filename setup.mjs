export async function setup({ onCharacterLoaded, onModsLoaded, onInterfaceReady }) {

    modifierData.tes_increasedDragonBreathDamage = {
        get langDescription() {
            return getLangString('tes_increasedDragonBreathDamage');
        },
        description: '+${value}% damage taken from dragonbreath',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.tes_wardsave = {
        get langDescription() {
            return getLangString('tes_wardsave');
        },
        description: '+${value}% (MAX: 90%) to take 0 damage from a hit.',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.tes_increasedFlatDamageWhileTargetHasMaxHP = {
        get langDescription() {
            return getLangString('tes_increasedFlatDamageWhileTargetHasMaxHP');
        },
        description: '+${value} damage while the target is fully healed.',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.tes_increasedPercDamageWhileTargetHasMaxHP = {
        get langDescription() {
            return getLangString('tes_increasedPercDamageWhileTargetHasMaxHP');
        },
        description: '+${value}% damage while the target is fully healed.',
        isSkill: false,
        isNegative: true,
        tags: ['combat']
    };

    modifierData.tes_decreaseFlatDamageWhileTargetHasMaxHP = {
        get langDescription() {
            return getLangString('tes_decreaseFlatDamageWhileTargetHasMaxHP');
        },
        description: '-${value}% damage while you are fully healed.',
        isSkill: false,
        isNegative: false,
        tags: ['combat']
    };

    let Khajiit_Item_1 = ""
    let Khajiit_Item_1_Price = 100
    let Khajiit_Item_1_qty = 1
    let Khajiit_Item_2 = ""
    let Khajiit_Item_2_Price = 100
    let Khajiit_Item_3 = ""
    let Khajiit_Item_3_Price = 100

    onModsLoaded(async (ctx) => {
        try {

        } catch (error) {
            console.log("onModsLoaded", error)
        }
        const en_data = {
            tes_increasedDragonBreathDamage: "Increase damage taken from dragon breaths by +${value}",
            tes_wardsave: "+${value}% (MAX: 90%) to take 0 damage from a hit.",
            tes_increasedFlatDamageWhileTargetHasMaxHP: "Increase damage while target is fully healed by +${value}.",
            tes_increasedPercDamageWhileTargetHasMaxHP: "Increase damage while target is fully healed by +${value}%.",
            tes_decreaseFlatDamageWhileTargetHasMaxHP: "Decrease damage taken while you are fully healed by +${value}.",
            MISC_STRING_The_Five_Tenets: "The Five Tenets",
            MISC_STRING_Dead_Drop_Orders_1: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_2: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_3: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_4: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_5: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_6: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_7: "Dead Drop Orders",
            MISC_STRING_Dead_Drop_Orders_8: "Dead Drop Orders",
        }
        for (const [key, value] of Object.entries(en_data)) {
            loadedLangJson[key] = value;
        }

        if (cloudManager.hasTotHEntitlement) {
            console.log('hasTotHEntitlement')
            await ctx.gameData.addPackage('data-toth.json');
        } else {
            console.log('Vanilla')
        }

        if (mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor')) {
            const cmim = mod.api.customModifiersInMelvor;
            if (!cmim) {
                return;
            }
            cmim.addDragons(["tes:Ysmir_Iceheart", "tes:Alduin", "tes:Elsweyr_Dragon"]);
            cmim.addHumans(["tes:Necromancer", "tes:Bandit", "tes:Thief", "tes:Havilstein_Hoar", "tes:Matthias_Draconis", "tes:Perennia_Draconis", "tes:Caelia_Draconis", "tes:Sibylla_Draconis", "tes:Andreas_Draconis", "tes:Celedaen", "tes:Imperial_Watch",]);
            cmim.addUndeads(["tes:Harkon", "tes:Harkon2", "tes:Zombie", "tes:Lich",]);
        }
    });

    onCharacterLoaded(ctx => {
        try {


            ctx.patch(Character, 'modifyAttackDamage').after((damage, target, attack) => {
                let newDamage = damage
                // Remove all damage and return if wardsaved
                if (target && target.modifiers && target.modifiers.tes_wardsave) {
                    // let temp_save = target.modifiers.tes_wardsave
                    // if (temp_save > 90) {
                    //     temp_save = 90
                    // }
                    // const roll = Math.floor(Math.random() * 100) + 1
                    // if (temp_save > roll) {
                    //     return 0;
                    // }

                    let wardsaveChance = Math.min(target.modifiers.tes_wardsave, 90);
                    if (rollPercentage(wardsaveChance)) {
                        return 0;
                    }

                }
                // Add HP full damage
                if (!target.monster && target.stats.maxHitpoints === target.hitpoints) {
                    // do damage to player
                    let percDamage = 0
                    if (game.combat.enemy.modifiers.tes_increasedPercDamageWhileTargetHasMaxHP) {
                        percDamage = newDamage * (game.combat.enemy.modifiers.tes_increasedPercDamageWhileTargetHasMaxHP / 100)
                    }
                    let flatDam = 0
                    if (game.combat.enemy.modifiers.tes_increasedFlatDamageWhileTargetHasMaxHP) {
                        flatDam = game.combat.enemy.modifiers.tes_increasedFlatDamageWhileTargetHasMaxHP
                    }
                    newDamage = newDamage + flatDam + percDamage
                }
                if (target.monster && target.stats.maxHitpoints === target.hitpoints) {
                    // Do damage to monster
                    let percDamage = 0
                    if (game.combat.player.modifiers.tes_increasedPercDamageWhileTargetHasMaxHP) {
                        percDamage = newDamage * (game.combat.player.modifiers.tes_increasedPercDamageWhileTargetHasMaxHP / 100)
                    }
                    let flatDam = 0
                    if (game.combat.player.modifiers.tes_increasedFlatDamageWhileTargetHasMaxHP) {
                        flatDam = game.combat.player.modifiers.tes_increasedFlatDamageWhileTargetHasMaxHP
                    }
                    newDamage = newDamage + flatDam + percDamage
                }
                if (target && target.modifiers && target.modifiers.tes_decreaseFlatDamageWhileTargetHasMaxHP && target.stats.maxHitpoints === target.hitpoints) {
                    newDamage = newDamage - target.modifiers.tes_decreaseFlatDamageWhileTargetHasMaxHP
                }
                // If it's a dragon breath re-calc
                if (attack.isDragonbreath) {
                    // Flat calc
                    newDamage = newDamage + target.modifiers.tes_increasedDragonBreathDamage

                    // % calc
                    // newDamage *= (1 - (target.modifiers.tes_increasedDragonBreathDamage - target.modifiers.decreasedDragonBreathDamage)) / 100
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
                    try {
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
                            if (!Khajiit_Item_1 && Math.random() < 0.1) {
                                Khajiit_Item_1 = `${item.namespace}:${item.localID}`
                                Khajiit_Item_1_Price = item.sellsFor * 4
                                Khajiit_Item_1_qty = Math.floor(Math.random() * 10)
                            } else if (!Khajiit_Item_2 && Math.random() < 0.05) {
                                Khajiit_Item_2 = `${item.namespace}:${item.localID}`
                                Khajiit_Item_2_Price = item.sellsFor * 3
                            } else if (!Khajiit_Item_3 && Math.random() < 0.01) {
                                Khajiit_Item_3 = `${item.namespace}:${item.localID}`
                                Khajiit_Item_3_Price = item.sellsFor * 2
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
                    } catch (error) {
                        console.log("onCharacterLoaded initialPackage", error)
                    }
                })
            });
            initialPackage.add();

            game.monsters.forEach(monster => {
                try {
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Bloody_Hand_Tribe_Goblin_Shaman') {
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
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Dust_Eater_Clan_Goblin_Shaman') {
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
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Rock_Biter_Clan_Goblin_Shaman') {
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
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Sharp_Tooth_Clan_Goblin_Shaman') {
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
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Skull_Breaker_Clan_Goblin_Shaman') {
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
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Three_Feather_Clan_Goblin_Shaman') {
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
                    if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'White_Skin_Clan_Goblin_Shaman') {
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
                } catch (error) {
                    console.log("onCharacterLoaded game.monsters.forEach", error)
                }
            })
        } catch (error) {
            console.log('onCharacterLoaded', error)
        }
    });

    onInterfaceReady((ctx) => {
        try {
            if (mod.manager.getLoadedModList().includes('dbox')) {
                const dbox = mod.api.dbox;
                if (!dbox) {
                    return;
                }
                const khajiit_merchant_risaad_box = mod.api.dbox.create('khajiit_merchant_risaad_box', {
                    title: 'Khajiit Merchant Risaad',
                    startingDialogId: '0',
                    characters: [{
                        id: 'khajiit_merchant_risaad',
                        name: 'Risaad',
                        alignment: 'friendly',
                        media: 'assets/dialog/Risaad.png'
                        //   media: game.monsters.getObjectByID('melvorD:Golbin').media
                    }],
                    dialogs: [{
                        id: '0',
                        character: 'khajiit_merchant_risaad',
                        text: ['Welcome. If I cannot serve you, I am sure that one of my other traders can do so.'],
                        options: [
                            { to: '3', text: 'What\'re ya sellin\'?', isSpeech: true },
                            { to: '1', text: 'I\'m curious about your homeland.', isSpeech: true },
                            { to: '2', text: 'Why sell your goods in Melvor?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    }, {
                        id: '1',
                        character: 'khajiit_merchant_risaad',
                        text: 'The Khajiit hail from a distant land called Elsweyr, bordered on the north by Cyrodiil and the south by the glistening blue waters of the sea. Elsweyr is an arid land of deserts and rocky canyons, where the sun shines warmly, always. There are cities so ancient, the sands have swallowed them whole. But now I will say no more, for I miss my home greatly.',
                        options: [
                            { to: '3', text: 'What\'re ya sellin\'?', isSpeech: true },
                            { to: '2', text: 'Why sell your goods in Melvor?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: '2',
                        character: 'khajiit_merchant_risaad',
                        text: ['An astute question, for we are far from home and this is a cold, hard land. The wise trader finds the best opportunities, even if he must travel far to find them. Skyrim is a ripe opportunity indeed. The dragons and the war have scared many other traders away, but for those with courage, there is much profit to be made.'],
                        options: [
                            { to: '3', text: 'What\'re ya sellin\'?', isSpeech: true },
                            { to: '1', text: 'I\'m curious about your homeland.', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: '3',
                        character: 'khajiit_merchant_risaad',
                        text: ['What\'re ya buyin?'],
                        options: [
                            { to: 'exit', losses: { gp: Khajiit_Item_1_Price ? Khajiit_Item_1_Price * Khajiit_Item_1_qty : 100 * Khajiit_Item_1_qty }, rewards: { items: [{ id: Khajiit_Item_1 ? Khajiit_Item_1 : 'tes:Sweetroll', qty: Khajiit_Item_1_qty ? Khajiit_Item_1_qty : 1 }] } },
                            { to: 'exit', losses: { gp: Khajiit_Item_2_Price ? Khajiit_Item_2_Price : 100 }, rewards: { items: [{ id: Khajiit_Item_2 ? Khajiit_Item_2 : 'tes:Sweetroll' }] } },
                            { to: 'exit', losses: { gp: Khajiit_Item_3_Price ? Khajiit_Item_3_Price : 100 }, rewards: { items: [{ id: Khajiit_Item_3 ? Khajiit_Item_3 : 'tes:Sweetroll' }] } },
                            { to: '0', text: 'What were we talking about again?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: 'exit',
                        character: 'khajiit_merchant_risaad',
                        text: ['May your road lead you to warm sands.'],
                        options: [{ text: 'You too' }]
                    }]
                }, ctx);

                const khajiit_merchant_atahbah_box = mod.api.dbox.create('khajiit_merchant_atahbah_box', {
                    title: 'Khajiit Merchant Atahbah',
                    startingDialogId: '0',
                    characters: [{
                        id: 'khajiit_merchant_atahbah',
                        name: 'Atahbah',
                        alignment: 'friendly',
                        media: 'assets/dialog/Atahbah.png'
                    }],
                    dialogs: [{
                        id: '0',
                        character: 'khajiit_merchant_atahbah',
                        text: ['We have been in this land for so long, I have forgotten what it feels like to walk on warm sand.'],
                        options: [
                            { to: '3', text: 'Whats for sale?', isSpeech: true },
                            { to: '1', text: 'Do you reget coming to Melvor?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    }, {
                        id: '1',
                        character: 'khajiit_merchant_atahbah',
                        text: 'In truth I do not. I have always dreamed of seeing new lands, and it does not hurt that we are making a good profit.',
                        options: [
                            { to: '3', text: 'Whats for sale?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: '3',
                        character: 'khajiit_merchant_atahbah',
                        text: ['This and that.'],
                        options: [
                            { to: 'exit', losses: { gp: 50 }, rewards: { items: [{ id: 'tes:Lockpick', qty: 10 }] } },
                            { to: 'exit', losses: { gp: Khajiit_Item_2_Price ? Khajiit_Item_2_Price : 100 }, rewards: { items: [{ id: Khajiit_Item_2 ? Khajiit_Item_2 : 'tes:Sweetroll' }] } },
                            { to: 'exit', losses: { gp: Khajiit_Item_1_Price ? Khajiit_Item_1_Price * 9 : 100 }, rewards: { items: [{ id: Khajiit_Item_1 || 'tes:Sweetroll', qty: 10 }] } },
                            { to: '0', text: 'What were we talking about again?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: 'exit',
                        character: 'khajiit_merchant_atahbah',
                        text: ['May your road lead you to warm sands.'],
                        options: [{ text: 'You too' }]
                    }]
                }, ctx);

                const khajiit_merchant_ahkari_box = mod.api.dbox.create('khajiit_merchant_ahkari_box', {
                    title: 'Khajiit Merchant Ahkari',
                    startingDialogId: '0',
                    characters: [{
                        id: 'khajiit_merchant_ahkari',
                        name: 'Ahkari',
                        alignment: 'friendly',
                        media: 'assets/dialog/Ahkari.png'
                    }],
                    dialogs: [{
                        id: '0',
                        character: 'khajiit_merchant_ahkari',
                        text: ['So many refuse to talk to us. They call us thieves and smugglers. I am glad to see that you are not such a one.'],
                        options: [
                            { to: '3', text: 'Whats for sale?', isSpeech: true },
                            { to: '1', text: 'Have you had trouble with the locals?', isSpeech: true },
                            { to: '2', text: 'How long have you been in Melvor?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },
                    {
                        id: '1',
                        character: 'khajiit_merchant_ahkari',
                        text: 'Mostly it is the Golbins. They do not like outsiders in their land, and so we are forbidden to enter the cities. When they look upon us, they see only pickpockets and skooma dealers. It is most unfair, but we do our best to ignore them.',
                        options: [
                            { to: '3', text: 'Whats for sale?', isSpeech: true },
                            { to: '2', text: 'How long have you been in Melvor?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },
                    {
                        id: '2',
                        character: 'khajiit_merchant_ahkari',
                        text: 'Not long, in truth. I came to Melvor after I found myself unwelcome in both Elsweyr and Cyrodiil. I seem to have an unfortunate talent for getting myself involved in misunderstandings with the law. Ri\'saad was able to look past that, and it was he who helped to set me up with a trade caravan. Now I work for him.',
                        options: [
                            { to: '3', text: 'Whats for sale?', isSpeech: true },
                            { to: '1', text: 'Have you had trouble with the locals?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: '3',
                        character: 'khajiit_merchant_ahkari',
                        text: ['This and that.'],
                        options: [
                            { to: 'exit', losses: { gp: Khajiit_Item_1_Price ? Khajiit_Item_1_Price * Khajiit_Item_1_qty : 100 * Khajiit_Item_1_qty }, rewards: { items: [{ id: Khajiit_Item_1 ? Khajiit_Item_1 : 'tes:Sweetroll', qty: Khajiit_Item_1_qty ? Khajiit_Item_1_qty + 1 : 1 }] } },
                            { to: 'exit', losses: { gp: Khajiit_Item_2_Price ? Khajiit_Item_2_Price * 1.1 : 100 }, rewards: { items: [{ id: Khajiit_Item_2 ? Khajiit_Item_2 : 'tes:Sweetroll' }] } },
                            { to: 'exit', losses: { gp: Khajiit_Item_3_Price ? Khajiit_Item_3_Price * 0.9 : 100 }, rewards: { items: [{ id: Khajiit_Item_3 ? Khajiit_Item_3 : 'tes:Sweetroll' }] } },
                            { to: '0', text: 'What were we talking about again?', isSpeech: true },
                            { to: 'exit', text: 'Good bye', isSpeech: true },
                        ]
                    },

                    {
                        id: 'exit',
                        character: 'khajiit_merchant_ahkari',
                        text: ['May your road lead you to warm sands.'],
                        options: [{ text: 'You too' }]
                    }]
                }, ctx);

                const melvorAreas = ["woodcutting", "fishing", "firemaking", "cooking", "mining", "smithing", "thieving", "farming", "fletching", "crafting", "runecrafting", "herblore", "agility", "summoning", "astrology", "township", "magic", "combat"]
                if (mod.manager.getLoadedModList().includes("[Myth] Music")) {
                    melvorAreas.push("music")
                }
                const area = melvorAreas[Math.floor(Math.random() * melvorAreas.length)] + '-container';
                console.log('Merchant is at: ', area)

                if (Math.random() < 0.3) {
                    document.getElementById(area).firstElementChild.after(khajiit_merchant_ahkari_box.root);
                } else if (Math.random() < 0.5) {
                    document.getElementById(area).firstElementChild.after(khajiit_merchant_risaad_box.root);
                } else {
                    document.getElementById(area).firstElementChild.after(khajiit_merchant_atahbah_box.root);
                }
            }

            ui.createStatic('#modal-book--The_Black_Horse_Courier_Waterfront', document.body);
            document.body.querySelector('.modal.The_Black_Horse_Courier_Waterfront').id = 'The_Black_Horse_Courier_Waterfront';

            ui.createStatic('#modal-book--recommendation_letter', document.body);
            document.body.querySelector('.modal.recommendation_letter').id = 'recommendation_letter';
        } catch (error) {
            console.log('onInterfaceReady', error)
        }
    });
}


// this.context.patch(CombatManager, "onEnemyDeath").after(function () {
//     this.enemy
//     if ((this.selectedArea instanceof Dungeon)) {
//         if (this.dungeonProgress === this.selectedArea.monsters.length) {
//             GlobalDroptableManager.rollGlobalDroptable(this);
//         }
//     } else if (this.activeEvent === undefined) {
//         GlobalDroptableManager.rollGlobalDroptable(this);
//     }
// });

// // cm = CombatManager
// const item = cm.game.items.getObjectByID(`${Constants.MOD_NAMESPACE}:${localItemId}`);
// if (item === undefined) {
//     throw new Error(`Invalid item ID ${localItemId}`);
// }
// cm.bank.addItem(item, 1, true, true, false);


// ctx.onInterfaceReady(() => {
//     // @ts-ignore: The container is guaranteed to exist
//     const contentContainerElement: Element = document.getElementById('main-container');

//     // Add template to container
//     // Create overview by using component and template definitions
//     ui.create(GlobalDroptableOverview(), contentContainerElement);
// });

// return {
//     $template: '#runescape-Encounters-in-Melvor__global-droptable-overview-container-template',
//     items: props.items
// }