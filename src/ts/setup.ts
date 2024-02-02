// Changes to do:
// "tes:Moth_Priest"
// Mages shop is half empty
//  get-childitem *.png | foreach { rename-item $_ $_.Name.Replace("-min", "") }

// game.testForOffline(1)

// New modifiers
// increasedChanceToApplySlowOnSpawn: number,
// decreasedChanceToApplySlowOnSpawn: number,
// increasedChanceToApplyStunOnSpawn: number,
// decreasedChanceToApplyStunOnSpawn: number,
// increasedChanceToApplyPoisonOnSpawn: number,
// decreasedChanceToApplyPoisonOnSpawn: number,
// increasedChanceToApplyDeadlyPoisonOnSpawn: number,
// decreasedChanceToApplyDeadlyPoisonOnSpawn: number,

// deathMark: number,
// increasedDeathMarkOnHit: number,
// increasedChanceToApplyStackOfDeathMark: number,
// decreasedChanceToApplyStackOfDeathMark: number,
// increasedDeathMarkImmunity: number,
// decreasedDeathMarkImmunity: number,

// increasedDamageTakenFromAirSpells: number,
// decreasedDamageTakenFromAirSpells: number,
// increasedDamageTakenFromWaterSpells: number,
// decreasedDamageTakenFromWaterSpells: number,
// increasedDamageTakenFromEarthSpells: number,
// decreasedDamageTakenFromEarthSpells: number,
// increasedDamageTakenFromFireSpells: number,
// decreasedDamageTakenFromFireSpells: number,

// increasedDamage: `increasedDamageAgainst${typePluralName}`,
// decreasedDamage: `decreasedDamageAgainst${typePluralName}`,
// increasedDamageTaken: `increasedDamageTakenFrom${typePluralName}`,
// decreasedDamageTaken: `decreasedDamageTakenFrom${typePluralName}`,
// increasedMaxHitPercent: `increasedMaxHitPercentAgainst${typePluralName}`,
// decreasedMaxHitPercent: `decreasedMaxHitPercentAgainst${typePluralName}`,
// increasedMaxHitFlat: `increasedMaxHitFlatAgainst${typePluralName}`,
// decreasedMaxHitFlat: `decreasedMaxHitFlatAgainst${typePluralName}`,
// increasedMinHitBasedOnMaxHit: `increasedMinHitBasedOnMaxHitAgainst${typePluralName}`,
// decreasedMinHitBasedOnMaxHit: `decreasedMinHitBasedOnMaxHitAgainst${typePluralName}`,
// increasedFlatMinHit: `increasedFlatMinHitAgainst${typePluralName}`,
// decreasedFlatMinHit: `decreasedFlatMinHitAgainst${typePluralName}`,
// increasedGlobalAccuracy: `increasedGlobalAccuracyAgainst${typePluralName}`,
// decreasedGlobalAccuracy: `decreasedGlobalAccuracyAgainst${typePluralName}`,
// increasedDamageReduction: `increasedDamageReductionAgainst${typePluralName}`,
// decreasedDamageReduction: `decreasedDamageReductionAgainst${typePluralName}`,
import '../css/styles.css';
import { languages } from './../language';
export async function setup(ctx: Modding.ModContext) {
  try {
    var link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);

    var link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous'
    document.head.appendChild(link2);

    var link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=The+Nautigal&display=swap';
    document.head.appendChild(link3);

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
      isNegative: false,
      tags: ['combat']
    };
    modifierData.tes_increasedPercDamageWhileTargetHasMaxHP = {
      get langDescription() {
        return getLangString('tes_increasedPercDamageWhileTargetHasMaxHP');
      },
      description: '+${value}% damage while the target is fully healed.',
      isSkill: false,
      isNegative: false,
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
    modifierData.tes_bypassDamageReduction = {
      get langDescription() {
        return getLangString('tes_bypassDamageReduction');
      },
      description: '${value} damage, though damage reduction.',
      isSkill: false,
      isNegative: false,
      tags: ['combat']
    };
    // variables to move between load functions
    let Khajiit_Item_1 = ""
    let Khajiit_Item_1_Price = 100
    let Khajiit_Item_1_qty = 1
    let Khajiit_Item_2 = ""
    let Khajiit_Item_2_Price = 100
    let Khajiit_Item_2_qty = 1
    let Khajiit_Item_3 = ""
    let Khajiit_Item_3_Price = 100
    let Khajiit_Item_3_qty = 1
    let Khajiit_Item_4 = ""
    let Khajiit_Item_4_Price = 100
    let Khajiit_Item_4_qty = 1
    let Khajiit_Item_5 = ""
    let Khajiit_Item_5_Price = 100
    let Khajiit_Item_5_qty = 1
    const bards_college_items: any[] = []

    ctx.onModsLoaded(async (ctx) => {
      let start = new Date();
      try {
        // Local variables
        const mythLoaded = mod.manager.getLoadedModList().includes("[Myth] Music")
        const kcm = mod.manager.getLoadedModList().includes('Custom Modifiers in Melvor')
        const profileSkill = mod.manager.getLoadedModList().includes('Class &amp; Species')
        const TothEntitlement = cloudManager.hasTotHEntitlement
        const AoDEntitlement = cloudManager.hasAoDEntitlement

        // const Abyssal = mod.manager.getLoadedModList().includes('Abyssal Rift')
        // const Pokeworld = mod.manager.getLoadedModList().includes('Pokeworld (Generation 1)')
        // const Runescape = mod.manager.getLoadedModList().includes('Runescape Encounters in Melvor')

        // Translations
        try {
          let lang = setLang;

          if (lang === 'lemon' || lang === 'carrot') {
            lang = 'en';
          }
          // @ts-ignore
          if (languages[lang]) {
            // @ts-ignore
            for (const [key, value] of Object.entries<string>(languages[lang])) {
              loadedLangJson[key] = value;
            }
          } else {
            // @ts-ignore
            for (const [key, value] of Object.entries<string>(languages.en)) {
              loadedLangJson[key] = value;
            }
          }
          // End Translations
        } catch (error) {
          console.log("onModsLoaded Translations ", error)
        }
        // Packages to load based on entitlement
        try {
          if (TothEntitlement) {
            await ctx.gameData.addPackage('data-toth.json');
          }
          if (AoDEntitlement) {
            await ctx.gameData.addPackage('data-aod.json');
          }
          // add items to bards college before mods load
          bards_college_items.push(game.items.getObjectByID(`tes:Sweetroll`))
          bards_college_items[0].baseChanceDenominator = "1000"
          bards_college_items.push(game.items.getObjectByID(`tes:Bard_Drum`))
          bards_college_items[1].baseChanceDenominator = "10000"
          bards_college_items.push(game.items.getObjectByID(`tes:Bard_Flute`))
          bards_college_items[2].baseChanceDenominator = "10000"
          bards_college_items.push(game.items.getObjectByID(`tes:Bard_Lute`))
          bards_college_items[3].baseChanceDenominator = "10000"
          bards_college_items.push(game.items.getObjectByID(`tes:King_Olafs_Verse`))
          bards_college_items[4].baseChanceDenominator = "Random (Hard)"
          bards_college_items[4].chanceIncreaseInfo = "Monster combat level increases this items drop chance."
          if (mythLoaded) {
            // increasedMusicHireCost: number;
            // decreasedMusicHireCost: number;
            // increasedMusicGP: number;
            // decreasedMusicGP: number;
            // increasedChanceToObtainShrimpWhileTrainingMusic: number;
            // decreasedChanceToObtainShrimpWhileTrainingMusic: number;
            // increasedSheetMusicDropRate: number;
            // decreasedSheetMusicDropRate: number;
            // increasedMusicAdditionalRewardRoll: number;
            // decreasedMusicAdditionalRewardRoll: number;
            await ctx.gameData.addPackage('data-bard.json');
            bards_college_items.push(game.items.getObjectByID(`mythMusic:Polished_Topaz_Gem`))
            bards_college_items[5].baseChanceDenominator = "2500"
            bards_college_items.push(game.items.getObjectByID(`mythMusic:Polished_Ruby_Gem`))
            bards_college_items[6].baseChanceDenominator = "2500"
            bards_college_items.push(game.items.getObjectByID(`mythMusic:Polished_Sapphire_Gem`))
            bards_college_items[7].baseChanceDenominator = "2500"
          }
          if (kcm) {
            const cmim = mod.api.customModifiersInMelvor;
            if (!cmim) {
              return;
            }
            const DragonList = [
              "tes:Ysmir_Iceheart",
              "tes:Alduin",
              "tes:Elsweyr_Dragon",
              "tes:red_dragon",
              "tes:green_dragon",
              "tes:blue_dragon",
              "tes:MartinSeptim",
              "melvorD:PratTheProtectorOfSecrets",
              "melvorD:GreenDragon",
              "melvorD:BlueDragon",
              "melvorD:RedDragon",
              "melvorD:BlackDragon",
              "melvorD:MalcsTheGuardianOfMelvor",
              "melvorF:ElderDragon",
              "melvorF:ChaoticGreaterDragon",
              "melvorF:HuntingGreaterDragon",
              "melvorF:WickedGreaterDragon",
              "melvorF:MalcsTheLeaderOfDragons",
              "melvorF:GreaterSkeletalDragon",
              "melvorD:ProtectorofIce"
            ]
            const HumansList = [
              "tes:Necromancer",
              "tes:Bandit",
              "tes:Thief",
              "tes:Havilstein_Hoar",
              "tes:Matthias_Draconis",
              "tes:Perennia_Draconis",
              "tes:Caelia_Draconis",
              "tes:Sibylla_Draconis",
              "tes:Andreas_Draconis",
              "tes:Celedaen",
              "tes:Imperial_Watch",
              "melvorF:BountyHunter",
              "melvorD:BlackKnight",
              "melvorD:ConfusedPirate",
              "melvorD:FrozenArcher",
              "melvorD:Pirate",
              "melvorD:FirstMate",
              "melvorD:JuniorFarmer",
              "melvorD:AdultFarmer",
              "melvorD:MasterFarmer",
              "melvorD:Wizard",
              "melvorD:SteelKnight",
              "melvorD:MithrilKnight",
              "melvorD:AdamantKnight",
              "melvorD:RuneKnight",
              "melvorD:BanditTrainee",
              "melvorD:Bandit",
              "melvorD:BanditLeader",
              "melvorD:DarkWizard",
              "melvorD:MasterWizard",
              "melvorD:ElderWizard",
              "melvorF:Druid",
              "melvorF:Thief",
              "melvorF:Shaman",
              "melvorF:Necromancer",
              "melvorF:Elementalist",
              "melvorF:Paladin",
              "melvorF:Priest",
              "melvorF:WanderingBard",
            ]
            const UndeadList = [
              "tes:Vicente_Valtieri",
              "tes:Harkon",
              "tes:Harkon2",
              "tes:Zombie",
              "tes:Lich",
              "tes:skeleton_Archer",
              "tes:Mannimarco",
              "tes:Draugr",
              "tes:Skinned_Hound",
              "tes:Flesh_Atronach",
              "melvorD:PirateCaptain",
              "melvorD:ZombieHand",
              "melvorD:Zombie",
              "melvorD:ZombieLeader",
              "melvorD:Ghost",
              "melvorD:Skeleton",
              "melvorF:UndeadWerewolf",
              "melvorF:CursedLich",
              "melvorF:GreaterSkeletalDragon",
              "melvorF:Mummy",
              "melvorF:Vampire",
              "melvorF:ElderVampire",
              "melvorF:CursedMaiden"
            ]
            const DemonList = [
              "tes:Xivilai",
              "tes:Meridia",
              "tes:Azura",
              "tes:Boethiah",
              "tes:Clavicus_Vile",
              "tes:Hermaeus_Mora",
              "tes:Hircine",
              "tes:Malacath",
              "tes:Mehrunes_Dagon",
              "tes:Molag_Bal",
              "tes:Namira",
              "tes:Peryite",
              "tes:Sanguine",
              "tes:Vaermina",
              "tes:Nocturnal",
              "tes:Sheogorath",
              "tes:Golden_Saint",
              "tes:Dark_Seducer",
              "melvorF:RedDevil",
              "melvorF:FierceDevil",
              "melvorF:FireGuard",
              "melvorF:Ignis",
              "melvorF:Ragnar"
            ]
            const BeastList = [
              "tes:Sload",
              "tes:Cliff_Racer",
              "tes:Alit",
              "tes:Dreugh",
              "tes:Guar",
              "tes:Netch",
              "tes:Kagouti",
              "tes:Nix_Hound",
              "tes:Hoarvor",
              "tes:Nereid",
              "tes:Spriggan",
              "tes:Echatere",
              "tes:Riekr",
              "tes:Heron",

              "tes:Shrieking_Harpy",
              "tes:Lamia",
              "tes:Welwa",
              "tes:Duneripper",
              "tes:Den_Mother",
              "tes:Blue_Oasis_Dragon_Frog",
              "tes:Infernal_Sep_Adder",
              "tes:Gravelclaw",
              "tes:Guzzard",
              "tes:Voriplasm",
              "tes:Wamasu",
              "tes:Death_Hopper",

              "tes:Skinned_Hound",
              "tes:Baliwog",
              "tes:Scalon",
              "tes:Grummite",
              "tes:Elytra",
              "tes:Shambles",

              "tes:Lucerne",
              "tes:Melka",
              "tes:Moira",
              "tes:Petra",
              "tes:Drascua",
              "tes:Hagraven",

              "melvorD:WetMonster", "melvorD:SweatyMonster", "melvorD:MoistMonster", "melvorD:IceMonster", "melvorF:StoneSnake", "melvorF:Statue", "melvorF:GooMonster", "melvorF:GreenGooMonster", "melvorF:PurpleGooMonster", "melvorF:ScatteredGooMonster", "melvorF:LotsofEyes", "melvorF:ManyEyedMonster", "melvorF:StrangeEyedMonster", "melvorF:Eyes", "melvorF:SuperiorEyedMonster", "melvorF:EyeOfFear", "melvorF:SandBeast", "melvorF:RagingHornedElite", "melvorF:SeethingHornedElite", "melvorF:DarkHornedElite", "melvorF:FuriousHornedElite", "melvorTotH:LargeIceTroll", "melvorD:IceTroll", "melvorD:Ice", "melvorD:TheEye", "melvorD:ResurrectedEye", "melvorF:AirMonster", "melvorF:AirGuard"
            ]
            const GoblinList = [
              "melvorD:Golbin",
              "melvorD:RangedGolbin",
              "tes:Bitterfish_Clan_Goblin_Shaman",
              "tes:Bloody_Hand_Tribe_Goblin_Shaman",
              "tes:Dust_Eater_Clan_Goblin_Shaman",
              "tes:Rock_Biter_Clan_Goblin_Shaman",
              "tes:Sharp_Tooth_Clan_Goblin_Shaman",
              "tes:Skull_Breaker_Clan_Goblin_Shaman",
              "tes:Three_Feather_Clan_Goblin_Shaman",
              "tes:White_Skin_Clan_Goblin_Shaman",
              "tes:Goblin_War_Chief",
              "tes:Goblin_Ambusher",
              "tes:Goblin_Berserker",
              "tes:Goblin_Netherboss",
              "tes:Goblin_Rat_Farmer",
              "tes:Goblin_Shaman",
              "tes:Goblin_Skirmisher",
              "tes:Goblin_Warlord",
              "tes:Goblin_Witch",
              "tes:Goblin_Chef",
              "tes:Savage_Goblin"
            ]
            const MythList = [
              "tes:Gryphon",
              "tes:Indrik",
              "melvorD:ElerineMage",
              "melvorD:ElerineWarrior",
              "melvorD:ElerineArcher",
              "melvorF:Griffin",
              "melvorF:Pegasus",
              "melvorF:Cerberus",
              "melvorF:Phoenix",
              "melvorF:Aleron",
              "melvorF:EarthGuard",
              "melvorF:EarthMonster",
              "melvorF:Ophidia",
              "melvorF:FireMonster",
              "melvorTotH:IceHydra",
              "melvorF:Aeris",
              "melvorF:Voltaire",
              "melvorF:Aleron"
            ]
            const elfList = [
              "tes:Umaril",
              "tes:Ungolim",
              "tes:Alval_Uvani",
              "tes:Mannimarco",
              "tes:Laloriaran",
            ]
            const KhajiitList = [
              "tes:JGhasta"
            ]
            const RobotsList = [
              "tes:Divine_Crusader",
              "tes:Pelinal_Whitestrake",
            ]
            const ArgonianList = [
              "tes:Shaleez"
            ]
            const OrcList = [
              "tes:The_Gray_Prince",
              "melvorF:TurkulRiders",
              "melvorF:TurkulArchers",
              "melvorF:TurkulThrowers",
              "melvorF:TurkulGiant",
              "melvorF:TurkulGeneral"
            ]
            const SeaCreatureList = [
              "melvorF:MioliteSprig",
              "melvorF:MioliteTrio",
              "melvorF:MioliteWarden",
              "melvorF:MioliteMonarch",
              "melvorD:GiantCrab",
              "melvorD:Tentacle",
              "melvorD:TheKraken",
              "melvorF:Lissia",
              "melvorF:Murtia",
              "melvorF:Umbora",
              "melvorF:Rokken",
              "melvorF:Kutul",
              "melvorF:Lissia",
              "melvorF:Murtia",
              "melvorF:MioliteWarden",
            ]
            const PlantList = [
              "melvorD:Plant"
            ]
            const AngelList: any[] = [
              "melvorF:Angel",
              "melvorF:Fairy",
              "melvorF:Valkyrie",
              "melvorF:HolyArcher"
            ]
            const AarakocraList: any[] = []
            const AnimalList: any[] = [
              "tes:Assassin_Beetle",
              "tes:Giant_Scorpion",
              "tes:Giant_Mudcrab",
              "tes:mudcrab",
              "melvorD:Chicken",
              "melvorD:Cow",
              "melvorD:Chick",
              "melvorD:MummaChicken",
              "melvorD:Leech",
              "melvorD:Bat",
              "melvorD:BigBat",
              "melvorD:ViciousSerpent",
              "melvorD:Spider",
              "melvorD:BrownSpider",
              "melvorD:EvilSpider",
              "melvorD:SpiderKing",
              "melvorD:Seagull",
              "melvorD:FrozenMammoth",
              "melvorF:AirGuard",
              "melvorF:LegaranWurm",
              "melvorF:NoxiousSerpent",
              "melvorF:VenomousSnake",
              "melvorF:GiantMoth",
              "melvorF:RancoraSpider",
              "melvorF:SpikedRedClaw"
            ]
            const ElementalCreatureList: any[] = [
              "melvorD:Ice",
              "melvorD:FireSpirit",
              "melvorF:AirGolem",
              "melvorF:WaterGuard",
              "melvorF:WaterMonster",
              "melvorF:WaterGolem",
              "melvorF:Glacia",
              "melvorF:EarthGolem",
              "melvorF:FireGolem",
            ]
            const GiantList = [
              "melvorD:HillGiant", "melvorD:MossGiant", "melvorF:GiantMoth", "melvorD:GiantCrab", "melvorF:TurkulGiant",
              "tes:Giant",
              "tes:Giant_Scorpion",
              "tes:Giant_Mudcrab",
            ]

            if (TothEntitlement) {
              UndeadList.push(
                "tes:undead_Junior_Farmer",
                "melvorF:ElderVampire",
                "melvorTotH:CursedSkeletonWarrior",
                "melvorTotH:CursedSpirit",
                "melvorTotH:LadyDarkheart",
                "melvorTotH:Phantom",
                "melvorTotH:Banshee",
                "melvorTotH:Spectre",
                "melvorTotH:VorloranDevastator",
                "melvorTotH:VorloranWatcher",
                "melvorTotH:VorloranProtector",
              )
              KhajiitList.push("tes:Maiq_the_Liar")
              SeaCreatureList.push(
                "melvorTotH:TwinSeaDragonSerpent",
                "melvorTotH:Leviathan",
              )
              BeastList.push(
                "melvorTotH:PoisonToad",
                "melvorTotH:Conda",
                "melvorTotH:BurningSnake",
                "melvorTotH:PolarBear",
                "melvorTotH:SpectralIceWolf",
                "melvorTotH:MonsterCroc",
                "melvorTotH:ScouterSpider",
                "melvorTotH:TrapperSpider",
                "melvorTotH:WickedSpider",
                "melvorTotH:BasherSpider",
                "melvorTotH:EnforcerSpider",
                "melvorTotH:GuardianSpider",
                "melvorTotH:SpiderQueen",
                "melvorTotH:Beholder",
                "melvorTotH:ShadowBeast",
              )
              PlantList.push(
                "melvorTotH:HungryPlant",
                "melvorTotH:Alraune",
                "melvorTotH:Morellia",
                "melvorTotH:TreeGiant",
                "melvorTotH:TreeSpirit",
              )
              DragonList.push(
                "melvorTotH:Kongamato", "melvorTotH:GretYun", "melvorTotH:RaZu",
              )
              DemonList.push("melvorTotH:MagicFireDemon",)
              MythList.push(
                "melvorTotH:Manticore",
                "melvorTotH:IceHydra",
                "melvorTotH:Leviathan",
                "melvorTotH:Siren",
                "melvorTotH:GoliathWerewolf",
                "melvorTotH:Torvair",
                "melvorTotH:Arctair",
                "melvorTotH:Harkair",
                "melvorTotH:Cockatrice",
                "melvorTotH:GuardianoftheHerald",
              )
              ElementalCreatureList.push(
                "melvorTotH:InfernalGolem", "melvorTotH:Trogark", "melvorTotH:LargeIceTroll", "melvorTotH:FrostGolem", "melvorTotH:LightningSpirit", "melvorTotH:LightningGolem", "melvorTotH:LightningMonkey",
              )
              HumansList.push("melvorTotH:PlagueDoctor",)
              //     "melvorTotH:TheHeraldPhase1",
              //     "melvorTotH:TheHeraldPhase2",
              //     "melvorTotH:TheHeraldPhase3"

            }
            if (AoDEntitlement) {
              UndeadList.push("tes:skeleton_Archer_AoD")
              DemonList.push("tes:Miraak")
            }
            if (mythLoaded) {
              HumansList.push("mythMusic:Jester",
                "mythMusic:Enchanted_Jester",
                "mythMusic:Mystic_Jester")
            }
            cmim.addMonsters("Dragon", DragonList)
            cmim.addMonsters("Animal", AnimalList)
            cmim.addMonsters("Undead", UndeadList)
            cmim.addMonsters("SeaCreature", SeaCreatureList)
            cmim.addMonsters("Human", HumansList)
            cmim.addMonsters("Demon", DemonList)
            cmim.addMonsters("MythicalCreature", MythList)
            cmim.addMonsters("Elemental", ElementalCreatureList)

            // Tes spcific
            cmim.registerOrUpdateType("Khajiit", "Khajiit", "https://cdn.melvor.net/core/v018/assets/media/pets/octavius_lepidus_viii.png", KhajiitList, true);
            cmim.registerOrUpdateType("Robot", "Robots", "https://cdn.melvor.net/core/v018/assets/media/pets/smithing.png", RobotsList, true);
            cmim.registerOrUpdateType("Argonian", "Argonians", "https://cdn.melvor.net/core/v018/assets/media/monsters/dragon_red.png", ArgonianList, true);

            // Used in other mods
            cmim.registerOrUpdateType("Elf", "Elves", "https://cdn.melvor.net/core/v018/assets/media/pets/elf_rock.png", elfList, true);
            cmim.registerOrUpdateType("Goblin", "Goblins", "https://cdn.melvor.net/core/v018/assets/media/monsters/goblin.png", GoblinList, true);
            cmim.registerOrUpdateType("Plant", "Plants", "https://cdn.melvor.net/core/v018/assets/media/monsters/plant.png", PlantList, true);
            cmim.registerOrUpdateType("Orc", "Orcs", "https://cdn.melvor.net/core/v018/assets/media/monsters/goblin.png", OrcList, true);
            cmim.registerOrUpdateType("Giant", "Giants", "https://cdn2-main.melvor.net/assets/media/monsters/hill_giant.png", GiantList, true);
            cmim.registerOrUpdateType("Beast", "Beasts", "https://cdn2-main.melvor.net/assets/media/monsters/m13.png", BeastList, true);
            cmim.registerOrUpdateType("Aarakocra", "Aarakocras", "https://cdn2-main.melvor.net/assets/media/monsters/torvair.png", AarakocraList, true);
            cmim.registerOrUpdateType("Angel", "Angels", "https://cdn2-main.melvor.net/assets/media/monsters/angel.png", AngelList, true);

            // @ts-ignore
            cmim.forceBaseModTypeActive("Dragon");
            // @ts-ignore
            cmim.forceBaseModTypeActive("Undead");
            // @ts-ignore
            cmim.forceBaseModTypeActive("Human");
            // @ts-ignore
            cmim.forceBaseModTypeActive("Animal");
            // @ts-ignore
            cmim.forceBaseModTypeActive("Demon");
            // @ts-ignore
            cmim.forceBaseModTypeActive("Elemental");
            // @ts-ignore
            cmim.forceBaseModTypeActive("MythicalCreature");
            // @ts-ignore
            cmim.forceBaseModTypeActive("SeaCreature");

            // game.items.registeredObjects.forEach(item => {
            //     if(item._namespace.name === "tes") {
            //         game.bank.addItem(item, 1, true, true, false);
            //     }
            // })

            // namespace_thuum
            await ctx.gameData.addPackage('custom-mods.json');
          }
          if (kcm && profileSkill) {
            // add modifier package
            await ctx.gameData.addPackage('profile.json');
          }
        } catch (error) {
          console.log('onModsLoaded packages ', error)
        }
        // skill patches
        try {
          ctx.patch(CombatManager, "onEnemyDeath").after(() => {
            try {
              const combatLevel = game.combat.enemy.monster.combatLevel
              // Inverse: 1 / 10,000
              // if (combatLevel > 200 && Math.random() < ((combatLevel * Math.random()) / 10000)) {
              if (combatLevel > 20) {
                if (combatLevel > 200 &&
                  Math.random() < (combatLevel / 400) / 10000) {
                  const tes_items = ["tes:King_Olafs_Verse"]
                  const tes_itemId = tes_items[Math.floor(Math.random() * tes_items.length)]
                  const tes_item = game.items.getObjectByID(`${tes_itemId}`);
                  if (tes_item === undefined) {
                    throw new Error(`Invalid item ID ${tes_itemId}`);
                  }
                  game.bank.addItem(tes_item, 1, true, true, false);
                }
                // 1/10,000
                if (combatLevel < 200 && Math.random() < 100 / (10000 + combatLevel)) {
                  const tes_items = ["tes:Bard_Drum", "tes:Bard_Flute", "tes:Bard_Lute"]
                  const tes_itemId = tes_items[Math.floor(Math.random() * tes_items.length)]
                  const tes_item = game.items.getObjectByID(`${tes_itemId}`);
                  if (tes_item === undefined) {
                    throw new Error(`Invalid item ID ${tes_itemId}`);
                  }
                  game.bank.addItem(tes_item, 1, true, true, false);
                }
                // Myth & 1/2,500
                if (mythLoaded && Math.random() < 100 / (2500 + combatLevel)) {
                  const tes_items = ["mythMusic:Polished_Topaz_Gem", "mythMusic:Polished_Ruby_Gem", "mythMusic:Polished_Sapphire_Gem"]
                  const tes_itemId = tes_items[Math.floor(Math.random() * tes_items.length)]
                  const tes_item = game.items.getObjectByID(`${tes_itemId}`);
                  if (tes_item === undefined) {
                    throw new Error(`Invalid item ID ${tes_itemId}`);
                  }
                  game.bank.addItem(tes_item, 1, true, true, false);
                }
                // 1/1,000
                if (Math.random() < 100 / (1000 + combatLevel)) {
                  const tes_items = ["tes:Sweetroll"]
                  const tes_itemId = tes_items[Math.floor(Math.random() * tes_items.length)]
                  const tes_item = game.items.getObjectByID(tes_itemId);
                  if (tes_item === undefined) {
                    throw new Error(`Invalid item ID ${tes_itemId}`);
                  }
                  game.bank.addItem(tes_item, 1, true, true, false);
                }
              }
            } catch (error) {
              console.log("onEnemyDeath patch ", error)
            }
          });
          // @ts-ignore
          ctx.patch(Skill, 'levelUp').after(() => {
            // addXP
            if (game && game.activeAction && game.activeAction._localID) {
              if (game.activeAction._localID === "Magic") {
                if (rollPercentage(10)) {
                  const tes_item = game.items.getObjectByID("tes:magic_mask");
                  if (tes_item === undefined) {
                    throw new Error(`Invalid item ID "tes:magic_mask"`);
                  }
                  game.bank.addItem(tes_item, 1, true, true, false);
                }
              }
              if (game.activeAction._localID === "Combat") {
                if (rollPercentage(10)) {
                  const tes_item = game.items.getObjectByID("tes:dragonbornhat");
                  if (tes_item === undefined) {
                    throw new Error(`Invalid item ID "tes:dragonbornhat"`);
                  }
                  game.bank.addItem(tes_item, 1, true, true, false);
                }
              }
            }
          })
        } catch (error) {
          console.log('onModsLoaded skill patches ', error)
        }
      } catch (error) {
        console.log("onModsLoaded", error)
      }
      // @ts-ignore
      console.log('Tes onModsLoaded time: ', (start - new Date()) / (1000) * -1, ' seconds');
    });

    ctx.onCharacterLoaded(ctx => {
      let start = new Date();
      function calcItemLevel(item: WeaponItemData) {
        try {
          if (item && item.type === "Weapon" || item.type === "Ranged Weapon" || item.type === "Magic Staff" || item.type === "Magic Wand") {
            // item = game.items.getObjectByID('melvorD:Dragon_Dagger')
            // const target = game.monsters.getObjectByID('melvorD:Plant')
            const player = game.combat.player
            const effectiveSkillLevel = item.attackType === 'melee' ? player.levels.Strength : item.attackType === 'ranged' ? player.levels.Ranged : player.levels.Magic
            const accuracy = player.stats ? player.stats.accuracy : 43000
            const targetEvasion = item.attackType === 'melee' ? 220 : item.attackType === 'ranged' ? 640 : 640
            const chanceToHit = (1 - (targetEvasion / (2 * accuracy))) * 100
            const strengthBonus = item.attackType === 'melee' ? item.equipmentStats.find(stat => stat.key === 'meleeStrengthBonus')?.value : item.attackType === 'ranged' ? item.equipmentStats.find(stat => stat.key === 'rangedStrengthBonus')?.value + 60 : item.attackType === 'magic' ? item.equipmentStats.find(stat => stat.key === 'magicDamageBonus')?.value : 0
            const spellMaxHit = 255
            const baseMaxHit = item.attackType === 'magic' ? spellMaxHit * (1 + (strengthBonus / 100)) * (1 + ((effectiveSkillLevel + 1) / 200)) : 10 * (2.2 + (effectiveSkillLevel / 10) + ((effectiveSkillLevel + 17) / 640) * strengthBonus)
            const percentMaxHitModifer = player.modifiers ? player.modifiers.increasedMaxHitPercent : 0
            const flatDam = player.modifiers ? player.modifiers.increasedMaxHitFlat : 0
            const minToMaxPerc = player.modifiers ? player.modifiers.increasedMinHitBasedOnMaxHit : 0
            const maxHit = baseMaxHit * (1 + (percentMaxHitModifer / 100)) + flatDam
            const minHit = Math.min(Math.max(1 + maxHit * minToMaxPerc + flatDam, 1), maxHit)
            const avgHit = ((maxHit + minHit) / 2) * (1 - 0)
            const interval = item.equipmentStats.find(stat => stat.key === 'attackSpeed')?.value
            const dps = (avgHit / interval) * chanceToHit
            return dps ? dps : "Weapon failed"
          } else {
            return "Non Weapon items cannot be processed yet"
          }
        } catch (error) {
          return "There was an error with this item"
        }
      }
      // @ts-ignore
      game.calcItemLevel = calcItemLevel

      try {
        const effectedItems = {
        }
        // itemSynergies translations
        // #modal-content-item-stats Try and get it to display only here
        // #item-view-name
        // #item-view-description
        // @ts-ignore
        const synergiesForExport = []
        // @ts-ignore
        const found_items = []
        game.itemSynergies.forEach(synergies => {
          if (synergies && synergies.length > 0) {
            synergies.forEach(synergy => {
              // @ts-ignore
              const found_items_names = []
              let synergyObjectplayerModifiers = {
                ...synergy.playerModifiers
              }
              synergy.items.forEach(item => {
                // @ts-ignore
                if (item?._namespace?.name === "tes") {
                  // @ts-ignore
                  if (!found_items_names.includes(item.name)) {
                    // @ts-ignore
                    if (item?._namespace?.name === "tes") {
                      // @ts-ignore
                      found_items_names.push(item.name)
                      // @ts-ignore
                      if (!found_items.includes(item)) found_items.push(item)
                      // @ts-ignore
                      if (!synergiesForExport.includes(synergy)) synergiesForExport.push(synergy)
                    }
                  }
                }
              })
              if (found_items_names.length > 0) {
                const entries = Object.entries(synergyObjectplayerModifiers);
                // @ts-ignore
                const boosts = []
                entries.forEach(entry => {
                  (entry.forEach(e => {
                    if (typeof e === 'string') {
                      let pre = "MODIFIER_DATA_"
                      if (e.includes('tes_')) {
                        pre = ""
                      }
                      // @ts-ignore
                      if (typeof synergyObjectplayerModifiers[e] === "object") {
                        // @ts-ignore
                        boosts.push(getLangString(pre + e).replace('${value}', synergyObjectplayerModifiers[e][0].value).replace('${skillName}', synergyObjectplayerModifiers[e][0].skill._localID).replace('${skillName}', synergyObjectplayerModifiers[e][0].skill._localID))
                      } else {
                        // @ts-ignore
                        boosts.push(getLangString(pre + e).replace('${value}', synergyObjectplayerModifiers[e]))
                      }
                    }
                  }))
                })
                // @ts-ignore
                effectedItems[found_items_names.join(', ')] = boosts.join(', ')
              }
            })
          }
        })
        // real item
        // @ts-ignore
        found_items.forEach(item => {
          const tes_item = game.items.getObjectByID(item._namespace.name + ":" + item._localID)
          const possibleSynergies = Object.keys(effectedItems)
          possibleSynergies.forEach((s, i) => {
            if (s.includes(item.name)) {
              // @ts-ignore
              const synergyDes = `. \nWhen equipped with ${possibleSynergies[i]}, grant the following boosts: ${effectedItems[possibleSynergies[i]]}`
              if (tes_item._customDescription) {
                if (tes_item._customDescription.includes(synergyDes)) {
                  // console.log('found double')
                } else {
                  tes_item._customDescription = tes_item._customDescription + synergyDes
                }
              } else {
                tes_item._customDescription = tes_item.description + synergyDes
              }
            }
          })
        })
        // @ts-ignore
        game.tes_itemSynergies = synergiesForExport
      } catch (error) {
        console.log('tes synergy error: ', error)
      }
      const bannedList: any = {
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
      const bannedNameSpace: any = {
        "tes": true
      }
      const categoryBan: any = {
        "Limes": true,
        "Lemon": true,
        "Events": true,
        "Event": true
      }
      // const knownNamespaces = {
      //     "tes": true,
      //     "melvorF": true,
      //     "melvorD": true,
      //     "melvorTotH": true,
      //     "melvorAoD": true
      // }
      // Patching stuff spcific to the Character
      try {
        // Patching skills for new modifiers
        // @ts-ignore
        ctx.patch(Character, 'modifyAttackDamage').after((damage: any, target: any, attack: any) => {
          const MonsterMods: any = game.combat.enemy.modifiers
          const PlayerMods: any = game.combat.player.modifiers
          const TargetMods: any = target.modifiers
          let tesDamage = 0
          const DR: any = TargetMods.increasedDamageReduction - TargetMods.decreasedDamageReduction
          // Remove all damage and return if wardsaved
          if (TargetMods.tes_wardsave) {
            let wardsaveChance = Math.min(TargetMods.tes_wardsave, 90);
            if (rollPercentage(wardsaveChance)) {
              return 0;
            }
          }
          // At HP full damage
          if (!target.monster && target.stats.maxHitpoints === target.hitpoints) {
            // do damage to player
            let percDamage = 0
            if (MonsterMods.tes_increasedPercDamageWhileTargetHasMaxHP) {
              percDamage = tesDamage * (MonsterMods.tes_increasedPercDamageWhileTargetHasMaxHP / 100)
            }
            let flatDam = 0
            if (MonsterMods.tes_increasedFlatDamageWhileTargetHasMaxHP) {
              flatDam = MonsterMods.tes_increasedFlatDamageWhileTargetHasMaxHP
            }
            tesDamage = tesDamage + flatDam + percDamage
          }
          if (target.monster && target.stats.maxHitpoints === target.hitpoints) {
            // Do damage to monster
            let percDamage = 0
            if (PlayerMods.tes_increasedPercDamageWhileTargetHasMaxHP) {
              percDamage = tesDamage * (PlayerMods.tes_increasedPercDamageWhileTargetHasMaxHP / 100)
            }
            let flatDam = 0
            if (PlayerMods.tes_increasedFlatDamageWhileTargetHasMaxHP) {
              flatDam = PlayerMods.tes_increasedFlatDamageWhileTargetHasMaxHP
            }
            tesDamage = tesDamage + flatDam + percDamage
          }
          if (TargetMods.tes_decreaseFlatDamageWhileTargetHasMaxHP && target.stats.maxHitpoints === target.hitpoints) {
            tesDamage = tesDamage - TargetMods.tes_decreaseFlatDamageWhileTargetHasMaxHP
          }
          // If it's a dragon breath re-calc
          if (attack.isDragonbreath) {
            // Flat calc
            tesDamage = tesDamage + TargetMods.tes_increasedDragonBreathDamage

            // % calc
            // tesDamage *= (1 - (TargetMods.tes_increasedDragonBreathDamage - TargetMods.decreasedDragonBreathDamage)) / 100
          }
          // account for damage reduction
          tesDamage = tesDamage - ((tesDamage / 100) * DR)
          // Adding bypass damage
          if (MonsterMods.tes_bypassDamageReduction) {
            tesDamage = tesDamage + MonsterMods.tes_bypassDamageReduction
          }
          // return re-calced damage
          return Math.floor(damage + tesDamage)
        })
        // end patching skills for new modifiers

        // Looping though all game items.
        // const ShopList = []
        const listOfAllWeapons: AnyItem[] = []
        const initialPackage = ctx.gameData.buildPackage(itemPackage => {
          game.items.registeredObjects.forEach((item: AnyItem) => {
            try {
              if (item) {
                if (item.type === "Weapon" || item.type === "Ranged Weapon" || item.type === "Magic Staff" || item.type === "Magic Wand") {
                  listOfAllWeapons.push(item)
                }
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
                // @ts-ignore
                if (item.swalData) {
                  return;
                }
                if (item.type === "Special") {
                  return;
                }
                if (!Khajiit_Item_1 && rollPercentage(1)) {
                  Khajiit_Item_1 = `${item.namespace}:${item.localID}`
                  Khajiit_Item_1_Price = item.sellsFor * 4
                  Khajiit_Item_1_qty = Math.floor(Math.random() * 100)
                  if (Khajiit_Item_1_Price < 1000) { Khajiit_Item_1_qty = Math.floor(Math.random() * 10000) }
                  if (item.type === "Armour" || item.type === "Weapon" || item.type === "Magic_Armour" || item.type === "Trimmed Armour" || item.type === "Magic Armour") {
                    Khajiit_Item_1_qty = 1
                  }
                } else if (!Khajiit_Item_2 && rollPercentage(0.5)) {
                  Khajiit_Item_2 = `${item.namespace}:${item.localID}`
                  Khajiit_Item_2_Price = item.sellsFor * 4
                  Khajiit_Item_2_qty = Math.floor(Math.random() * 50)
                  if (Khajiit_Item_2_Price < 1000) { Khajiit_Item_2_qty = Math.floor(Math.random() * 10000) }
                  if (item.type === "Armour" || item.type === "Weapon" || item.type === "Magic_Armour" || item.type === "Trimmed Armour" || item.type === "Magic Armour") {
                    Khajiit_Item_2_qty = 1
                  }
                } else if (!Khajiit_Item_3 && rollPercentage(0.5)) {
                  Khajiit_Item_3 = `${item.namespace}:${item.localID}`
                  Khajiit_Item_3_Price = item.sellsFor * 4
                  Khajiit_Item_3_qty = Math.floor(Math.random() * 10)
                  if (Khajiit_Item_3_Price < 1000) { Khajiit_Item_3_qty = Math.floor(Math.random() * 10000) }
                  if (item.type === "Armour" || item.type === "Weapon" || item.type === "Magic_Armour" || item.type === "Trimmed Armour" || item.type === "Magic Armour") {
                    Khajiit_Item_3_qty = 1
                  }
                } else if (!Khajiit_Item_4 && rollPercentage(0.5)) {
                  Khajiit_Item_4 = `${item.namespace}:${item.localID}`
                  Khajiit_Item_4_Price = item.sellsFor * 4
                  Khajiit_Item_4_qty = Math.floor(Math.random() * 2)
                  if (Khajiit_Item_4_Price < 1000) { Khajiit_Item_4_qty = Math.floor(Math.random() * 10000) }
                  if (item.type === "Armour" || item.type === "Weapon" || item.type === "Magic_Armour" || item.type === "Trimmed Armour" || item.type === "Magic Armour") {
                    Khajiit_Item_4_qty = 1
                  }
                } else if (!Khajiit_Item_5 && rollPercentage(0.5)) {
                  Khajiit_Item_5 = `${item.namespace}:${item.localID}`
                  Khajiit_Item_5_Price = item.sellsFor * 4
                  // Khajiit_Item_5_qty = Math.floor(Math.random() * 2)
                  if (Khajiit_Item_5_Price < 1000) { Khajiit_Item_5_qty = Math.floor(Math.random() * 10000) }
                  if (item.type === "Armour" || item.type === "Weapon" || item.type === "Magic_Armour" || item.type === "Trimmed Armour" || item.type === "Magic Armour") {
                    Khajiit_Item_5_qty = 1
                  }
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
                // "gamemodeID": `${game.currentGamemode._namespace.name}:${game.currentGamemode._localID}`,
                // General_Goods_Shop
                // if (!knownNamespaces[item.namespace]) {
                //     itemPackage.shopPurchases.add({
                //         "cost": {
                //             "gp": {
                //                 "cost": 0,
                //                 "type": "Fixed"
                //             },
                //             "items": [
                //                 {
                //                     "id": "tes:Elder_Scrolls",
                //                     "quantity": 1
                //                 }
                //             ],
                //             "raidCoins": {
                //                 "cost": 0,
                //                 "type": "Fixed"
                //             },
                //             "slayerCoins": {
                //                 "cost": 0,
                //                 "type": "Fixed"
                //             }
                //         },
                //         "id": `${item.localID}_Shop`,
                //         "purchaseRequirements": [
                //             {
                //                 "dungeonID": "tes:Dragon_Break",
                //                 "count": 1,
                //                 "type": "DungeonCompletion"
                //             }
                //         ],
                //         "media": "assets/icons/Cache.png",
                //         "category": "tes:General_Goods_Shop",
                //         "contains": {
                //             "items": [
                //                 {
                //                     "id": `${item.namespace}:${item.localID}`,
                //                     "quantity": 1
                //                 }
                //             ]
                //         },
                //         "allowQuantityPurchase": false,
                //         "unlockRequirements": [],
                //         "defaultBuyLimit": 1,
                //         "buyLimitOverrides": [],
                //         "showBuyLimit": false
                //     })
                //     ShopList.push(`tes:${item.localID}_Shop`)
                // }
              }
            } catch (error) {
              console.log("onCharacterLoaded initialPackage", error)
            }
          })
          // itemPackage.shopDisplayOrder.add(
          //     {
          //         "insertAt": "Start",
          //         "ids": ShopList
          //     }
          // )
        });
        initialPackage.add();
        // @ts-ignore
        game.tes_weapons = listOfAllWeapons
        // end looping though all game items.

        // const magiclist = []
        // const meleelist = []
        // const rangedlist = []
        // const randomlist = []
        // game.monsters.forEach(monster => {
        //   if (monster._namespace.name === "runescapeEncountersInMelvor") {
        //     if (monster.attackType === "magic") {
        //       magiclist.push(monster._namespace.name + ':' + monster._localID)
        //     }
        //     if (monster.attackType === "melee") {
        //       meleelist.push(monster._namespace.name + ':' + monster._localID)
        //     }
        //     if (monster.attackType === "ranged") {
        //       rangedlist.push(monster._namespace.name + ':' + monster._localID)
        //     }
        //     if (monster.attackType === "random") {
        //       randomlist.push(monster._namespace.name + ':' + monster._localID)
        //     }
        //   }
        // })
        // console.log('Magic', magiclist)
        // console.log('melee', meleelist)
        // console.log('ranged', rangedlist)
        // console.log('random', randomlist)

        // looping though all game monsters
        game.monsters.forEach(monster => {
          try {
            if (monster && monster.localID && monster.namespace === "tes" && monster.localID === 'Bloody_Hand_Tribe_Goblin_Shaman') {
              const killCount = game.stats.monsterKillCount(monster)
              if (killCount > 0) {
                let elem: any = document.getElementById("tutorial-tes:Cracked_Wood_Cave")
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
                let elem: any = document.getElementById("tutorial-tes:Barren_Mine")
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
                let elem: any = document.getElementById("tutorial-tes:Timberscar_Hollow")
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
                let elem: any = document.getElementById("tutorial-tes:Derelict_Mine")
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
                let elem: any = document.getElementById("tutorial-tes:Wenderbek_Cave")
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
                let elem: any = document.getElementById("tutorial-tes:Plundered_Mine")
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
                let elem: any = document.getElementById("tutorial-tes:Goblin_Jims_Cave")
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
        // end looping though all game monsters
      } catch (error) {
        console.log('onCharacterLoaded', error)
      }
      // @ts-ignore
      console.log('Tes onCharacterLoaded time: ', (start - new Date()) / (1000) * -1, ' seconds');
    });

    ctx.onInterfaceReady((ctx) => {
      let start = new Date();
      // Local variables
      const mythLoaded = mod.manager.getLoadedModList().includes("[Myth] Music")
      const dboxLoaded = mod.manager.getLoadedModList().includes('dbox')
      // Looks like this function should just be UI components like dbox and templates.
      try {
        // khajiit_merchants
        if (dboxLoaded) {
          const dbox = mod.api.dbox;
          if (!dbox) {
            return;
          }
          const KahjiitSpcificItems = ["tes:Fishing_Hat", "tes:Fishing_Boots", "tes:Fishing_Clothes", "tes:Fishing_Rod", "tes:ElsweyrSpicedTea"]
          const TodaysItem = KahjiitSpcificItems[Math.floor(Math.random() * KahjiitSpcificItems.length)]
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
                { to: 'exit', losses: { gp: Khajiit_Item_1_Price && Khajiit_Item_1_qty ? Khajiit_Item_1_Price * Khajiit_Item_1_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_1 ? Khajiit_Item_1 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_1_qty ? Khajiit_Item_1_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_2_Price && Khajiit_Item_2_qty ? Khajiit_Item_2_Price * Khajiit_Item_2_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_2 ? Khajiit_Item_2 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_2_qty ? Khajiit_Item_2_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_3_Price && Khajiit_Item_3_qty ? Khajiit_Item_3_Price * Khajiit_Item_3_qty * 0.4 : 100 }, rewards: { items: [{ id: Khajiit_Item_3 ? Khajiit_Item_3 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_3_qty ? Khajiit_Item_3_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_4_Price && Khajiit_Item_4_qty ? Khajiit_Item_4_Price * Khajiit_Item_4_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_4 ? Khajiit_Item_4 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_4_qty ? Khajiit_Item_4_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_5_Price && Khajiit_Item_5_qty ? Khajiit_Item_5_Price * Khajiit_Item_5_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_5 ? Khajiit_Item_5 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_5_qty ? Khajiit_Item_5_qty : 1 }] } },

                { to: 'exit', losses: { gp: 100 }, rewards: { items: [{ id: TodaysItem }] } },

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

                { to: 'exit', losses: { gp: Khajiit_Item_1_Price && Khajiit_Item_1_qty ? Khajiit_Item_1_Price * Khajiit_Item_1_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_1 ? Khajiit_Item_1 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_1_qty ? Khajiit_Item_1_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_2_Price && Khajiit_Item_2_qty ? Khajiit_Item_2_Price * Khajiit_Item_2_qty * 0.33 : 100 }, rewards: { items: [{ id: Khajiit_Item_2 ? Khajiit_Item_2 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_2_qty ? Khajiit_Item_2_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_3_Price && Khajiit_Item_3_qty ? Khajiit_Item_3_Price * Khajiit_Item_3_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_3 ? Khajiit_Item_3 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_3_qty ? Khajiit_Item_3_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_4_Price && Khajiit_Item_4_qty ? Khajiit_Item_4_Price * Khajiit_Item_4_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_4 ? Khajiit_Item_4 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_4_qty ? Khajiit_Item_4_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_5_Price && Khajiit_Item_5_qty ? Khajiit_Item_5_Price * Khajiit_Item_5_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_5 ? Khajiit_Item_5 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_5_qty ? Khajiit_Item_5_qty : 1 }] } },

                { to: 'exit', losses: { gp: 100 }, rewards: { items: [{ id: TodaysItem }] } },
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
                { to: 'exit', losses: { gp: 500 }, rewards: { items: [{ id: 'tes:ElsweyrSpicedTea', qty: 10 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_1_Price && Khajiit_Item_1_qty ? Khajiit_Item_1_Price * Khajiit_Item_1_qty * 0.5 : 100 }, rewards: { items: [{ id: Khajiit_Item_1 ? Khajiit_Item_1 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_1_qty ? Khajiit_Item_1_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_2_Price && Khajiit_Item_2_qty ? Khajiit_Item_2_Price * Khajiit_Item_2_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_2 ? Khajiit_Item_2 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_2_qty ? Khajiit_Item_2_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_3_Price && Khajiit_Item_3_qty ? Khajiit_Item_3_Price * Khajiit_Item_3_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_3 ? Khajiit_Item_3 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_3_qty ? Khajiit_Item_3_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_4_Price && Khajiit_Item_4_qty ? Khajiit_Item_4_Price * Khajiit_Item_4_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_4 ? Khajiit_Item_4 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_4_qty ? Khajiit_Item_4_qty : 1 }] } },

                { to: 'exit', losses: { gp: Khajiit_Item_5_Price && Khajiit_Item_5_qty ? Khajiit_Item_5_Price * Khajiit_Item_5_qty : 100 }, rewards: { items: [{ id: Khajiit_Item_5 ? Khajiit_Item_5 : 'tes:ElsweyrSpicedTea', qty: Khajiit_Item_5_qty ? Khajiit_Item_5_qty : 1 }] } },

                { to: 'exit', losses: { gp: 100 }, rewards: { items: [{ id: TodaysItem }] } },

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

          const tes_melvorAreas = ["woodcutting", "fishing", "firemaking", "cooking", "mining", "smithing", "thieving", "farming", "fletching", "crafting", "runecrafting", "herblore", "agility", "summoning", "astrology", "township", "magic", "combat"]
          if (mythLoaded) {
            tes_melvorAreas.push("music")
          }
          const tes_merchant_area = tes_melvorAreas[Math.floor(Math.random() * tes_melvorAreas.length)] + '-container';
          console.log('Merchant is at: ', tes_merchant_area)

          if (rollPercentage(0.3)) {
            document.getElementById(tes_merchant_area).firstElementChild.after(khajiit_merchant_ahkari_box.root);
          } else if (rollPercentage(0.5)) {
            document.getElementById(tes_merchant_area).firstElementChild.after(khajiit_merchant_risaad_box.root);
          } else {
            document.getElementById(tes_merchant_area).firstElementChild.after(khajiit_merchant_atahbah_box.root);
          }
        }
        // end khajiit_merchants

        // Create HTML pages for items
        ui.createStatic('#modal-book--The_Black_Horse_Courier_Waterfront', document.body);
        document.body.querySelector('.modal.The_Black_Horse_Courier_Waterfront').id = 'The_Black_Horse_Courier_Waterfront';
        ui.createStatic('#modal-book--recommendation_letter', document.body);
        document.body.querySelector('.modal.recommendation_letter').id = 'recommendation_letter';
        // end HTML for items

        // Bards college
        function Bards_College_Overview() {
          return {
            $template: '#tes_Bards_College__global-droptable-overview-container-template',
            items: bards_college_items
          }
        }
        const tes_contentContainerElement = document.getElementById('main-container');
        ui.create(Bards_College_Overview(), tes_contentContainerElement);

        if (dboxLoaded && mythLoaded) {
          const dbox = mod.api.dbox;
          if (!dbox) {
            return;
          }
          const Viarmo_box = mod.api.dbox.create('Viarmo_box', {
            title: 'Viarmo',
            startingDialogId: '0',
            characters: [{
              id: 'Viarmo',
              name: 'Risaad',
              alignment: 'friendly',
              media: 'assets/dialog/Viarmo.png'
            }],
            dialogs: [{
              id: '0',
              character: 'Viarmo',
              text: ['Welcome to the Bard\'s College. I am the headmaster here. How may I help you?'],
              options: [
                { to: 'shop', text: 'I\'m looking for a new instrument.', isSpeech: true },
                { to: '1', text: 'I\'m looking to apply to the college.', isSpeech: true },
                { to: '2', text: 'What do you know about dragons?', isSpeech: true },
                { to: '3', text: 'So what is the Poetic Edda?', isSpeech: true },
                { to: '4', text: 'Why did Elisif forbid the festival?', isSpeech: true },
                { to: '7', text: 'I found King Olaf\'s Verse.', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '1',
              character: 'Viarmo',
              text: 'Always a pleasure to meet a prospective bard. You should be aware that many apply but we accept very few people. When possible, we ask applicants to perform tasks the college needs completed. In this case, I do have a task befitting an inspiring bard...',
              options: [
                { to: '5', text: 'What do you need me to do?', isSpeech: true },
                { to: '0', text: 'Maybe not today then...', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '2',
              character: 'Viarmo',
              text: 'Not much, to be honest. Their return was a shock to us all. Giraud Gemane has some tomes about them in the library, if you\'re interested.',
              options: [
                { to: '0', text: 'What were we talking about again?', isSpeech: true },
                { to: 'shop', text: 'I\'m looking for a new instrument.', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '3',
              character: 'Viarmo',
              text: 'Not much. But as a bard, I find the whole affair depressing. There are no heroes in this war. No winners to be had and no real conclusion. If you want something a bard can dig into look to the dragons. A thousand years from now Skyrim will have changed rulers dozens of times but the return of the dragons, that story is once in an era. So what is the Poetic Edda?',
              options: [
                { to: '0', text: 'What were we talking about again?', isSpeech: true },
                { to: 'shop', text: 'I\'m looking for a new instrument.', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '4',
              character: 'Viarmo',
              text: 'As you may be aware Elisif\'s husband High King Torygg was recently killed. Elisif mourns her husband deeply and she feels that a festival that burns a King in effigy is... distasteful. I\'ve tried to convince her the festival is many centuries old and celebrates Solitude but I need proof. I believe King Olaf\'s verse will provide that proof.',
              options: [
                { to: '0', text: 'What were we talking about again?', isSpeech: true },
                { to: 'shop', text: 'I\'m looking for a new instrument.', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '5',
              character: 'Viarmo',
              text: 'Elisif has forbidden the Burning of King Olaf, a Festival put on by the Bards College. We need to change her mind. To convince her I want to read King Olaf\'s Verse. A part of the Poetic Edda, the living history of Skyrim. Unfortunately, the verse was lost long ago.',
              options: [
                { to: '6', text: 'And that\'s where I come in?', isSpeech: true },
                { to: '0', text: 'Maybe not today then...', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '6',
              character: 'Viarmo',
              text: 'Yes. According to Giraud, our histories keeper, the portion of Edda dealing with King Olaf might still exist in Dead Man\'s respite. I need you to retrieve the poem.',
              options: [
                { to: '0', text: 'Maybe not today then...', isSpeech: true },
                { text: 'Okay! I am going right now!', isSpeech: true }
              ]
            },
            {
              id: 'shop',
              character: 'Viarmo',
              text: ['You\'ve come to the right place.'],
              options: [
                { losses: { items: [{ id: "mythMusic:Polished_Topaz_Gem", qty: 10 }, { id: "mythMusic:Polished_Ruby_Gem", qty: 10 }, { id: "mythMusic:Polished_Sapphire_Gem", qty: 10 }, { id: "mythMusic:Pristine_Leather", qty: 1 }] }, rewards: { items: [{ id: 'tes:rjorns_drum' }] } },

                { losses: { items: [{ id: "mythMusic:Polished_Topaz_Gem", qty: 10 }, { id: "mythMusic:Polished_Ruby_Gem", qty: 10 }, { id: "mythMusic:Polished_Sapphire_Gem", qty: 10 }, { id: "mythMusic:Mystic_Oil", qty: 1 }] }, rewards: { items: [{ id: 'tes:Dancers_Flute' }] } },

                { losses: { items: [{ id: "mythMusic:Polished_Topaz_Gem", qty: 10 }, { id: "mythMusic:Polished_Ruby_Gem", qty: 10 }, { id: "mythMusic:Polished_Sapphire_Gem", qty: 10 }, { id: "mythMusic:Diamond_String", qty: 1 }] }, rewards: { items: [{ id: 'tes:finns_lute' }] } },
                { to: '0', text: 'What were we talking about again?', isSpeech: true },
                { text: 'Good bye', isSpeech: true },
              ]
            },
            {
              id: '7',
              character: 'Viarmo',
              text: ['I have to admit I didn\'t think it would actually be there. Now let\'s take a look at this... Oh. Oh-no. This won\'t do at all. The copy is incomplete, it\'s aged to the point that parts are unreadable. And the parts that are readable... well... bardic verse has come a long way since ancient times.'],
              options: [
                { to: '8', losses: { items: [{ id: "tes:King_Olafs_Verse" }] }, rewards: { gp: 1000000 } },
                { to: '8', losses: { items: [{ id: "tes:King_Olafs_Verse" }], skillCheck: [{ id: 'mythMusic:Music', level: 20 }] }, rewards: { items: [{ id: 'mythMusic:Bards_Hat', qty: 1 }] } },
                { to: '8', losses: { items: [{ id: "tes:King_Olafs_Verse" }], skillCheck: [{ id: 'mythMusic:Music', level: 20 }] }, rewards: { items: [{ id: 'mythMusic:Bards_Body', qty: 1 }] } },
                { to: '8', losses: { items: [{ id: "tes:King_Olafs_Verse" }], skillCheck: [{ id: 'mythMusic:Music', level: 20 }] }, rewards: { items: [{ id: 'mythMusic:Bards_Boots', qty: 1 }] } },
                { to: '8', losses: { items: [{ id: "tes:King_Olafs_Verse" }], skillCheck: [{ id: 'mythMusic:Music', level: 20 }] }, rewards: { items: [{ id: 'mythMusic:Bards_Leggings', qty: 1 }] } },
                { to: '8', losses: { items: [{ id: "tes:King_Olafs_Verse" }], skillCheck: [{ id: 'mythMusic:Music', level: 50 }] }, rewards: { items: [{ id: 'mythMusic:Concert_Pass_Half_A', qty: 5 }, { id: 'mythMusic:Concert_Pass_Half_B', qty: 5 }] } },
                { to: '0', text: 'What were we talking about again?', isSpeech: true }
              ]
            },
            {
              id: '8',
              character: 'Viarmo',
              text: 'I can\'t read it to the court. Without the verse I won\'t be able to convince Elisif of the importance of The Burning of King Olaf Festival. If she isn\'t convinced of the festival\'s importance then she won\'t reverse her decision to stop the effigy burning. It means that the Burning of King Olaf, which the Bards College has held for time immemorial, won\'t be happening.',
              options: [
                { to: '0', text: 'What were we talking about again?', isSpeech: true },
                { text: 'Good Luck!', isSpeech: true }
              ]
            },
              // https://elderscrolls.fandom.com/wiki/Viarmo
              // Maybe make a "bards rank as the first reward"
            ]
          }, ctx);
          document.getElementById('tes_Bards_College__global-droptable-overview-container').firstElementChild.after(Viarmo_box.root);

          ui.createStatic('#modal-book--King_Olafs_Verse', document.body);
          document.body.querySelector('.modal.King_Olafs_Verse').id = 'King_Olafs_Verse';
        }
        // End bards college
      } catch (error) {
        console.log('onInterfaceReady', error)
      }
      // @ts-ignore
      console.log('Tes onInterfaceReady time: ', (start - new Date()) / (1000) * -1, ' seconds');
    });
  } catch (error) {
    console.log("Error, monad", error)
  }
}

// increasedSelfDamageBasedOnCurrentHitpoints

// function calcItemLevel(item) {
//   const game = {}
//   // item = game.items.getObjectByID('melvorD:Dragon_Dagger')
//   // const target = game.monsters.getObjectByID('melvorD:Plant')
//   const player = game.combat ? game.combat.player : {}
//   // const effectiveSkillLevel = item.attackType === 'melee' ? player.levels.Attack : item.attackType === 'ranged' ? player.levels.Ranged : player.levels.Magic
//   const effectiveSkillLevel = 120
//   const accuracy = player.stats ? player.stats.accuracy : 43000
//   const targetEvasion = item.attackType === 'melee' ? 220 : item.attackType === 'ranged' ? 640 : 640
//   const chanceToHit = (1 - (targetEvasion / (2*accuracy)))*100
//   const strengthBonus = item.attackType === 'melee' ? item.equipmentStats.find(stat => stat.key === 'meleeStrengthBonus')?.value : item.attackType === 'ranged' ? item.equipmentStats.find(stat => stat.key === 'rangedStrengthBonus')?.value : item.attackType === 'magic' ? item.equipmentStats.find(stat => stat.key === 'magicDamageBonus')?.value : 0
//   const baseMaxHit = 10 * (2.2 + (effectiveSkillLevel/10) + ((effectiveSkillLevel+17)/640) * strengthBonus)
//   const percentMaxHitModifer = player.modifiers ? player.modifiers.increasedMaxHitPercent : 0
//   const flatDam = player.modifiers ? player.modifiers.increasedMaxHitFlat : 0
//   const minToMaxPerc = player.modifiers ? player.modifiers.increasedMinHitBasedOnMaxHit : 0
//   const maxHit = baseMaxHit * (1 + (percentMaxHitModifer/100)) + flatDam
//   const minHit = Math.min(Math.max(1 + maxHit *minToMaxPerc + flatDam, 1), maxHit)
//   const avgHit = ((maxHit+minHit)/2)* (1 - 0)
//   const interval = item.equipmentStats.find(stat => stat.key === 'attackSpeed')?.value
//   const dps = (avgHit/interval) * chanceToHit
//   return dps
// }

// for (let index = 0; index < items.length; index++) {
//   if(items[index].type === "Weapon"){
//       console.log(calcItemLevel(items[index]))
//   }
// }

// 'Staff of Worms 4.84440746124031'
// 'Mace of the Crusader 12.237170012718023'
// 'Sword of the Crusader 11.867999636627907'
// 'Blades Sword 6.307715827882752'
// 'Alikri Fishing Rod 2.3368885255167955'
// 'Dwarven Fishing Rod 2.3368885255167955'
// 'Fishing Rod 2.3368885255167955'
// 'Argonian Fishing Rod 2.3368885255167955'
// 'Bard\'s Lute 2.7090719880490957'
// 'Bard\'s Flute 2.1188789970930233'
// 'Bard\'s Drum 3.374808169815891'
// 'Sinestral Elven Blade 9.735042298782703'
// 'Chrysamere 9.735042298782703'
// 'Sinweaver 6.639725126594149'
// 'Rugdumph\'s Sword 3.861190952034884'
// 'Spear of Bitter Mercy 8.782683381782945'
// 'Ice Blade of the Monarch 6.490991440568476'
// 'Skull Crusher 11.18826972591362'
// 'Giant Club 11.41706299363756'
// 'Goblin Totem Staff 3.0738284883720928'
// 'Calipers NaN'
// 'Shadowhunt 5.552639050387597'
// 'Sufferthorn 4.309260537790697'
// 'Dagger of Discipline 3.505332788275193'
// 'Blade Of Woe 5.182730576109937'
// 'Nightingale Orb 5.612864583333333'
// 'Nightingale Blade 7.4197725896317825'
// 'Nightingale Bow 7.088105813953488'
// 'Wabbajack 5.673090116279069'
// 'Skull of Corruption 5.673090116279069'
// 'Sanguine Rose 5.673090116279069'
// 'Mace of Molag Bal 11.005864164904862'
// 'Ebony Blade 9.97130159883721'
// 'Mehrunes\' Razor 6.234790879360465'
// 'Daedric Crescent 9.975665406976745'
// 'Volendrung 22.652131342494716'
// 'Dawnbreaker 9.064819635306554'
// 'Goldbrand 9.064819635306554'
// 'Umbra Sword 9.064819635306554'