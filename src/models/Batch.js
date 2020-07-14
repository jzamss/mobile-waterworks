import { serializeDate, deserializeDate, serializeJson, deserializeJson } from "../rsi/db-util";

class Batch {
  constructor(
    objid,
    subareaid,
    subareacode,
    areacode,
    year,
    month,
    fromdate,
    todate,
    duedate,
    discdate,
    readerid,
    readername,
    recordcount,
    stubouts,
    task = {},
    readcount = 0
  ) {
    this.objid = objid;
    this.subareaid = subareaid;
    this.subareacode = subareacode;
    this.areacode = areacode;
    this.year = year;
    this.month = month;
    this.fromdate = fromdate;
    this.todate = todate;
    this.duedate = duedate;
    this.discdate = discdate;
    this.readerid = readerid;
    this.readername = readername;
    this.recordcount = recordcount;
    this._stubouts = stubouts;
    this.task = task;
    this.readcount = readcount
  }

  get _serializer() {
    return {
      fromdate: serializeDate,
      todate: serializeDate,
      duedate: serializeDate,
      discdate: serializeDate,
      task: serializeJson,
    }
  }

  get _deserializer() {
    return {
      fromdate: deserializeDate,
      todate: deserializeDate,
      duedate: deserializeDate,
      discdate: deserializeDate,
      task: deserializeJson,
    }
  }
}

export default Batch;
