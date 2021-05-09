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
);


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

// {
//   "action": "addNote",
//   "version": 6,
//   "params": {
//       "note": {
//         "deckName": "Default",
//         "modelName": "Basic",
//         "fields": {
//             "Front": "front content",
//             "Back": "back content"
//         },
//         "tags": [
//             "yomichan"
//         ],
//         "audio": [{
//             "url": "https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=猫&kana=ねこ",
//             "filename": "yomichan_ねこ_猫.mp3",
//             "skipHash": "7e2c2f954ef6051373ba916f000168dc",
//             "fields": [
//      "Front"
//             ]
//         }],
//         "video": [{
//             "url": "https://cdn.videvo.net/videvo_files/video/free/2015-06/small_watermarked/Contador_Glam_preview.mp4",
//             "filename": "countdown.mp4",
//             "skipHash": "4117e8aab0d37534d9c8eac362388bbe",
//             "fields": [
//      "Back"
//             ]
//         }],
//         "picture": [{
//             "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg",
//             "filename": "black_cat.jpg",
//             "skipHash": "8d6e4646dfae812bf39651b59d7429ce",
//             "fields": [
//      "Back"
//             ]
//         }]
//     }
//   }
// }

// VS ADD NOTE
// await invoke('createDeck', {deck: 'test1'});
// const result = await invoke('deckNames', 6);
// console.log(`got list of decks: ${result}`);
