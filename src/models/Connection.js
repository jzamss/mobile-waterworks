class Connection {
    constructor() {
        this.objid = 'C'+Math.random().toString();
        this.adminhost = "localhost:8070";
        this.admincluster = "osiris3";
        this.admincontext = "etracs25";

        this.waterworkshost = "localhost:8076";
        this.waterworkscluster = "osiris3";
        this.waterworkscontext = "enterprise";
    }
}

export default Connection;