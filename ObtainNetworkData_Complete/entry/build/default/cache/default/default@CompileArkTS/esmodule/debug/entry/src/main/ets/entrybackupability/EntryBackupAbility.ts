import BackupExtensionAbility from "@ohos:application.BackupExtensionAbility";
import hilog from "@ohos:hilog";
const TAG: string = '[EntryBackupAbility]';
export default class EntryBackupAbility extends BackupExtensionAbility {
    async onBackup() {
        hilog.info(0x0001, TAG, 'onBackup ok');
        await Promise.resolve();
    }
    async onRestore() {
        hilog.info(0x0001, TAG, 'onRestore ok');
        await Promise.resolve();
    }
}
