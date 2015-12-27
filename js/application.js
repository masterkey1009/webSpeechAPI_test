var recognition;
var nowRecognition = false;
var $finalSpan = document.querySelector('#final_span');
var $interimSpan = document.querySelector('#interim_span');

function start () {
	recognition = new webkitSpeechRecognition();
	//recognition.lang = document.querySelector('#select2').value;
	recognition.lang = 'ja-JP';
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = function (e) {
		var finalText = '';
		var interimText = '';
		for (var i = 0; i < e.results.length; i++) {
			if (e.results[i].isFinal) {
				finalText += e.results[i][0].transcript;
				console.log('音声入力結果は '  + finalText + ' です。');
			} else {
				interimText += e.results[i][0].transcript;
			}
		}
		$interimSpan.textContent = interimText;
		$finalSpan.textContent = finalText;
	};
	recognition.start();
	nowRecognition = true;
};

function stop () {
	recognition.stop();
	nowRecognition = false;
}

document.querySelector('#btn2').onclick = function () {
	if (nowRecognition) {
		stop();
		this.value = 'Continue Get Voice';
		this.className = 'btn btn-lg btn-primary';
	} else {
		start();
		this.value = 'Stop';
		this.className = 'btn btn-lg btn-primary';
	}
}
