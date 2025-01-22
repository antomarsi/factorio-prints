import { decodeV15Base64 } from "./utils";

export enum BlueprintType {
    BOOK = "blueprint_book",
    BLUEPRINT = "blueprint",
    UPGRADE_PLANNER = "upgrade_planner",
    DECONSTRUCTION_PLANNER = "deconstruction_planner"
}

class Blueprint {
    public readonly encodedText: string;

    public decodedBlueprint: any | undefined;
    public blueprintType : BlueprintType | undefined
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
}

export default Blueprint;