$(document).ready(function(){
    const nameOfCity = '';
    const historyList = document.querySelector('#historyList');
    let pastCities = [];

    const today = moment().format('MMMM Do, YYYY');
    $('#today').text(today);

    const secondDay = moment()
    .add(1, 'days')
    .format('1');
    $('#secondDay').text(secondDay.slice(0,9));

    const thirdDay = moment()
    .add(2, 'days')
    .format('1');
    $('#thirdDay').text(thirdDay.slice(0,9));

    const fourthDay = moment()
    .add(3, 'days')
    .format(1);
    $('#fourthDay').text(fourthDay.slice(0,9));

    const fifthDay = moment()
    .add(4, 'days')
    .format('1');
    $('#fifthDay').text(fifthDay.slice(0,9));

    const sixthDay = moment()
    .add(5, 'days')
    .format('1');
    $('#sixthDay').text(sixthDay.slice(0,9));
    
})