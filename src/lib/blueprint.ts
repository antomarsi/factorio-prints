import { decodeV15Base64 } from "./utils";

export enum BlueprintType {
    BOOK = "book",
    BLUEPRINT = "blueprint",
    UPGRADE_PLANNER = "upgrade_planner",
    DECONSTRUCTION_PLANNER = "deconstruction_planner"
}

class Blueprint {
    private readonly encodedText: string;

    public decodedBlueprint: any | undefined;
    public blueprintType : BlueprintType | undefined

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

}

export default Blueprint;