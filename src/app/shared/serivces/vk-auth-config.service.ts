import {Injectable} from "@angular/core";
import { VkAuthConfig, VkConfig, PopupConfig } from "./authMethods";


@Injectable()
export class VkConfiguration implements VkAuthConfig {
    public vkConfig : VkConfig = {
        client_id: '6027755',
        display: 'popup',
        scope: ['friends'],
        response_type: 'token',
        v: 5.64
    };
    public popupConfig: PopupConfig = {
        location: 'no',
        height: 600,
        width: 600
    };
    public cleanUp: boolean = true;
    public dbPath: string = 'auth/vk';
    constructor() { }
}