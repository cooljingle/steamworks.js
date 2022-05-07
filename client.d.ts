export function init(appId: number): void
export function runCallbacks(): void
export namespace achievement {
  export function activate(achievement: string): boolean
}
export namespace cloud {
  export function isEnabledForAccount(): boolean
  export function isEnabledForApp(): boolean
  export function readFile(name: string): string
  export function writeFile(name: string, content: string): boolean
  export function deleteFile(name: string): boolean
}
export namespace input {
  export interface AnalogActionVector {
    x: number
    y: number
  }
  export function init(): void
  export function getControllers(): Array<Controller>
  export function getActionSet(actionSetName: string): bigint
  export function getDigitalAction(actionName: string): bigint
  export function getAnalogAction(actionName: string): bigint
  export function shutdown(): void
  export class Controller {
    handle: bigint
    activateActionSet(actionSetHandle: bigint): void
    isDigitalActionPressed(actionHandle: bigint): boolean
    getAnalogActionVector(actionHandle: bigint): AnalogActionVector
  }
}
export namespace localplayer {
  export interface LocalSteamId {
    steamId64: string
    steamId32: string
    accountId: number
  }
  export function getSteamId(): LocalSteamId
  export function getName(): string
  export function getLevel(): number
  /** @returns the 2 digit ISO 3166-1-alpha-2 format country code which client is running in, e.g "US" or "UK". */
  export function getIpCountry(): string
}
export namespace stats {
  export function getInt(name: string): number | null
  export function setInt(name: string, value: number): boolean
  export function store(): boolean
  export function resetAll(achievementsToo: boolean): boolean
}
export namespace workshop {
  export interface UgcResult {
    itemId: bigint
    needsToAcceptAgreement: boolean
  }
  export interface UgcUpdate {
    title?: string
    description?: string
    changeNote?: string
    previewPath?: string
    contentPath?: string
    tags?: Array<string>
  }
  export interface InstallInfo {
    folder: string
    sizeOnDisk: bigint
    timestamp: number
  }
  export interface DownloadInfo {
    current: bigint
    total: bigint
  }
  export function createItem(): Promise<UgcResult>
  export function updateItem(itemId: bigint, updateDetails: UgcUpdate): Promise<UgcResult>
  /**
   * Subscribe to a workshop item. It will be downloaded and installed as soon as possible.
   * https://partner.steamgames.com/doc/api/ISteamUGC#SubscribeItem
   */
  export function subscribe(itemId: bigint): Promise<void>
  /**
   * Unsubscribe from a workshop item. This will result in the item being removed after the game quits.
   * https://partner.steamgames.com/doc/api/ISteamUGC#UnsubscribeItem
   */
  export function unsubscribe(itemId: bigint): Promise<void>
  /**
   * Gets the current state of a workshop item on this client. States can be combined.
   * https://partner.steamgames.com/doc/api/ISteamUGC#GetItemState
   * https://partner.steamgames.com/doc/api/ISteamUGC#EItemState
   */
  export function state(itemId: bigint): number
  /**
   * Gets info about currently installed content on the disc for workshop item.
   * https://partner.steamgames.com/doc/api/ISteamUGC#GetItemInstallInfo
   */
  export function installInfo(itemId: bigint): InstallInfo | null
  export function downloadInfo(itemId: bigint): DownloadInfo | null
  export function download(itemId: bigint, highPriority: boolean): boolean
}
