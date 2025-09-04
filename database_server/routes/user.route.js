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
    getFriendRequests 
} = require('../controller/user.controller')

const router = express.Router()

router.post('/getUserByEmailAndPassword', checkServiceToken, getUserByEmailAndPassword)
router.post('/registerNewUser', checkServiceToken, registerNewUser)
router.post("/getUserByToken", checkServiceToken, getUserByToken)

// User search and friend request endpoints
router.get('/search', checkServiceToken, searchUsers)
router.post('/friend-request', checkServiceToken, sendFriendRequest)
router.put('/friend-request/:requestId', checkServiceToken, async (req, res) => {
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

module.exports = router