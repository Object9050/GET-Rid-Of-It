/**
 *  Modulimport: Express, fs, bodyParser 
 *  und Start des Express Servers
 */
const express = require('express');
const bodyParser = require('body-parser');// nötig um req.body lesen zu können (Z.B. bei POST-Anfragen)
const fs = require('fs'); //nötig, um auf Dateisystem (filesystem) zugreifen zu können
const jsonFile = require('./serverJsonHelper');// ausgelagerte fs.read und fs.writeFile 
//const { json } = require('express/lib/response');// <-- wie kam das hier hin?


// Express Server erstellen
const app = express();

app.use(bodyParser.json());

// Öffnet den Server für Anfragen auf Port 3000
app.listen(3001, () => {
  console.log('Server gestartet und lauscht auf Port 3001');
  });

/**
 * Routen
*/
// Liefert alle Gegenstände
app.get('/api/items', (req, res) => {
  jsonFile
    .readJsonFile()
    .then((jsonData) => {
      res.status(200).send(jsonData.items)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('JSON-Datei nicht lesbar');
    });
  });

// Anzeigen eines Gegenstandes anhand der ID
app.get('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  jsonFile
    .readJsonFile()
    .then((jsonData) => {
      let item = jsonData.items.find(item => item.id === itemId);
      if (!item) {
        return res.status(404).send(`Gegenstand mit ID ${itemId} nicht gefunden`)
      } 
      else {
        res.status(200).send(item)
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Fehler beim Lesen der Datei')
    });
});

// Fügt einen Gegenstand hinzu
app.post('/api/items', (req, res) => {
  const item = req.body;
  jsonFile
    .readJsonFile()
    .then((jsonData) => {
      jsonData.items.push(item)
      return jsonFile.writeJsonFile(jsonData);
    })
    .then(() => {
    res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Gegenstand konnte nicht hinzugefügt werden");
    });
  });

// Ändert einen Gegenstand
app.put('/api/items/:id', (req, res) => {
  let itemId = req.params.id;
  let itemIndex = jsonData.items.findIndex(item => item.id === itemId);
  let updatedItem = req.body;
  if (itemIndex === -1) {
    res.status(404).send("Gegenstand nicht gefunden")
  }
  else {
    // Festlegen der ID auf bestehende ID, falls geändertes Objekt keine ID enthält.
    updatedItem.id = jsonData.items[itemIndex].id
    jsonData.items[itemIndex] = updatedItem;
    res.status(200).send(updatedItem);
  }
});

// Löscht einen Gegenstand
app.delete('/api/items/:id', (req, res) => {
  let itemId = req.params.id;
  let itemIndex = jsonData.items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    res.status(404).send("Gegenstand nicht gefunden");
  }
  else {
    jsonData.items.splice(itemIndex, 1);
    res.sendStatus(204);
  }
});

// Löscht ALLE Gegenstände!
app.delete('/api/items', (req, res) => {
  jsonData.items = [];
  res.status(204).send("All data deleted.")
});


/// Daten statisch
// const data = {
//   "items": [
//     {
//       "id": "1",
//       "name": "old shirt",
//       "reasonForRemoval": "outdated",
//       "photoUrl": "https://example.com/old-shirt.jpg",
//       "age": 5,
//       "comments": "",
//       "dateRemoved": "2022-01-01",
//       "removalMethod": "donated"
//     },
//     {
//       "id": "2",
//       "name": "broken lamp",
//       "reasonForRemoval": "broken",
//       "photoUrl": "https://example.com/broken-lamp.jpg",
//       "age": 2,
//       "comments": "",
//       "dateRemoved": "2022-02-01",
//       "removalMethod": "trashed"
//     },
//     {
//       "id": "3",
//       "name": "worn out shoes",
//       "reasonForRemoval": "worn out",
//       "photoUrl": "https://example.com/worn-out-shoes.jpg",
//       "age": 3,
//       "comments": "",
//       "dateRemoved": "2022-03-01",
//       "removalMethod": "donated"
//     },
//     {
//       "id": "4",
//       "name": "old phone",
//       "reasonForRemoval": "upgraded",
//       "photoUrl": "https://example.com/old-phone.jpg",
//       "age": 4,
//       "comments": "",
//       "dateRemoved": "2022-04-01",
//       "removalMethod": "recycled"
//     },
//     {
//       "id": "5",
//       "name": "outdated computer",
//       "reasonForRemoval": "outdated",
//       "photoUrl": "https://example.com/outdated-computer.jpg",
//       "age": 5,
//       "comments": "",
//       "dateRemoved": "2022-05-01",
//       "removalMethod": "sold"
//     }
//   ],
//   "highscore": [
//     {//macht so noch keinen Sinn
//       "month": "February",
//       "date": "2022-12-01",
//       "score": 100 
//     }
//   ]
// };