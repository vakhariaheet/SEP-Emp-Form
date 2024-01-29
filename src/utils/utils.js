const query = (db, q) => {
    return new Promise((resolve, reject) => {
        db.query(q, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    query
}