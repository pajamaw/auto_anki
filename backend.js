const ANKI_ADDRESS = 'http://127.0.0.1:8765';
const CURRENT_VERSION = '⁨2.1.37';

function invoke(action, version, params={}) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject('failed to issue request'));
      xhr.addEventListener('load', () => {
          try {
              const response = JSON.parse(xhr.responseText);
              if (Object.getOwnPropertyNames(response).length != 2) {
                  throw 'response has an unexpected number of fields';
              }
              if (!response.hasOwnProperty('error')) {
                  throw 'response is missing required error field';
              }
              if (!response.hasOwnProperty('result')) {
                  throw 'response is missing required result field';
              }
              if (response.error) {
                  throw response.error;
              }
              resolve(response.result);
          } catch (e) {
              reject(e);
          }
      });

      xhr.open('POST', ANKI_ADDRESS);
      xhr.send(JSON.stringify({action, CURRENT_VERSION, params}));
  });
}

function customInvoke(request) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject('failed to issue request'));
      xhr.addEventListener('load', () => {
          try {
              const response = JSON.parse(xhr.responseText);
              if (Object.getOwnPropertyNames(response).length != 2) {
                  throw 'response has an unexpected number of fields';
              }
              if (!response.hasOwnProperty('error')) {
                  throw 'response is missing required error field';
              }
              if (!response.hasOwnProperty('result')) {
                  throw 'response is missing required result field';
              }
              if (response.error) {
                  throw response.error;
              }
              resolve(response.result);
          } catch (e) {
              reject(e);
          }
      });

      xhr.open('POST', ANKI_ADDRESS);
      xhr.send(request);
  });
}

const createCard = (deckName = "Programming Interviews", modelName = "Basic", front, back, tags) => (
      {
          "deckName": deckName,
          "modelName": modelName,
          "fields": {
              "Front": front,
              "Back": back
          },
          "tags": tags,
      }
);

const addCards = (cards) => (
  let request = {
      "action": "addNotes",
      "version": CURRENT_VERSION,
      "params": {
        "notes": cards
      }
    }
  customInvoke(request);
)

async function convertTrilliumNotes() {
    return await api.runOnServer(async () => {
        // First we search for the notes
        let notes = await api.searchForNotes('#anki #!anki_complete');
        let completedCards = [];
        let errors = [];
        // Once we have the notes we get the individual attributes of the notes
        for (note in notes) {
            try {
                let content = await note.getContent();
                let tags = await note.getAttributes();
                let filteredTags = filterAttributes(tags);
                // We create the json for each note 
                let card = createCard('Programming Interviews', 'Basic', note.title, content, filteredTags);
                // Assuming it was created we add a new label to the note so it's not fetched in the future
                await note.addAttribute('label', 'anki_complete');
                // Then we add to completed deck
                completedCards << card;
            } catch (e) {
                errors << e;
            }
        }
        if (errors.length) api.log(errors);
        // Log the errors then add the cards to the deck
        return await addCards(completedCards);
    })
}

const filterAttributes = (tags) => (
    tags.map(tag => tag.name)
)
{"attributeId":"mrdlYB2MGByh","noteId":"fyA1a9M1b6XI","type":"label","name":"programming","value":"","position":10,"utcDateCreated":"2021-03-03 15:37:54.252Z","utcDateModified":"2021-03-03 15:37:54.253Z","isDeleted":false,"deleteId":null,"hash":"kVzQTORR1w","isInheritable":false}



  // {
//   "action": "addNotes",
//   "version": 6,
//   "params": {
//       "notes": [
//           {
//               "deckName": "Default",
//               "modelName": "Basic",
//               "fields": {
//                   "Front": "front content",
//                   "Back": "back content"
//               },
//               "tags": [
//                   "yomichan"
//               ],
//               "audio": [{
//                   "url": "https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=猫&kana=ねこ",
//                   "filename": "yomichan_ねこ_猫.mp3",
//                   "skipHash": "7e2c2f954ef6051373ba916f000168dc",
//                   "fields": [
//                       "Front"
//                   ]
//               }],
//               "video": [{
//                   "url": "https://cdn.videvo.net/videvo_files/video/free/2015-06/small_watermarked/Contador_Glam_preview.mp4",
//                   "filename": "countdown.mp4",
//                   "skipHash": "4117e8aab0d37534d9c8eac362388bbe",
//                   "fields": [
//                       "Back"
//                   ]
//               }],
//               "picture": [{
//                   "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg",
//                   "filename": "black_cat.jpg",
//                   "skipHash": "8d6e4646dfae812bf39651b59d7429ce",
//                   "fields": [
//                       "Back"
//                   ]
//               }]
//           }
//       ]
//   }
// }


// EXAMPLE OBJECT TO PASS FOR ADDING MULTIPLE NOTES

// {
//   "action": "addNotes",
//   "version": 6,
//   "params": {
//       "notes": [
//           {
//               "deckName": "Default",
//               "modelName": "Basic",
//               "fields": {
//                   "Front": "front content",
//                   "Back": "back content"
//               },
//               "tags": [
//                   "yomichan"
//               ],
//               "audio": [{
//                   "url": "https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=猫&kana=ねこ",
//                   "filename": "yomichan_ねこ_猫.mp3",
//                   "skipHash": "7e2c2f954ef6051373ba916f000168dc",
//                   "fields": [
//                       "Front"
//                   ]
//               }],
//               "video": [{
//                   "url": "https://cdn.videvo.net/videvo_files/video/free/2015-06/small_watermarked/Contador_Glam_preview.mp4",
//                   "filename": "countdown.mp4",
//                   "skipHash": "4117e8aab0d37534d9c8eac362388bbe",
//                   "fields": [
//                       "Back"
//                   ]
//               }],
//               "picture": [{
//                   "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg",
//                   "filename": "black_cat.jpg",
//                   "skipHash": "8d6e4646dfae812bf39651b59d7429ce",
//                   "fields": [
//                       "Back"
//                   ]
//               }]
//           }
//       ]
//   }
// }
