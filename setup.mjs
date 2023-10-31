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

    onModsLoaded(async (ctx) => {
        if (cloudManager.hasTotHEntitlement) {
            console.log('hasTotHEntitlement')
            await ctx.gameData.addPackage('data-toth.json');
        } else {
            console.log('Vinilla')
        }
    });

    // manager,game,hitpoints,stun,sleep,nextAction,attackCount,stunImmunity,isAttacking,firstHit,slowCount,effectCount,frostBurnCount,barrier,maxBarrierPercent,barrierRegenTurns,barrierTurns,hasBarrier,modifierEffects,reflexiveEffects,reductiveEffects,incrementalEffects,stackingEffect,comboEffects,activeDOTs,bufferedRegen,target,equipmentStats,levels,stats,attackType,hitchance,availableAttacks,targetModifiers,canCurse,canAurora,passives,turnsTaken,timers,nextAttack,_events,on,off,state,modifiers,spellSelection,noun,rendersRequired,randomAttackType,isBoss,monster,curse

    // _namespace,_localID,damage,prehitEffects,onhitEffects,usesRunesPerProc,usesPrayerPointsPerProc,usesPotionChargesPerProc,isDragonbreath,minAccuracy,defaultChance,cantMiss,attackCount,attackInterval,lifesteal,attackTypes,descriptionGenerator,_name,_description

    // Random attack?
    // Cruelty_Heart
    // Add summons for each guild, like hireing mage apprentiec?
    // While wearing a shit ring, kill x ?
    // https://en.uesp.net/wiki/Oblivion:Alteration
    // https://en.uesp.net/wiki/Oblivion:Alchemy

    onCharacterLoaded(ctx => {
        ctx.patch(Character, 'modifyAttackDamage').after((damage, target, attack) => {
            let newDamage = damage
            // Remove all damage and return if wardsaved
            if (target && target.modifiers && target.modifiers.wardsave) {
                let temp_save = target.modifiers.wardsave
                if (temp_save > 90) {
                    temp_save = 90
                }
                if (Math.floor(Math.random() * 100) + 1 > temp_save) {
                    return 0;
                }
            }
            // Add flat damage if target is all full hp
            if (target.stats.maxHitpoints === target.hitpoints) {
                let percDamage = 0
                if (game.combat.player.modifiers.increasedPercDamageWhileTargetHasMaxHP) {
                    percDamage = newDamage * game.combat.player.modifiers.increasedPercDamageWhileTargetHasMaxHP
                }
                let flatDam = 0
                if (game.combat.player.modifiers.increasedFlatDamageWhileTargetHasMaxHP) {
                    flatDam = game.combat.player.modifiers.increasedFlatDamageWhileTargetHasMaxHP
                }
                newDamage = newDamage + flatDam + percDamage
            }
            // If it's a dragon breath re-calc
            if (attack.isDragonbreath) {
                newDamage = newDamage + target.modifiers.increasedDragonBreathDamage
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
    });
    onInterfaceReady(() => {
        ui.createStatic('#modal-book--The_Black_Horse_Courier_Waterfront', document.body);
        document.body.querySelector('.modal.The_Black_Horse_Courier_Waterfront').id = 'The_Black_Horse_Courier_Waterfront';

        ui.createStatic('#modal-book--recommendation_letter', document.body);
        document.body.querySelector('.modal.recommendation_letter').id = 'recommendation_letter';
    });
}