declare class PlayerStats extends CharacterStats {
    summoningMaxHit: number;
    barrierDamage: number;
    constructor();
    getValueTable(): {
        name: string;
        value: number;
    }[];
}
declare type PlayerCombatEvents = {
    summonAttack: PlayerSummonAttackEvent;
    runesUsed: RuneConsumptionEvent;
    itemEquipped: ItemEquippedEvent;
    foodEquipped: FoodEquippedEvent;
    foodEaten: FoodEatenEvent;
    prayerPointsUsed: PrayerPointConsumptionEvent;
    summonTabletUsed: SummonTabletUsedEvent;
} & CharacterCombatEvents;
declare class Player extends Character implements IGameEventEmitter<PlayerCombatEvents> {
    manager: BaseManager;
    _events: import("mitt").Emitter<PlayerCombatEvents>;
    on: {
        <Key extends "runesUsed" | "summonAttack" | "itemEquipped" | "foodEquipped" | "foodEaten" | "prayerPointsUsed" | "summonTabletUsed" | keyof CharacterCombatEvents>(type: Key, handler: import("mitt").Handler<PlayerCombatEvents[Key]>): void;
        (type: "*", handler: import("mitt").WildcardHandler<PlayerCombatEvents>): void;
    };
    off: {
        <Key extends "runesUsed" | "summonAttack" | "itemEquipped" | "foodEquipped" | "foodEaten" | "prayerPointsUsed" | "summonTabletUsed" | keyof CharacterCombatEvents>(type: Key, handler?: import("mitt").Handler<PlayerCombatEvents[Key]> | undefined): void;
        (type: "*", handler: import("mitt").WildcardHandler<PlayerCombatEvents>): void;
    };
    get type(): string;
    equipmentSets: EquipmentSet[];
    selectedEquipmentSet: number;
    get activePrayers(): Set<ActivePrayer>;
    food: EquippedFood;
    timers: PlayerTimers;
    attackStyles: AttackStyleSelection;
    equipToSet: number;
    modifiers: PlayerModifiers;
    noun: Noun;
    runesProvided: Map<AnyItem, number>;
    prayerPoints: number;
    target: Character;
    stats: PlayerStats;
    eatTimeout: number;
    allowToEatFromTimeout: boolean;
    quickEquipMenu: CombatQuickEquipMenu;
    rendersRequired: PlayerRenderQueue;
    get activeTriangle(): TriangleData;
    get statElements(): PlayerHTMLElements;
    get splashManager(): SplashManager;
    get effectRenderer(): EffectRenderer;
    get attackBar(): ProgressBar;
    get attackBarMinibar(): ProgressBar;
    get summonBar(): ProgressBar;
    get summonBarMinibar(): ProgressBar;
    activeSummonSlots: ('Summon1' | 'Summon2')[];
    statProviders: Set<StatProvider>;
    activeItemSynergies: Set<ItemSynergy>;
    /** Currently active summoning synergy. Undefined if none active. */
    activeSummoningSynergy?: SummoningSynergy;
    get summonAttackInterval(): number;
    itemEffects: Set<ItemEffect>;
    get equipment(): Equipment;
    /** Gets the equipment for the "Equip to Set" */
    get equipToSetEquipment(): Equipment;
    get spellSelection(): SpellSelection;
    get attackStyle(): AttackStyle | undefined;
    /** Player automatically eats below this HP */
    get autoEatThreshold(): number;
    /** Player automatically eats to this HP */
    get autoEatHPLimit(): number;
    /** Player automatically eats food at this efficiency */
    get autoEatEfficiency(): number;
    get minHitFromMaxHitPercent(): number;
    /** Returns a description of the current synergy */
    get synergyDescription(): string;
    get numEquipSets(): number;
    /** Modified max cost of all active prayers */
    get maxPrayerCost(): number;
    _pets: number;
    get pets(): number;
    set pets(value: number);
    get bigOlRonModifiers(): PlayerModifierObject;
    /** If the player should use combination runes for spellcasting */
    get useCombinationRunes(): boolean;
    get allowRegen(): boolean;
    get addItemsToBankOnLoadFail(): boolean;
    constructor(manager: BaseManager, game: Game);
    setDefaultAttackStyles(): void;
    setCallbacks(): void;
    registerStatProvider(provider: StatProvider): void;
    setRenderAll(): void;
    activeTick(): void;
    baseSpawnInterval: number;
    getErrorLog(): string;
    queueNextAction(noSpec?: boolean, tickOffset?: boolean): void;
    getMonsterSpawnTime(): number;
    isEquipmentSlotUnlocked(slot: SlotTypes): boolean;
    /** Returns true if the given item is equipped in any equipment set */
    checkEquipmentSetsForItem(item: EquipmentItem): boolean;
    /** Checks and unequips items that the player does not meet the requirements for */
    checkEquipmentRequirements(): void;
    modifyDamageReduction(reduction: number): number;
    computeAllStats(): void;
    computeCombatStats(): void;
    computeItemEffectList(): void;
    /** Applies all item effects to the player */
    applyItemEffects(): void;
    /** Checks all item effects, removing or adding them as needed */
    checkItemEffects(): void;
    /** Resets the primary spell selection to Wind Strike */
    resetPrimarySpell(): void;
    /** Checks the usage of combat spells and disables them if they are not usable */
    checkMagicUsage(): void;
    computeLevels(): void;
    getAccuracyValues(): BaseStatValues;
    computeAttackSelection(): void;
    getSlotAttacks(slot: EquipSlot): SpecialAttack[];
    computeRuneProvision(): void;
    rollToHit(target: Character, attack: SpecialAttack): boolean;
    damage(amount: number, source: SplashType, thieving?: boolean): void;
    addPrayerPointsBasedOnDamage(amount: number): void;
    addHitpoints(amount: number): void;
    setHitpoints(value: number): void;
    updateHPConditionals(computeStats?: boolean): void;
    autoEat(foodSwapped?: boolean): void;
    getRuneCosts(spell: BaseSpell): AnyItemQuantity[];
    castCurseSpell(target: Character, curse: CurseSpell): void;
    onMagicAttackFailure(): void;
    onRangedAttackFailure(quiver: EquipmentItem): void;
    rewardForDamage(damage: number): void;
    attack(target: Character, attack: SpecialAttack): number;
    lifesteal(attack: SpecialAttack, damage: number, flatBonus: number): number;
    rewardForSummonDamage(damage: number, isBarrierDmg: boolean): void;
    /** Applies combat triangle, modifiers and damage reduction to summoning attack damage */
    modifySummonAttackDamage(damage: number, forceCalc?: boolean): number;
    /** Returns Summon Max Hit without Barrier modifications. Used for UI rendering */
    getSummonMaxHitWithoutBarrier(damage: number): number;
    /** Applies multiplicative and flat damage modifiers to summoning attack damage */
    applySummonDamageModifiers(damage: number, forceCalc?: boolean): number;
    /** Clamps summoning attack damage to remaining barrier or hitpoints */
    clampSummonAttackDamage(damage: number, target: Character): number;
    summonAttack(): void;
    startSummonAttack(tickOffset?: boolean): void;
    postAttack(): void;
    onHit(): void;
    onBeingHit(): void;
    applyOnBeingHitEffects(): void;
    onMiss(): void;
    trackWeaponStat(stat: ItemStats, amount?: number): void;
    trackArmourStat(stat: ItemStats, amount?: number): void;
    addItemStat(item: AnyItem, stat: ItemStats, amount: number): void;
    consumeRunes(costs: AnyItemQuantity[]): void;
    /** Event Handler for item charge use */
    consumeItemCharges(e: GameEvent, item: EquipmentItem): void;
    /** Event Handler for item quantity use */
    consumeItemQuantities(e: GameEvent, slot: EquipSlot): void;
    /** Event Handler for bank item use */
    consumeBankItem(e: GameEvent, consumption: BankItemConsumption): void;
    /** Event Handler for Summoning Synergy tablet usage */
    consumeSynergyTablets(e: GameEvent): void;
    removeFromQuiver(qty?: number): void;
    consumeAmmo(): void;
    trackItemUsage(costs: AnyItemQuantity[]): void;
    applyDOT(effect: DOTEffect, target: Character, damageDealt: number): boolean;
    getFlatReflectDamage(): number;
    applyDamageModifiers(target: Character, damage: number): number;
    applyTriangleToDamage(target: Character, damage: number): number;
    getDamageModifiers(target: Character): number;
    quickEquipItem(item: EquipmentItem, skill: AnySkill): void;
    equipCallback(item: EquipmentItem, slot: SlotTypes, quantity?: number): void;
    /** Attempts to quick equip the summons in a summoning synergy */
    quickEquipSynergy(synergy: SummoningSynergy): void;
    /** Callback function for changing equipment set */
    changeEquipmentSet(setID: number): void;
    changeEquipToSet(setID: number): void;
    /** Adds equipment sets based on the modifier value */
    updateEquipmentSets(): void;
    onUnequipFromQuantityUse(): void;
    /** Perform stat recalculation and ui update, interrupt current player action */
    updateForEquipmentChange(): void;
    /** Updates and renders the equipment sets */
    updateForEquipSetChange(): void;
    /** Function for equipping an item */
    equipItem(item: EquipmentItem, set: number, slot?: SlotTypes | 'Default', quantity?: number): boolean;
    /** Returns a callback function for unequipping an item from a slot*/
    unequipCallback(slot: SlotTypes): () => void;
    /** Function for unequipping an item from a slot */
    unequipItem(set: number, slot: SlotTypes): boolean;
    /** The array of event unassigners for events that consume resources based on current equipment */
    equipmentEventUnassigners: VoidFunction[];
    assignEquipmentEventHandlers(): void;
    summoningSynergyEventUnassigners: VoidFunction[];
    assignSynergyEventHandlers(): void;
    /** Automatically equips the selected food, without taking it from the bank
     *  Will update the completion log and item statistics
     */
    autoEquipFood(item: FoodItem, quantity: number): boolean;
    /** Callback function for equipping the selected food from bank */
    equipFood(item: FoodItem, quantity: number): boolean | undefined;
    /** Unequips the player's currently selected food */
    unequipFood(): void;
    /** Changes the player's currently selected food */
    selectFood(slotID: number): void;
    /** Eats food */
    eatFood(quantity?: number, interrupt?: boolean, efficiency?: number): void;
    getFoodHealing(item: FoodItem): number;
    getFoodHealingBonus(item: FoodItem): number;
    startHoldToEat(): void;
    stopHoldToEat(): void;
    interruptAttack(): void;
    /** Callback Function for clicking on a prayer */
    togglePrayer(prayer: ActivePrayer, render?: boolean): void;
    /** Checks if the player meets the requirements to use the currently selected prayers */
    checkPrayerUsage(): void;
    toggleSpell(spell: StandardSpell, render?: boolean): void;
    toggleCurse(spell: CurseSpell, render?: boolean): void;
    toggleAurora(spell: AuroraSpell, render?: boolean): void;
    toggleAncient(spell: AncientSpell, render?: boolean): void;
    toggleArchaic(spell: ArchaicSpell, render?: boolean): void;
    consumePrayerPoints(amount: number, isUnholy: boolean): void;
    disableActivePrayers(): void;
    addPrayerPoints(amount: number): void;
    trackPrayerStats(stat: PrayerStats, amount: number): void;
    applyCostModifiersToPrayerCost(amount: number): number;
    applyPreservationToPrayerCost(amount: number, isUnholy: boolean): number;
    applyModifiersToPrayerCost(amount: number, isUnholy: boolean): number;
    computePrayerMaxCost(prayer: ActivePrayer): number;
    renderPrayerPoints(): void;
    renderPrayerSelection(): void;
    /** Determines in the player can (un)equip an item currently */
    checkIfCantEquip(): boolean;
    computeEquipmentStats(): void;
    checkActiveSummon(slot: 'Summon1' | 'Summon2'): void;
    /** Calculates the Max HP stat */
    computeMaxHP(): void;
    computeMeleeMaxHit(): number;
    computeRangedMaxHit(): number;
    computeMagicMaxHit(): number;
    computeSummonMaxHit(): void;
    computeAttackType(): void;
    setAttackStyle(attackType: AttackType, style: AttackStyle): void;
    computeModifiers(): void;
    addInheretedModifiers(): void;
    addAoDSkillcapeInheretedModifiers(): void;
    inheritModifiersFromItem(itemID: string): void;
    addAncientRelicModifiers(): void;
    addProviderModifiers(): void;
    addAttackStyleModifiers(): void;
    addEquippedItemModifiers(): void;
    computeTargetModifiers(): void;
    computeItemSynergies(): void;
    computeSummoningSynergy(): void;
    conditionalListeners: Record<ConditionHooks | 'All', Set<ConditionalModifier>>;
    checkStatCompareCondition(condition: EquipStatCompareCondition): boolean;
    checkCondition(condition: AnyCondition): boolean;
    /** Updates all registered conditional modifiers with the given hook */
    updateConditionals(hook: ConditionHooks | 'All', computeStats: boolean, computeTargetStats: boolean): void;
    registerConditionalListeners(conditionals: ConditionalModifier[]): void;
    computeConditionalListeners(): void;
    /** Adds all conditional modifiers except for HP hooked ones */
    addConditionalModifiers(): void;
    /** Adds all enemy conditional modifiers except for HP hooked ones */
    addConditionalTargetModifiers(): void;
    addPrayerModifiers(): void;
    addMiscModifiers(): void;
    addGamemodeModifiers(): void;
    addSummonSynergyModifiers(): void;
    get equippedSummoningSynergy(): SummoningSynergy | undefined;
    /** Removes a quantity from the summoning familiar equipped in the slot, and rewards XP for it */
    removeSummonCharge(slot: 'Summon1' | 'Summon2', interval: number): void;
    addCombatAreaEffectModifiers(): void;
    calculateAreaEffectValue(value: number): number;
    addMiscSummoningModifiers(): void;
    onDOTApplication(type: DOTType): void;
    onDOTRemoval(type: DOTType, statUpdate?: boolean): void;
    onTargetDOTRemoval(type: DOTType, statUpdate?: boolean): void;
    onModifierEffectApplication(): void;
    onModifierEffectRemoval(): void;
    onTargetModifierEffectRemoval(): void;
    onTargetModifierEffectApplication(): void;
    onTargetUnholyMarkChange(oldStacks: number, newStacks: number): void;
    onApplyingStun(target: Character): void;
    onBeingStunned(): void;
    onStunRemoval(): void;
    onTargetStunRemoval(): void;
    onApplyingSleep(target: Character): void;
    onBeingSlept(): void;
    onSleepRemoval(): void;
    onTargetSleepRemoval(): void;
    getMeleeDefenceBonus(): number;
    getRangedDefenceBonus(): number;
    getMagicDefenceBonus(): number;
    processDeath(): void;
    getMaxHitModifier(): number;
    /** Removes an item from the player's equipment on death */
    applyDeathPenalty(): void;
    regen(): void;
    /** Renders the attack style selection menu */
    renderAttackStyle(): void;
    setAttackStyleButtonCallbacks(): void;
    renderHitpoints(): void;
    renderSummonMaxHit(): void;
    renderDamageValues(): void;
    renderFood(): void;
    render(): void;
    renderAutoEat(): void;
    renderCombatTriangle(): void;
    getExperienceGainSkills(): AnySkill[];
    /** Renders changes in the UI due to mutations in player modifiers */
    renderActiveSkillModifiers(): void;
    renderEquipmentSets(): void;
    renderAttackIcon(): void;
    renderSummonBar(): void;
    /** Rewards slayer coins for current target */
    rewardSlayerCoins(): void;
    /** Rewards XP and rolls for pets */
    rewardXPAndPetsForDamage(damage: number): void;
    rollForSummoningMarks(skill: AnySkill, interval: number): void;
    rewardCurrencyForSummonDamage(damage: number, isBarrierDmg: boolean): void;
    rewardXPForSummonBarrierDamage(damage: number): void;
    rewardCurrencyForDamage(damage: number): void;
    rewardForKill(): void;
    rewardGPForKill(): void;
    rewardPrayerPointsForKill(): void;
    /** For specific player only spawn effects */
    applyUniqueSpawnEffects(): void;
    initializeForCombat(): void;
    stopFighting(): void;
    renderCombatLevel(): void;
    resetActionState(): void;
    encode(writer: SaveWriter): SaveWriter;
    decode(reader: SaveWriter, version: number): void;
    deserialize(reader: DataReader, version: number, idMap: NumericIDMap): void;
    /** Sets properties based on the old save file variables */
    convertFromOldSaveFormat(saveGame: NewSaveGame, idMap: NumericIDMap): void;
}
interface PlayerHTMLElements extends RenderHTMLElements {
    navHitpoints: HTMLElement[];
    prayerPoints: HTMLElement[];
    navPrayerPoints: HTMLElement[];
    gp: HTMLElement[];
    combatLevel: HTMLElement[];
    specialIcon: HTMLImageElement;
    specialTooltip: TippyTooltip;
    autoEatIcons: HTMLElement[];
    autoEatSpans: HTMLElement[];
    autoEatTooltips: TippyTooltip[];
    triangleDamageIcons: HTMLElement[];
    triangleReductionIcon: HTMLElement;
    triangleDamageTooltips: TippyTooltip[];
    triangleReductionTooltip: TippyTooltip;
    golbinLevels: MapToElement<CombatLevels>;
}
declare type AttackStyleSelection = {
    melee?: AttackStyle;
    ranged?: AttackStyle;
    magic?: AttackStyle;
};
declare class PlayerRenderQueue extends CharacterRenderQueue {
    prayerPoints: boolean;
    prayerSelection: boolean;
    spellSelection: boolean;
    curseSelection: boolean;
    auroraSelection: boolean;
    ancientSelection: boolean;
    archaicSelection: boolean;
    attackStyle: boolean;
    equipment: boolean;
    food: boolean;
    combatLevel: boolean;
    summonBar: boolean;
    summonBarMinibar: boolean;
    attacks: boolean;
    equipmentSets: boolean;
    runesUsed: boolean;
    autoEat: boolean;
    combatTriangle: boolean;
    levels: boolean;
    activeSkillModifierChange: boolean;
}
interface PlayerTimers extends CharacterTimers {
    summon: Timer;
}
