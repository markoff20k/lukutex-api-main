const db = require("../database/peatio_production");

module.exports = class Members {
    constructor(
        id,
        uid,
        email,
        level,
        role,
        group,
        state,
        created_at,
        updated_at
    ) {
        this.id = id;
        this.uid = uid;
        this.email = email;
        this.level = level;
        this.role = role;
        this.group = group;
        this.state = state;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fetch_all() {
        return db.execute("SELECT id, uid, email, role FROM members");
    }

    static getMemberID(uid) {
        return db.execute("SELECT id, email FROM members WHERE uid = ?", [uid]);
    }

    static getUidByMemberID(member_id) {
        return db.execute("SELECT uid FROM members WHERE id = ?", [member_id]);
    }

};