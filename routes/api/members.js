const express = require('express');
const router = express.Router()
let members = require("../../Members");
const uuid = require('uuid');

// Get All members
router.get('/', (req, res) => res.json(members));

// Get single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);
    if (found) {
        res.json(members.filter(member => member.id === req.params.id));
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Create Member
router.post('/', (req, res) =>{
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'

    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({msg: 'Please include a name and an email'});
    }
    members.push(newUser);
    res.json(members);
});
// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === req.params.id) {
                member.name = updMember.name?  updMember.name: member.name;
                member.email = updMember.email?  updMember.email: member.email;
                res.json({msg: 'Member updated', member});
            }
        });
    }
});

// Delete Member 
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === req.params.id);
    if (found) {
        members = members.filter(member => member.id !== req.params.id);
        res.json(members);
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;