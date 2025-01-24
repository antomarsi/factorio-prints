import { concat, countBy, Dictionary, every, flatMap, flatten, forOwn, fromPairs, has, isUndefined, map, reject, reverse, some, sortBy, toPairs, uniq } from "lodash";
import { decodeV15Base64 } from "./utils";
import entitiesWithIcons from "@/assets/entitiesWithIcons.json"

export enum BlueprintType {
    BOOK = "blueprint_book",
    BLUEPRINT = "blueprint",
    UPGRADE_PLANNER = "upgrade_planner",
    DECONSTRUCTION_PLANNER = "deconstruction_planner"
}

const expressBeltTypes = [
    'express-splitter',
    'express-transport-belt',
    'express-underground-belt',
];

const fastBeltTypes = [
    'belt/fast-splitter',
    'belt/fast-transport-belt',
    'belt/fast-underground-belt',
];

const slowBeltTypes = [
    'belt/splitter',
    'belt/transport-belt',
    'belt/underground-belt',
];

const allBeltTypes = [
    ...expressBeltTypes,
    ...fastBeltTypes,
    ...slowBeltTypes,
];

class Blueprint {
    public readonly encodedText: string;

    public decodedBlueprint: any | undefined;
    public blueprintType: BlueprintType | undefined
    public versionString: string | undefined;

    constructor(encodedText: string) {
        this.encodedText = encodedText;
        this.decodedBlueprint = this.convertEncodedTextToObject();

        if (this.validate()) {
            if (this.decodedBlueprint.blueprint_book !== undefined) {
                this.blueprintType = BlueprintType.BOOK;
            } else if (this.decodedBlueprint.blueprint !== undefined) {
                this.blueprintType = BlueprintType.BLUEPRINT
            } else if (this.decodedBlueprint.upgrade_planner !== undefined) {
                this.blueprintType = BlueprintType.UPGRADE_PLANNER;
            } else if (this.decodedBlueprint.deconstruction_planner !== undefined) {
                this.blueprintType = BlueprintType.DECONSTRUCTION_PLANNER
            }
            if (this.blueprintType) {
                this.versionString = this.parseVersion(this.decodedBlueprint[this.blueprintType].version)
            }
        }
    }

    validate() {
        return this.decodedBlueprint !== undefined;
    }

    convertEncodedTextToObject(): any {
        try {
            const jsonString: string = decodeV15Base64(this.encodedText);
            return JSON.parse(jsonString);
        }
        catch (e) {
            return undefined;
        }
    }

    parseVersion(versionNumber: number): string {
        const version = BigInt(versionNumber);
        const parts = [];
        for (let i = 0; i < 4; i++) {
            // Extract each 16-bit chunk
            const part = Number((version >> BigInt(48 - i * 16)) & BigInt(0xffff));
            parts.push(part);
        }

        // Remove trailing zeros
        while (parts.length > 1 && parts[parts.length - 1] === 0) {
            parts.pop();
        }

        return parts.join('.');
    }

    private generateTagSuggestionsFromProduction(recipeCounts: Dictionary<number>, entityCounts: Dictionary<number>): string[] {
        const tagSuggestions: string[] = []
        if (entityCounts['rocket-silo'] > 0) {
            tagSuggestions.push('production/rocket parts');
            if (recipeCounts['high-tech-science-pack'] > 0
                || recipeCounts['military-science-pack'] > 0
                || recipeCounts['production-science-pack'] > 0
                || recipeCounts['science-pack-1'] > 0
                || recipeCounts['science-pack-2'] > 0
                || recipeCounts['science-pack-3'] > 0) {
                tagSuggestions.push('production/science');
            }
        }
        else if (recipeCounts['high-tech-science-pack'] > 0
            || recipeCounts['military-science-pack'] > 0
            || recipeCounts['production-science-pack'] > 0
            || recipeCounts['science-pack-1'] > 0
            || recipeCounts['science-pack-2'] > 0
            || recipeCounts['science-pack-3'] > 0) {
            tagSuggestions.push('production/science');
        }
        else if (recipeCounts['low-density-structure'] > 0
            || recipeCounts['rocket-fuel'] > 0
            || recipeCounts['rocket-control-unit'] > 0) {
            tagSuggestions.push('production/rocket parts');
        }
        else if (recipeCounts['speed-module-3'] > 0
            || recipeCounts['productivity-module-3'] > 0
            || recipeCounts['effectivity-module-3'] > 0) {
            tagSuggestions.push('production/modules');
        }
        else if (recipeCounts['processing-unit'] > 0) {
            tagSuggestions.push('production/processing unit (blue)');
        }
        else if (recipeCounts['construction-robot']
            || recipeCounts['flying-robot-frame']
            || recipeCounts['logistic-robot']) {
            tagSuggestions.push('production/robots');
        }
        else if (recipeCounts.battery > 0) {
            tagSuggestions.push('production/batteries');
        }
        else if (recipeCounts['advanced-circuit'] > 0) {
            tagSuggestions.push('production/advanced circuit (red)');
        }
        else if (recipeCounts['plastic-bar'] > 0) {
            tagSuggestions.push('production/plastic');
        }
        else if (recipeCounts['coal-liquefaction'] > 0) {
            tagSuggestions.push('production/coal liquification');
        }
        else if (recipeCounts['advanced-oil-processing'] > 0
            || recipeCounts['oil-processing'] > 0
            || entityCounts.pumpjack > 0) {
            tagSuggestions.push('production/oil processing');
        }
        else if (recipeCounts['kovarex-enrichment-process']) {
            tagSuggestions.push('power/kovarex enrichment');
            if (recipeCounts['uranium-processing']) {
                tagSuggestions.push('production/uranium');
            }
        }
        else if (recipeCounts['uranium-processing']) {
            tagSuggestions.push('production/uranium');
        }
        else if (recipeCounts.inserter > 0) {
            tagSuggestions.push('production/inserters');
        }
        else if (recipeCounts['firearm-magazine']
            || recipeCounts['piercing-rounds-magazine']
            || recipeCounts['uranium-rounds-magazine']
            || recipeCounts['defender-capsule']
            || recipeCounts['destroyer-capsule']
            || recipeCounts['distractor-capsule']) {
            tagSuggestions.push('production/guns and ammo');
        }
        else if (recipeCounts['electronic-circuit'] > 0) {
            tagSuggestions.push('production/electronic circuit (green)');
        }
        else if (allBeltTypes.some(each => recipeCounts[each] > 0)) {
            tagSuggestions.push('production/belts');
        }
        else if (entityCounts['electric-furnace'] > 0 || entityCounts['steel-furnace'] > 0 || entityCounts['stone-furnace'] > 0) {
            tagSuggestions.push('production/smelting');
        }
        else if (entityCounts['electric-mining-drill'] > 0) {
            tagSuggestions.push('production/mining');
        }
        return tagSuggestions;
    }

    private generateTagSuggestionsForMods(allGameEntities: string[], entityCounts: Dictionary<number>, title: string): string[] {
        const tagSuggestions = []
        if (/\b(Factorissimo)\b/i.test(title)) {
            tagSuggestions.push('mods/factorissimo');
            return tagSuggestions;
        }

        const allVanilla = every(allGameEntities, each => (entitiesWithIcons as Dictionary<boolean>)[each] === true);
        if (allVanilla) {
            tagSuggestions.push('mods/vanilla');
            return tagSuggestions;
        }

        const creativeMod = some(allGameEntities, each => each.startsWith('creative-mode'));
        const bobsMod = some(allGameEntities, each => each.startsWith('electronics-machine') || each.startsWith('bob-'));
        const angelsMod = some(allGameEntities, each => each.startsWith('angels-'));
        const warehousingMod = entityCounts['storehouse-storage'] > 0
            || entityCounts['warehouse-storage'] > 0;
        const lightedElectricPolesMod = entityCounts['lighted-small-electric-pole'] > 0
            || entityCounts['lighted-medium-electric-pole'] > 0
            || entityCounts['lighted-big-electric-pole'] > 0;

        if (creativeMod) {
            tagSuggestions.push('mods/creative');
        }
        if (bobsMod) {
            tagSuggestions.push('mods/bobs');
        }
        if (angelsMod) {
            tagSuggestions.push('mods/angels');
        }
        if (lightedElectricPolesMod) {
            tagSuggestions.push('mods/lighted-electric-poles');
        }
        if (warehousingMod) {
            tagSuggestions.push('mods/warehousing');
        }
        if (!creativeMod && !bobsMod && !angelsMod && !lightedElectricPolesMod && !warehousingMod) {
            tagSuggestions.push('mods/other');
        }
        return tagSuggestions;
    };

    private generateTagSuggestionsFromEntityHistogram(entityHistogram: [string, number][], entityCounts: Dictionary<number>): string[] {
        const tagSuggestions: string[] = []
        if (entityHistogram) {
            return tagSuggestions;
        }

        if (every(entityHistogram, (pair: [string, number]) => allBeltTypes.includes(pair[0]))) {
            tagSuggestions.push('belt/balancer');

            const checkBeltSpeed = (beltTypes: string[], tag: string) => {
                if (every(entityHistogram, (pair: [string, number]) => beltTypes.includes(pair[0]))) {
                    tagSuggestions.push(tag);
                }
            };

            checkBeltSpeed(expressBeltTypes, 'belt/express transport belt (blue)');
            checkBeltSpeed(fastBeltTypes, 'belt/fast transport belt (red)');
            checkBeltSpeed(slowBeltTypes, 'belt/transport belt (yellow)');
        }

        // Most common item
        if (entityHistogram[0][0] === 'small-lamp' || entityCounts['small-lamp'] > 100 && entityHistogram[1] && entityHistogram[1][0] === 'small-lamp') {
            tagSuggestions.push('circuit/indicator');
        }
        return tagSuggestions;
    };

    generateTagSuggestions(title: string) {

        if (!this.validate()) {
            return [];
        }
        if (this.blueprintType == BlueprintType.BOOK) {
            const blueprints = this.decodedBlueprint.blueprint_book.blueprints;
            const entities = flatMap(blueprints, 'blueprint.entities');

            const entityCountBy = countBy(entities, 'name');
            const entityPairs = toPairs(entityCountBy);
            const entityHistogram = sortBy(entityPairs, 1).reverse();

            const recipes = map(entities, 'recipe');
            const nonUndefinedRecipes = reject(recipes, isUndefined);
            const recipeCountBy = countBy(nonUndefinedRecipes);
            const recipePairs = toPairs(recipeCountBy);
            const recipeHistogram = sortBy(recipePairs, 1).reverse();

            const entityCounts = fromPairs(entityHistogram);
            const allGameEntities = Object.keys(entityCounts);
            const recipeCounts = fromPairs(recipeHistogram);

            return this.generateAllTagSuggestions(title, entityHistogram, entityCounts, recipeCounts, allGameEntities);
        } else if (this.blueprintType == BlueprintType.BLUEPRINT) {
            const entities = flatMap(this.decodedBlueprint.blueprint, 'entities');

            const recipes = map(entities, 'recipe');
            const nonUndefinedRecipes = reject(recipes, isUndefined);
            const recipeCountBy = countBy(nonUndefinedRecipes);
            const recipePairs = toPairs(recipeCountBy);
            const recipeHistogram = sortBy(recipePairs, 1).reverse();

            const recipeCounts = fromPairs(recipeHistogram);
            const entityHistogram = this.generateEntityHistogram(this.decodedBlueprint.blueprint);
            const entityCounts = fromPairs(entityHistogram);

            const itemHistogram = this.generateItemHistogram(this.decodedBlueprint.blueprint);
            const itemCounts = fromPairs(itemHistogram);
            const allGameEntities = [
                ...Object.keys(entityCounts),
                ...Object.keys(itemCounts),
            ];

            return this.generateAllTagSuggestions(title, entityHistogram, entityCounts, recipeCounts, allGameEntities)
        }

    }

    generateEntityHistogram(parsedBlueprint: any): [string, number][] {
        const items = concat(parsedBlueprint.entities || [], parsedBlueprint.tiles || []);
        const counts = countBy(items, 'name');
        const pairs = toPairs(counts);
        const sortedPairs = sortBy(pairs, [each => each[1]]);
        return reverse(sortedPairs);
    };

    generateItemHistogram(parsedBlueprint: any) {
        const result: Dictionary<number> = {};
        const items = flatMap(parsedBlueprint.entities, entity => entity.items || []);
        items.forEach((item) => {
            if (has(item, 'item') && has(item, 'count')) {
                result[item.item] = (result[item.item] || 0) + item.count;
            }
            else {
                forOwn(item, (value, key) => result[key] = (result[key] || 0) + value);
            }
        });

        const pairs = toPairs(result)
        const sortedPairs = sortBy(pairs, [each => each[1]]);
        return reverse(sortedPairs);
    };

    private generateTagSuggestionsFromEntityCounts(entityCounts: Dictionary<number>): string[] {
        const tagSuggestions: string[] = []
        // Mutually exclusive
        if (entityCounts.lab > 0) {
            tagSuggestions.push('production/research (labs)');
        }
        else if (!entityCounts['train-stop']
            && entityCounts['stone-wall']
            && entityCounts.gate
            && entityCounts['straight-rail']
            && entityCounts['rail-signal']) {
            tagSuggestions.push('train/crossing');
        }
        else if (!entityCounts['train-stop']
            && entityCounts['curved-rail'] > 0
            && entityCounts['rail-chain-signal'] > 0
            && entityCounts['rail-signal'] > 0
            && entityCounts['straight-rail'] > 0) {
            tagSuggestions.push('train/junction');
            tagSuggestions.push('train/roundabout');
        }

        if (entityCounts['nuclear-reactor'] > 0) {
            tagSuggestions.push('power/nuclear');
        }
        else if (entityCounts['solar-panel'] > 10) {
            tagSuggestions.push('power/solar');
        }
        else if (entityCounts['steam-engine'] > 1) {
            tagSuggestions.push('power/steam');
        }
        else if (entityCounts.accumulator > 1) {
            tagSuggestions.push('power/accumulator');
        }

        // Additional
        if (entityCounts.beacon > 10) {
            tagSuggestions.push('general/beaconized');
        }
        return tagSuggestions
    }

    private generateAllTagSuggestions(title: string, entityHistogram: [string, number][], entityCounts: Dictionary<number>, recipeCounts: Dictionary<number>, allGameEntities: string[]): string[] {
        const tagSuggestions = []
        tagSuggestions.push(this.generateTagSuggestionsFromProduction(recipeCounts, entityCounts))
        tagSuggestions.push(this.generateTagSuggestionsFromEntityHistogram(entityHistogram, entityCounts))
        tagSuggestions.push(this.generateTagSuggestionsFromEntityCounts(entityCounts))
        tagSuggestions.push(this.generateTagSuggestionsFromTitle(title))
        tagSuggestions.push(this.generateTagSuggestionsForMods(allGameEntities, entityCounts, title))

        return uniq(flatten(tagSuggestions))
    };

    private generateTagSuggestionsFromTitle(title: string): string[] {
        const tagSuggestions: string[] = []
        // Train
        if (/\b(pax)\b/i.test(title)) {
            tagSuggestions.push('train/pax');
        }
        // Contains word starting with "unload"
        if (/\b(train)\b/i.test(title) && /\b(unload)/i.test(title)) {
            tagSuggestions.push('train/unloading station');
        }
        // Contains word starting with "load"
        if (/\b(train)\b/i.test(title) && /\b(load)/i.test(title)) {
            tagSuggestions.push('train/loading station');
        }
        if (/\b(lhd)\b/i.test(title) || /\b(left hand drive)\b/i.test(title)) {
            tagSuggestions.push('train/left-hand-drive');
        }
        if (/\b(rhd)\b/i.test(title) || /\b(right hand drive)\b/i.test(title)) {
            tagSuggestions.push('train/right-hand-drive');
        }

        if (/\b(mall)\b/i.test(title)) {
            tagSuggestions.push('production/mall (make everything)');
        }

        if (/\b(early)\b/i.test(title)) {
            tagSuggestions.push('general/early game');
        }
        if (/\b(mid)\b/i.test(title)) {
            tagSuggestions.push('general/mid game');
        }
        if (/\b(late)\b/i.test(title) || /\b(megabase)\b/i.test(title)) {
            tagSuggestions.push('general/late game (megabase)');
        }

        if (/\b(compact)\b/i.test(title)) {
            tagSuggestions.push('general/compact');
        }

        if (/\b(tileable)\b/i.test(title) || /\b(tile)\b/i.test(title)) {
            tagSuggestions.push('general/tileable');
        }
        return tagSuggestions
    }
}

export default Blueprint;