var App = {};


App.init = function(){
  $(document).ready(function(){
    $('#form').on('submit', function(e){
      e.preventDefault();
      console.log($('#input-csv').val())
      App.send($('#input-csv').val());
    });
  });
}

// App.fetch = function(filename){
//   $.ajax({
//     url: '/csv',
//     method: 'GET',  
//     data: JSON.stringify(message),  
//     contentType: 'application/json',
//     success: function () {
//       console.log('successful');
//     },
//     error: function (err) {
//       console.error('failed');
//     }
//   });
// }

App.send = function(data){
  $.ajax({
    url: '/csv',
    method: 'POST',  
    data: data,  
    contentType: 'application/json',
    success: function () {
      console.log('successful');
    },
    error: function (err) {
      console.error('failed');
    }
  });
}

window.App = App;