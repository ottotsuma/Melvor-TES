export function TesTranslation (ctx: Modding.ModContext) {

        ctx.patch(Item, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`ITEM_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return getLangString(`ITEM_NAME_${this.localID}`);
            }
                                                
            return orignal();
        });

        ctx.patch(Item, 'description').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`ITEM_DESCRIPTION_${this.localID}`).includes('UNDEFINED TRANSLATION') && this._customDescription !== undefined) {
                return getLangString(`ITEM_DESCRIPTION_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(ShopPurchase, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`SHOP_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION') && this._customName !== undefined) {
                return getLangString(`SHOP_NAME_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(ShopPurchase, 'description').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`SHOP_DESCRIPTION_${this.localID}`).includes('UNDEFINED TRANSLATION') && this._customDescription !== undefined) {
                return getLangString(`SHOP_DESCRIPTION_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(Monster, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`MONSTER_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return getLangString(`MONSTER_NAME_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(CombatArea, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`COMBAT_AREA_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return getLangString(`COMBAT_AREA_NAME_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(SpecialAttack, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`SPECIAL_ATTACK_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return getLangString(`SPECIAL_ATTACK_NAME_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(SpecialAttack, 'description').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`SPECIAL_ATTACK_DESCRIPTION_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return templateString(
                    getLangString(`SPECIAL_ATTACK_DESCRIPTION_${this.localID}`),
                    this.descriptionTemplateData
                );
            }

            return orignal();
        });

        ctx.patch(HerbloreRecipe, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`POTION_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return getLangString(`POTION_NAME_${this.localID}`);
            }

            return orignal();
        });

        ctx.patch(Pet, 'name').get(function (orignal) {
            if (this.namespace === 'tes' && !getLangString(`PET_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION')) {
                return getLangString(`PET_NAME_${this.localID}`);
            }

            return orignal();
        });
}
