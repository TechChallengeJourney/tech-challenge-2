const express = require('express');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/data.json');

// Read data from JSON file
const readData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// Write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all users
exports.getUsers = (req, res) => {
    const data = readData();
    res.json(data.users);
};

// Update user data
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    const data = readData();

    const userIndex = data.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };
    writeData(data);
    res.json(data.users[userIndex]);
};

// Delete a user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const data = readData();

    const userIndex = data.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    data.users.splice(userIndex, 1);
    writeData(data);
    res.status(204).send();
};

// Extracts
exports.getExtracts = (req, res) => {
    const data = readData();
    res.json(data.extracts || []);
};

exports.updateExtract = (req, res) => {
    const { id } = req.params;
    const updatedExtract = req.body;
    const data = readData();
    const extractIndex = data.extracts.findIndex(extract => extract.id == id);
    if (extractIndex === -1) {
        return res.status(404).json({ message: 'Extract not found' });
    }
    data.extracts[extractIndex] = { ...data.extracts[extractIndex], ...updatedExtract };
    writeData(data);
    res.json(data.extracts[extractIndex]);
};

exports.deleteExtract = (req, res) => {
    const { id } = req.params;
    const data = readData();
    const extractIndex = data.extracts.findIndex(extract => extract.id == id);
    if (extractIndex === -1) {
        return res.status(404).json({ message: 'Extract not found' });
    }
    data.extracts.splice(extractIndex, 1);
    writeData(data);
    res.status(204).send();
};

// Cards
exports.getCards = (req, res) => {
    const data = readData();
    res.json(data.cards || []);
};

exports.updateCard = (req, res) => {
    const { id } = req.params;
    const updatedCard = req.body;
    const data = readData();
    const cardIndex = data.cards.findIndex(card => card.id == id);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }
    data.cards[cardIndex] = { ...data.cards[cardIndex], ...updatedCard };
    writeData(data);
    res.json(data.cards[cardIndex]);
};

exports.deleteCard = (req, res) => {
    const { id } = req.params;
    const data = readData();
    const cardIndex = data.cards.findIndex(card => card.id == id);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }
    data.cards.splice(cardIndex, 1);
    writeData(data);
    res.status(204).send();
};