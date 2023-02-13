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
// Nutzung von bodyParser anweisen
app.use(bodyParser.json());

// Öffnet den Server für Anfragen auf Port 3000
app.listen(3000, () => {
  console.log('Server gestartet und lauscht auf Port 3000');
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
      const item = jsonData.items.find(item => item.id === itemId);
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
      res.status(500).send("Fehler beim Schreiben der Datei");
    });
  });

// Ändert einen Gegenstand
app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  jsonFile
    .readJsonFile()
    .then((jsonData) => {
      const itemIndex = jsonData.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        return res.status(404).send(`Gegenstand mit ID ${itemId} nicht gefunden`)
      }
      else {
        // Festlegen der ID auf bestehende ID, falls geändertes Objekt keine ID enthält.
        updatedItem.id = jsonData.items[itemIndex].id
        jsonData.items[itemIndex] = updatedItem;
        return jsonFile.writeJsonFile(jsonData);
      }
    })
    .then(() => {
      res.status(200).send(updatedItem);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Gegenstand mit ID ${itemId} konnte nicht in Datei geschrieben werden`);
    });
});


// Löscht einen Gegenstand
app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  jsonFile
    .readJsonFile()
    .then((jsonData) => {
      const itemIndex = jsonData.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        return res.status(404).send(`Gegenstand mit ID ${itemId} nicht gefunden`);
      }
      else {
        jsonData.items.splice(itemIndex, 1);
        return jsonFile.writeJsonFile(jsonData);
      }
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Fehler beim Schreiben der Datei`);
    });
});

// Löscht ALLE Gegenstände! 
app.delete('/api/items', (req, res) => {
  jsonFile
    .readJsonFile()
    .then((jsonData) => {
      jsonData.items = [];
      return jsonFile.writeJsonFile(jsonData);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Fehler beim Schreiben der Datei`);
    });
});