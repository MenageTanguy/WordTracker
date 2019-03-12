const app = document.getElementById('root-doc');

const container = document.createElement('div');
container.setAttribute('class', 'container-doc');

app.appendChild(container);

var urlParams = new URLSearchParams(location.search);
var searchText = urlParams.get('sch');

if (searchText) {
    searchText = searchText.trim();
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost//result.json', true);
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(result => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const h1 = document.createElement('h1');
                h1.textContent = result.name;

                const p = document.createElement('p');
                result.text = result.text.substring(0, 200);

                var textContent = '[...] ';

                if (countWords(searchText) > 1) {
                    var finalStr = result.text;
                    var stringToMatch = "[.!?\\-,;:_() ]" + searchText + "[.!?\\-,;:_() ]";
                    var regexp = RegExp(stringToMatch);
                    if (regexp.test(finalStr)) {
                        result.text.match(stringToMatch).forEach(function (words) {
                            finalStr = finalStr.replace(words, '<b>' + words + '</b>')
                        });
                        textContent = textContent.concat(finalStr)
                    } else {
                        textContent = textContent.concat(finalStr)
                    }
                } else {
                    result.text.split(" ").forEach(function (word) {
                        if (!ciEquals(searchText, word)) {
                            textContent += '<b>' + word + ' ' + '</b>';
                        } else {
                            textContent = textContent.concat(word, " ");
                        }
                    });
                }

                var refToFile = "http://localhost//docs//" + result.name;
                textContent = textContent.concat('[...] ', '<i>' + result.page + '/' + result.nbPage + ' </i>',
                "<a target=\"_blank\" href=\""+refToFile+"\"> voir plus <\a>");

                p.innerHTML = textContent;

//                p.textContent = `[...]${result.text}[...]`.concat(' ', result.page, '/', result.nbPage);

                container.appendChild(card);
                card.appendChild(h1);
                card.appendChild(p);

            });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}

function ciEquals(a, b) {
    a = a.replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
    b = b.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    return a.localeCompare(b, undefined, {sensitivity: 'base'});
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}