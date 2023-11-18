const sessionIdToUserMap = new Map()

async function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

async function getUser(id) {
    return await sessionIdToUserMap.get(id);
}

module.exports = {
    setUser, 
    getUser,
};