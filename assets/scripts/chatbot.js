document.getElementById('chat-widget').style.display = 'none';
document.getElementById('chat-button').style.display = 'block';

document.getElementById('chat-button').addEventListener('click', function () {
    var chatWidget = document.getElementById('chat-widget');
    var chatButton = document.getElementById('chat-button');
    if (chatWidget.style.display === 'none') {
        chatWidget.style.display = 'block';
        chatButton.style.display = 'none';
    } else {
        chatWidget.style.display = 'none';
    }
});


document.getElementById('close-button').addEventListener('click', function () {
    var chatWidget = document.getElementById('chat-widget');
    var chatButton = document.getElementById('chat-button');
    chatWidget.style.display = 'none';
    chatButton.style.display = 'block';
});

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('input-message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    var userMessage = document.getElementById('input-message').value;
    var wordCount = userMessage.split(' ').length;
    var randomNum = Math.floor(Math.random() * (wordCount * 2));
    var beansCount = (wordCount * 3) - randomNum;

    var beansVariations = [
        { word: 'beans', probability: 50 },
        { word: 'bean', probability: 20 },
        { word: 'beeeeean', probability: 10 },
        { word: 'bean bean', probability: 5 },
        { word: 'big-bean', probability: 2 },
        { word: 'little bean', probability: 3 },
        { word: 'kidney bean', probability: 0.001 },
        { word: 'beanification', probability: 0.1 },
        { word: 'BEAN', probability: 1 },
        { word: 'BEANS', probability: 0.6 },
        { word: 'super bean', probability: 0.3 },
        { word: 'bean explosion', probability: 0.05 },
        { word: 'mega bean', probability: 0.25 },
        { word: 'beanopolis', probability: 0.04 },
        { word: 'bean fest', probability: 0.18 },
        { word: 'bean bonanza', probability: 0.11 },
        { word: 'bean extravaganza', probability: 0.03 },
        { word: 'ultra bean', probability: 0.2 },
        { word: 'bean drugs', probability: 0.0003 },
        { word: '', probability: }
    ];
    

    var aiMessage = '';
    var commaPosition = beansCount > 4 && Math.random() < 0.5 ? Math.floor(Math.random() * beansCount) : -1; // 50% chance to add a comma
    for (var i = 0; i < beansCount; i++) {
        var randomBean = getRandomBean(beansVariations);
        aiMessage += (i === 0 ? randomBean.charAt(0).toUpperCase() + randomBean.slice(1) : randomBean) + (i === commaPosition ? ', ' : ' ');
    }

    var punctuation = [
        '.',
        '!',
        '?',
        '...',
        '.....',
        '!!!',
        ' 🫘',
        '??',
        '???',
        ' 𖠗',
        'T̴̟̺͓͓͗́̐ḩ̸̳̈́͗̑͌ę̵͉̹̼͐͑͒̊ ̴͔̟͆͑̌̓S̷̱̪̮̄̓͛̊e̵͚̱̽̔c̵̼͇̣͗͆̿̃r̸̦̈́̃̕͠e̸̲͕̪̜͛͘͘̕ẗ̵̻̦̠́ ̴̛̥̤̆i̶̹̋̆͠s̷̟̼̊̆̐͌ ̵͙̩̌̀ͅi̷̬̤̳͌͐̈́̋n̸̨͖̙͇͑̿̋̔ ̷̫̩̰̕̕͝t̶̢̕͠h̸̥̙̰̘̀e̸̪̊ ̴̧̥̬̘͘r̴̞̆̂i̴̘̺͑̄c̴͙̰̐̍̍̆'
    ];
    var randomPunctuation = punctuation[Math.floor(Math.random() * punctuation.length)];
    aiMessage = aiMessage.trim() + randomPunctuation;

    var messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += '<p>User: ' + userMessage + '</p>';

    document.getElementById('input-message').value = '';

    document.getElementById('typing').style.display = 'block';
    var randomDelay = Math.floor(Math.random() * 6) + 1;
    setTimeout(function () {
        document.getElementById('typing').style.display = 'none';
        messagesDiv.innerHTML += '<p>AI: ' + aiMessage + '</p>';
    }, randomDelay * 1000);
}

function getRandomBean(beansVariations) {
    var totalProbability = beansVariations.reduce((total, bean) => total + bean.probability, 0);
    var random = Math.random() * totalProbability;
    for (var i = 0; i < beansVariations.length; i++) {
        if (random < beansVariations[i].probability) {
            return beansVariations[i].word;
        }
        random -= beansVariations[i].probability;
    }
    return beansVariations[beansVariations.length - 1].word;
}