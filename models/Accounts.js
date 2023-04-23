const db = require('../database/peatio_production');

module.exports = class Accounts {
    constructor(
        member_id,
        currency_id,
        balance,
        locked,
        created_at,
        updated_at
    ) {
        this.member_id = member_id;
        this.currency_id = currency_id;
        this.balance = balance;
        this.locked = locked;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    save() {
        return db.execute("INSERT INTO accounts(member_id,currency_id,balance,locked,created_at,updated_at) Values(?,?,?,?,?,?)", [this.member_id, this.currency_id, this.balance, this.locked, this.created_at, this.updated_at]);
    }

    static updateBalance(member_id, currency_id, bonus) {
        return db.execute('UPDATE accounts SET balance = balance + ? WHERE member_id = ? and currency_id = ?', [bonus, member_id, currency_id]);
    }

    static substractEthBalance(member_id, eth_fee) {
        return db.execute('UPDATE accounts SET balance = balance - ? WHERE member_id = ? and currency_id = "eth"', [eth_fee, member_id]);
    }

    static getBalanceUser(member_id) {
        return db.execute('SELECT balance FROM accounts where member_id = ? and currency_id = "eth"', [member_id]);
    }

    static getAllMemberID(currency_id) {
        return db.execute("SELECT member_id FROM accounts WHERE currency_id = ?", [currency_id]);
    }

    static getBalanceUserByCurrencyID(member_id, currency_id) {
        return db.execute('SELECT balance FROM accounts where member_id = ? and currency_id = ?', [member_id, currency_id]);
    }

    static plusBalance(member_id, currency_id, amount) {
        return db.execute('UPDATE accounts SET balance = balance + ?, updated_at = ? WHERE member_id = ? and currency_id = ?', [amount, new Date(), member_id, currency_id]);
    }

    static substractBalance(member_id, currency_id, amount) {
        return db.execute('UPDATE accounts SET balance = balance - ?, updated_at = ? WHERE member_id = ? and currency_id = ?', [amount, new Date(), member_id, currency_id]);
    }
};