import {
  serializeDate,
  deserializeDate,
  serializeJson,
  deserializeJson,
  serializeBoolean,
  deserializeBoolean
} from "../rsi/db-util";

class Account {
  constructor(
    objid,
    state,
    batchid,
    billno,
    seqno,
    acctno,
    acctname,
    classification,
    address,
    prevreading,
    reading,
    meterserialno,
    meterbrand,
    metersize,
    metercapacity,
    volume,
    amount,
    balanceforward,
    otherfees,
    attributes,
    lng,
    lat,
    photo,
    remarks,
    readingdate,
    billprintdate,
    stuboutid,
    billitems,
    consumptionid,
    units = 1
  ) {
    this.objid = objid;
    this.state = state;
    this.batchid = batchid;
    this.billno = billno;
    this.seqno = seqno;
    this.acctno = acctno;
    this.acctname = acctname;
    this.classification = classification;
    this.address = address;
    this.prevreading = prevreading;
    this.reading = reading;
    this.meterserialno = meterserialno;
    this.meterbrand = meterbrand;
    this.metersize = metersize;
    this.metercapacity = metercapacity;
    this.volume = volume;
    this.amount = amount;
    this.balanceforward = balanceforward;
    this.otherfees = otherfees;
    this.attributes = attributes;
    this.lng = lng;
    this.lat = lat;
    this.photo = photo;
    this.photourl = null;
    this.remarks = remarks;
    this.readingdate = readingdate;
    this.billprintdate = billprintdate;
    this.stuboutid = stuboutid;
    this.billitems = billitems;
    this.consumptionid = consumptionid;
    this.units = units;
    this.hold = false;
    this.total = 0.0;
  }

  get _serializer() {
    return {
      readingdate: serializeDate,
      billprintdate: serializeDate,
      billitems: serializeJson,
      hold: serializeBoolean,
    };
  }

  get _deserializer() {
    return {
      readingdate: deserializeDate,
      billprintdate: deserializeDate,
      billitems: deserializeJson,
      hold: deserializeBoolean,
    };
  }
}

export default Account;
