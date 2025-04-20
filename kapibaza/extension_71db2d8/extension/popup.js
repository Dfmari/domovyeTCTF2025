document.addEventListener('DOMContentLoaded', function () {
  let noResultText = "No coupons were found.";
  
  chrome.storage.local.get('popupType', function(result) {
    let questionText = document.getElementById('question-text');
    let headerTitle = document.querySelector('h3');
    
    if (result.popupType === 'flags') {
       questionText.textContent = "Do you want to search for flags?";
       headerTitle.textContent = "🚩Flags Search";
       noResultText = "No flags were found.";
    } else {
       questionText.textContent = "Do you want to search for discount coupons?";
       headerTitle.textContent = "🏷️Delivery Coupons🔖";
    }
  });

  document.getElementById("yes-btn").addEventListener("click", () => {
    document.querySelector(".buttons").style.display = "none";
    document.getElementById("loader").style.display = "block";

    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("result").textContent = noResultText;
      document.getElementById("result").style.display = "block";
    }, 3000);
  });

  document.getElementById("no-btn").addEventListener("click", () => {
    window.close();
  });
});
