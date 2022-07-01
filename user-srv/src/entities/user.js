import { dbConnect, getDbConn } from 'yepkit-mongodb';
import LogClass from 'yepkit-logger';
const log = new LogClass('src/entities/user.js');
import bcrypt from 'bcrypt';
import pkg from 'mongodb';
const { ObjectId } = pkg;

const collectionName = 'details';

export default class User {
  constructor() {
    this.doc = {
      email: null,      // string, required
      firstName: null,  // string, required
      lastName: null,   // string, required
      pwdHash: null,    // string, required
      role: "user",     // string, required
      company: null,    // string
      vatNumber: null,  // string
      billingDetails: {
        contactName: null,    // string
        company: null,        // string
        addLine1: null,       // string
        addLine2: null,       // string
        postCode: null,       // string
        city: null,           // string
        state: null,          // string
        country: null,        // string
        phone: null,          // string
        vatNumber: null,  // string
      },
      shippingDetails: {
        contactName: null,    // string
        company: null,        // string
        addLine1: null,       // string
        addLine2: null,       // string
        postCode: null,       // string
        city: null,           // string
        state: null,          // string
        country: null,        // string
        phone: null,          // string
      },
      status: "unconfirmed"     // string, "unconfirmed" | "active" | "inactive"
                                // | "blacklisted"
    };
  }
  
  setEmail(value) {
    if (!this.validateEmail(value)) {
      throw new Error("Invalid email format");
    }
    this.doc.email = value; 
  }
  getEmail() {
    return this.doc.email;
  }
  
  setFirstName(value) {
    this.doc.firstName = value;
  }
  getFirstName() {
    return this.doc.firstName;
  }

  setLastName(value) {
    this.doc.lastName = value;
  }
  getLastName() {
    return this.doc.lastName;
  }

  async setPassword(pwdPlain) {
    const passwordRegex1 = /.{8,}/;
    const passwordRegex2 = /[A-Z]/;
    if(!pwdPlain.match(passwordRegex1) || !pwdPlain.match(passwordRegex2)) {
      throw new Error("Password must contain upercase chars and numeric chars and must have more than 8 chars");
    }
    this.doc.pwdHash = await bcrypt.hash(pwdPlain, 10);
  }

  /**
   * Returns:
   * true if valid
   * false if not valid
   */
  async validatePassword(pwdPlain) {
    const match = await bcrypt.compare(pwdPlain, this.doc.pwdHash);
    return match;
  }

  setRole(value) {
    this.doc.role = value;
  }
  getRole() {
    return this.doc.role;
  }

  setCompany(value) {
    this.doc.company = value;
  }
  getCompany() {
    return this.doc.company;
  }

  setVatNumber(value) {
    this.doc.vatNumber = value;
  }
  getVatNumber() {
    return this.doc.vatNumber;
  }

  setBillingDetails(billingObj) {
    this.doc.billingDetails = billingObj;
  }
  getBillingDetails() {
    return this.doc.billingDetails;
  }

  setShippingDetails(shippingObj) {
    this.doc.shippingDetails = shippingObj;
  }
  getShippingDetails() {
    return this.doc.shippingDetails;
  }

  setStatus(value) {
    this.doc.status = value;
  }
  getStatus() {
    return this.doc.status;
  }

  /**
   * Returns the mongoDB id object converted to string.
   * For example, for the following id oject
   * _id: new ObjectId("61826225d4e6aea7efe23355")
   * "61826225d4e6aea7efe23355" will be returned.
   */
  getId() {
    return this.doc._id.toString();
  }

  
  validateEmail(email) {
    const emailRegexp = /^([a-zA-Z0-9\.\+_\-]+)@([a-zA-Z0-9\.\+_\-]+)\.([a-zA-Z]{2,5})$/;
    if (!email.match(emailRegexp)) {
      return false;
    }
    return true;
  }
  
  /**
   * Persists a document into the database.
   * If the document already exists it will throw an error.
   *
   * If the document is persisted with success the insert response
   * will be returned. The insert response has the following structure:
   * out =  {
   *  acknowledged: true,
   *  insertedId: new ObjectId("61826225d4e6aea7efe23355")
   * }
   */
  async persist() {
    let collection = await getDbConn().collection(collectionName);
    // Validations
    if (!this.doc.email) {
      log.error('Doc does not have an email');
      throw new Error('Doc does not have an email');
    }
    if (!this.doc.pwdHash) {
      log.error('Doc does not have a password');
      throw new Error('Doc does not have a password');
    }
    // email must be unique. Before inserting a test is made to ensure
    // that the email does not exist in the database.
    const result = await collection.findOne({email: this.doc.email});
    if (result) {
      if (result.email === this.doc.email) {
        console.log('ERROR: Email already exists in the users database.');
        throw new Error('Email already exists.');
      }
    } 
    
    // Insert new document int the database.
    const out = await collection.insertOne(this.doc);
    this.doc._id = out.insertedId;
    console.log('Inserted document for user email: ',this.doc.email);
    return out;
  }

  async flush() {
    // Because the email must be unique and it may have been changed we
    // must check if the email is the same. If it's a new email then we
    // must check if it already exists in the data base.
    // Let's do a query by email and chack if the _id is the same.
    // If it's not the same then the email address is already associated
    // to another user account. In this case an error will be throwned.
    let collection = await getDbConn().collection(collectionName);
    const result = await collection.findOne({email: this.doc.email});
    if (result) {
      if (result._id.toString() !== this.doc._id.toString()) {
        throw new Error('Email address is already associated to another user');
      }
    }

    await collection.replaceOne({_id: this.doc._id}, this.doc);
  }

  async fetchById(id) {
    let collection = await getDbConn().collection(collectionName);
    const result = await collection.findOne({_id: new ObjectId(id)});
    this.doc = result;
    return result;
  }

  async fetchByEmail(email) {
    if (!this.validateEmail(email)) {
      return null;
    }
    let collection = await getDbConn().collection(collectionName);
    const result = await collection.findOne({email: email});
    if (result) {
      this.doc = result;
    }
    return result;
  }

  /**
   *
   */
  async deleteById(id) {
    let collection = await getDbConn().collection(collectionName);
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log(Date.now(), " Successfully deleted one document.");
      return 1;
    } else {
      console.log(Date.now(), " No documents matched the query. Deleted 0 documents.");
      return 0;
    }
  }

  /**
   * Deletes all documents with the provided email.
   *
   * Returns the number of deleted documents.
   */
  async deleteByEmail(email) {
    let collection = await getDbConn().collection(collectionName);
    const query = { email: email };
    const result = await collection.deleteMany(query);
    console.log(Date.now(), " Deleted " + result.deletedCount + " documents for email " + email);
    return result.deletedCount;
  }
}
