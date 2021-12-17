var container = document.querySelector('.container');
var text = document.querySelector('#text');
var totalTime = 7500;
var breathTime = (totalTime / 5) * 2;
var holdTime = totalTime / 5;

breathing();
function breathing(){
    text.innerHTML = '<h2>Breath In!</h2>';
    container.className = 'container grow';
    setTimeout( () => {
      text.innerHTML = '<h2>Hold!</h2>';
      setTimeout( () => {
        text.innerHTML = '<h2>Breath Out!</h2>';
        container.className = 'container shrink';
      }, holdTime);
    }, breathTime);
}

setInterval(breathing, totalTime);