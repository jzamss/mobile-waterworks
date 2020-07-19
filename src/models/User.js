class User {
  constructor(objid, username, password) {
    this.objid = objid;
    this.username = username;
    this.password = password;
    this.svrpassword = null;
    this.lastname = null;
    this.firstname = null;
    this.middlename = null;
    this.name = null;
    this.jobtitle = null;
  }
}

export default User;
