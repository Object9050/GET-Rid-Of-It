const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const items = [
    {
      "id": "1",
      "name": "old shirt",
      "reasonForRemoval": "outdated",
      "photoUrl": "https://example.com/old-shirt.jpg",
      "age": 5,
      "comments": "",
      "dateRemoved": "2022-01-01",
      "removalMethod": "donated"
    },
    {
      "id": "2",
      "name": "broken lamp",
      "reasonForRemoval": "broken",
      "photoUrl": "https://example.com/broken-lamp.jpg",
      "age": 2,
      "comments": "",
      "dateRemoved": "2022-02-01",
      "removalMethod": "trashed"
    },
    {
      "id": "3",
      "name": "worn out shoes",
      "reasonForRemoval": "worn out",
      "photoUrl": "https://example.com/worn-out-shoes.jpg",
      "age": 3,
      "comments": "",
      "dateRemoved": "2022-03-01",
      "removalMethod": "donated"
    },
    {
      "id": "4",
      "name": "old phone",
      "reasonForRemoval": "upgraded",
      "photoUrl": "https://example.com/old-phone.jpg",
      "age": 4,
      "comments": "",
      "dateRemoved": "2022-04-01",
      "removalMethod": "recycled"
    },
    {
      "id": "5",
      "name": "outdated computer",
      "reasonForRemoval": "outdated",
      "photoUrl": "https://example.com/outdated-computer.jpg",
      "age": 5,
      "comments": "",
      "dateRemoved": "2022-05-01",
      "removalMethod": "sold"
    }
  ];

/**
 * Routen
 */

// Liefert alle Gegenstände
  app.get('/api/items', (req, res) => {
res.send(items);
});

// Fügt einen Gegenstand hinzu
app.post('/api/items', (req, res) => {
let item = req.body;
items.push(item);
res.send(item);
});

// Anzeigen eines Gegenstandes anhand der ID
app.get('/api/items/:id', (req, res) => {
  let itemId = req.params.id;
  let item = items.find(item => item.id === itemId);
  res.send(item);
});

// Ändert einen Gegenstand
app.put('/api/items/:id', (req, res) => {
  let itemId = req.params.id;
  let itemIndex = items.findIndex(item => item.id === itemId);
  let updatedItem = req.body;
  items[itemIndex] = updatedItem;
  res.send(updatedItem);
});

// Löscht einen Gegenstand
app.delete('/api/items/:id', (req, res) => {
  let itemId = req.params.id;
  let itemIndex = items.findIndex(item => item.id === itemId);
  items.splice(itemIndex, 1);
  res.sendStatus(204);
});

// Öffnet den Server für Anfragen auf Port 3000
app.listen(3000, () => {
console.log('Server started at port 3000');
});