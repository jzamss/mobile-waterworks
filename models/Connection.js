class Connection {
    constructor(ipaddress, port, objid = null) {
        this.objid = 'C'+Math.random().toString();
        this.ipaddress = ipaddress;
        this.port = port;
    }

    get host() {
        return `http://${this.ipaddress}:${this.port}/osiris3/json/enterprise`;
    }

    get supportService() {
        return `${this.host}/WaterworksMobileSupportService`;
    }

    get settingService() {
        return `${this.host}/WaterworksMobileSettingService`;
    }
}

export default Connection;