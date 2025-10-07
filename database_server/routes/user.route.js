const express = require('express')
const checkServiceToken = require("../middleware/auth.middleware")
const { 
    getUserByEmailAndPassword, 
    registerNewUser, 
    getUserByToken,
    searchUsers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    acceptFriendRequestByUsername,
    rejectFriendRequestByUsername,
    getFriendRequests 
} = require('../controller/user.controller')

const router = express.Router()

router.post('/getUserByEmailAndPassword', checkServiceToken, getUserByEmailAndPassword)
router.post('/registerNewUser', checkServiceToken, registerNewUser)
router.post("/getUserByToken", checkServiceToken, getUserByToken)

router.get('/search', searchUsers)
router.post('/friend-request', sendFriendRequest)
router.put('/friend-request/:requestId', async (req, res) => {
    const { status } = req.body;
    if (status === 'accepted') {
        await acceptFriendRequest(req, res);
    } else if (status === 'rejected') {
        await rejectFriendRequest(req, res);
    } else {
        res.status(400).json({ message: 'Invalid status' });
    }
})
router.get('/:userId/friend-requests', checkServiceToken, getFriendRequests)
router.post('/friend-request/accept', checkServiceToken, acceptFriendRequestByUsername)
router.post('/friend-request/reject', checkServiceToken, rejectFriendRequestByUsername)

module.exports = router