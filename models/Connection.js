import { v4 as uuidv4 } from 'uuid';

class Connection {
    constructor(ipaddress, port, objid = null) {
        this.objid = 'C'+Math.random().toString();
        this.ipaddress = ipaddress;
        this.port = port;
    }
}

export default Connection;