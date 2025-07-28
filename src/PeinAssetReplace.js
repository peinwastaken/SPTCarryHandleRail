"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeinAssetReplace = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
class PeinAssetReplace {
    instanceManager;
    preSptLoad(instance) {
        this.instanceManager = instance;
    }
    postDBLoad() {
        this.replaceAssets();
    }
    replaceAssets() {
        const configPath = node_path_1.default.join(__dirname, "../db/OverrideItems");
        const files = node_fs_1.default.readdirSync(configPath);
        files.forEach(file => {
            const filePath = node_path_1.default.join(configPath, file);
            if (filePath) {
                const fileData = node_fs_1.default.readFileSync(filePath, "utf-8");
                const overrideData = JSON.parse(fileData);
                const templateId = overrideData.id;
                const props = overrideData.props;
                for (const [key, value] of Object.entries(props)) {
                    this.instanceManager.database.templates.items[templateId]._props[key] = value;
                }
            }
        });
    }
}
exports.PeinAssetReplace = PeinAssetReplace;
//# sourceMappingURL=PeinAssetReplace.js.map