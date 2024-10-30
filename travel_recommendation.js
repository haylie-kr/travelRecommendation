const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchCondition() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let results = [];

        if (input.includes("beach")) {
          results = data.beaches;
        } else if (input.includes("temple")) {
          results = data.temples;
        } else if (input.includes("country")) {
          results = data.countries.flatMap(country => country.cities); // 각 나라의 도시 정보
        }

        if (results.length > 0) {
          results.forEach(item => {
            resultDiv.innerHTML += `
              <div class="result-item">
                <h2>${item.name}</h2>
                <img src="${item.imageUrl}" alt="${item.name}" width="150">
                <p>${item.description}</p>
              </div>
            `;
          });
        } else {
          resultDiv.innerHTML = 'No results found for the keyword.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

btnSearch.addEventListener('click', searchCondition);

btnClear.addEventListener('click', () => {
    document.getElementById('searchBar').value = '';
    document.getElementById('result').innerHTML = '';
});
