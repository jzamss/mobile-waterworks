import { serializeDate, deserializeDate } from "../rsi/db-util";

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
    stubouts
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
    this.readcount = 0;
    this._stubouts = stubouts;
  }

  get _serializer() {
    return {
      fromdate: serializeDate,
      todate: serializeDate,
      duedate: serializeDate,
      discdate: serializeDate,
    }
  }

  get _deserializer() {
    return {
      fromdate: deserializeDate,
      todate: deserializeDate,
      duedate: deserializeDate,
      discdate: deserializeDate,
    }
  }
}

export default Batch;
