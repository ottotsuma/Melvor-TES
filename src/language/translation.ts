export function TesTranslation (ctx: Modding.ModContext) {

        ctx.patch(Item, 'name').get(function (patch) {
            if (this.namespace === 'tes') {
                return getLangString(`ITEM_NAME_${this.localID}`).includes('UNDEFINED TRANSLATION') ? this.name: getLangString(`ITEM_NAME_${this.localID}`);
            }
                                                
            return patch();
        });

        // ctx.patch(Item, 'description').get(function (patch) {
        //     if (this.namespace === 'tes' && this._customDescription !== undefined) {
        //         return getLangString(`ITEM_DESCRIPTION_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(ShopPurchase, 'name').get(function (patch) {
        //     if (this.namespace === 'tes' && this._customName !== undefined) {
        //         return getLangString(`SHOP_NAME_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(ShopPurchase, 'description').get(function (patch) {
        //     if (this.namespace === 'tes' && this._customDescription !== undefined) {
        //         return getLangString(`SHOP_DESCRIPTION_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(Monster, 'name').get(function (patch) {
        //     if (this.namespace === 'tes') {
        //         return getLangString(`MONSTER_NAME_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(CombatArea, 'name').get(function (patch) {
        //     if (this.namespace === 'tes') {
        //         return getLangString(`COMBAT_AREA_NAME_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(SpecialAttack, 'name').get(function (patch) {
        //     if (this.namespace === 'tes') {
        //         return getLangString(`SPECIAL_ATTACK_NAME_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(SpecialAttack, 'description').get(function (patch) {
        //     if (this.namespace === 'tes') {
        //         return templateString(
        //             getLangString(`SPECIAL_ATTACK_DESCRIPTION_${this.localID}`),
        //             this.descriptionTemplateData
        //         );
        //     }

        //     return patch();
        // });

        // ctx.patch(HerbloreRecipe, 'name').get(function (patch) {
        //     if (this.namespace === 'tes') {
        //         return getLangString(`POTION_NAME_${this.localID}`);
        //     }

        //     return patch();
        // });

        // ctx.patch(Pet, 'name').get(function (patch) {
        //     if (this.namespace === 'tes') {
        //         return getLangString(`PET_NAME_${this.localID}`);
        //     }

        //     return patch();
        // });
}
