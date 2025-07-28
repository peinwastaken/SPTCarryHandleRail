import path from "node:path";
import fs from "node:fs"
import { WTTInstanceManager } from "./WTTInstanceManager";

export class PeinAssetReplace {
    private instanceManager : WTTInstanceManager

    public preSptLoad(instance : WTTInstanceManager) {
        this.instanceManager = instance
    }

    public postDBLoad() : void {
        this.replaceAssets()
    }

    public replaceAssets() {
        const configPath = path.join(__dirname, "../db/OverrideItems");
        const files = fs.readdirSync(configPath)

        files.forEach(file => {
            const filePath = path.join(configPath, file)
            
            if (filePath) {
                const fileData = fs.readFileSync(filePath, "utf-8")
                const overrideData = JSON.parse(fileData)

                const templateId = overrideData.id
                const props = overrideData.props

                for (const [key, value] of Object.entries(props)) {
                    this.instanceManager.database.templates.items[templateId]._props[key] = value
                }
            }
        });
    }
}