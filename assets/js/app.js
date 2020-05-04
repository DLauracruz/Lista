/*jshint esversion: 6 */

//variables

const listaTweets = document.getElementById('lista-tweets');


//Event Listeners
addEventListener();

function addEventListener() {
    //Cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);


    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}

//Añadir tweet del formulario
function agregarTweet(e) {

    e.preventDefault();

    //Leer el valor del textArea
    const tweet = document.getElementById('tweet').value;

    //Crear boton para eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //Crear elemento y añadir a la lista
    const li = document.createElement('li');
    li.innerText = tweet;

    //Añade el boton de borrar al tweet
    li.appendChild(botonBorrar);

    //Añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
}

//Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        alert('Pendiente eliminado');
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }
}

//Agrega tweet a LocalStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetLocalStorage();

    //Añadir el nuevo tweet
    tweets.push(tweet);

    //Convertir de String a Array para LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));


}

// Comprobar que exista elementos en LocalStorage, retorna un Array
function obtenerTweetLocalStorage() {
    let tweets;
    //Revisamos los valores de LS
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Mostrar datos de LocalStorage en la Lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function(tweet) {
        //Crear boton para eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear elemento y añadir a la lista
        const li = document.createElement('li');
        li.innerText = tweet;

        //Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);

        //Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

//Eliminar tweet de Local Storage
function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));

}