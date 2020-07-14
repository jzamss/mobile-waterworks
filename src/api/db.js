import { initDb as createDb } from "../rsi/db";

const dbName = "water.db";

export const initDb = (
  options = { 
    dropTables: false, 
    clearAllTables: false, 
    clearTxnTables: true, 
  }
) => {

  const sqls = [];

  if (options.dropTables) {
    sqls.push(...dropTables)
  }
  if (options.clearAllTables) {
    sqls.push(...clearAllTables)
  }
  if (options.clearTxnTables) {
    sqls.push(...clearTxnTables)
  }
  sqls.push(...createTables)
  createDb(dbName, sqls);
};

const dropTables = [
  `DROP TABLE IF EXISTS account;`,

  `DROP TABLE IF EXISTS stubout;`,

  `DROP TABLE IF EXISTS batch;`,

  `DROP TABLE IF EXISTS user;`,

  `DROP TABLE IF EXISTS connection;`,

  `DROP TABLE IF EXISTS rate;`,
];

const clearAllTables = [
  `DELETE FROM account;`,

  `DELETE FROM stubout;`,

  `DELETE FROM batch;`,

  `DELETE FROM user;`,

  `DELETE FROM connection;`,

  `DELETE FROM rate;`,
];

const clearTxnTables = [
  `DELETE FROM account;`,

  `DELETE FROM stubout;`,

  `DELETE FROM batch;`,
];

const createTables = [
  `CREATE TABLE IF NOT EXISTS user (
  objid TEXT PRIMARY KEY NOT NULL, 
  username TEXT NOT NULL,
  password TEXT NOT NULL
)
`,

  `CREATE TABLE IF NOT EXISTS connection (
  objid TEXT PRIMARY KEY NOT NULL, 
  ipaddress TEXT NOT NULL,
  port TEXT NOT NULL
)
`,

  `CREATE TABLE IF NOT EXISTS rate (
  rulename TEXT PRIMARY KEY NOT NULL,
  ruletype TEXT,
  salience INTEGER,
  script TEXT
)
`,

`CREATE TABLE IF NOT EXISTS batch (
  objid TEXT PRIMARY KEY NOT NULL, 
  subareaid TEXT NOT NULL,
  subareacode TEXT NOT NULL,
  areacode TEXT NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  fromdate TEXT,
  todate TEXT,
  duedate TEXT,
  discdate TEXT,
  readerid TEXT NOT NULL,
  readername TEXT NOT NULL,
  recordcount INTEGER NOT NULL DEFAULT 0,
  readcount INTEGER NOT NULL DEFAULT 0,
  task TEXT NULL
)
;
CREATE INDEX ix_subareaid ON batch (subareaid)
;
CREATE INDEX ix_subareacode ON batch (subareacode ASC)
;
CREATE INDEX ix_areacode ON batch (areacode ASC)
;
`,

  `CREATE TABLE IF NOT EXISTS stubout (
  objid TEXT PRIMARY KEY NOT NULL, 
  subareaid TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  barangay TEXT NOT NULL,
  lng REAL,
  lat REAL,
  recordcount INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (subareaid)
    REFERENCES batch (subareaid) 
      ON UPDATE NO ACTION 
      ON DELETE CASCADE
)
;
CREATE INDEX ix_subareaid ON stubout (subareaid)
;
CREATE INDEX ix_code ON stubout (code)
;
`,

  `CREATE TABLE IF NOT EXISTS account (
  objid TEXT PRIMARY KEY NOT NULL, 
  state INTEGER DEFAULT 0,
  batchid TEXT NOT NULL,
  billno TEXT NOT NULL,
  seqno INTEGER NOT NULL,
  acctno TEXT NOT NULL,
  acctname TEXT NOT NULL,
  classification TEXT,
  address TEXT,
  prevreading INTEGER NOT NULL DEFAULT 0,
  reading INTEGER NOT NULL DEFAULT 0,
  meterserialno TEXT NOT NULL,
  meterbrand TEXT NOT NULL,
  metersize TEXT NOT NULL,
  metercapacity INTEGER NOT NULL DEFAULT 0,
  volume INTEGER NOT NULL DEFAULT 0,
  amount REAL NOT NULL DEFAULT 0,
  balanceforward REAL NOT NULL DEFAULT 0,
  otherfees REAL NOT NULL DEFAULT 0,
  attributes TEXT,
  lng REAL,
  lat REAL,
  photo BLOB,
  photourl TEXT,
  remarks TEXT,
  readingdate TEXT,
  billprintdate TEXT,
  stuboutid TEXT,
  billitems TEXT,
  consumptionid TEXT,
  units REAL,
  hold INTEGER NOT NULL DEFAULT 0,
  total REAL NOT NULL DEFAULT 0,
  FOREIGN KEY (batchid)
    REFERENCES batch (objid) 
      ON UPDATE NO ACTION 
      ON DELETE CASCADE,
  FOREIGN KEY (stuboutid)
    REFERENCES stubout (objid) 
      ON UPDATE NO ACTION 
      ON DELETE NO ACTION
)
;
CREATE INDEX ix_state ON account(state)
;
CREATE INDEX ix_batchid ON account(batchid)
;
CREATE INDEX ix_billno ON account(billno)
;
CREATE INDEX ix_reading ON account(reading)
;
`,
];
