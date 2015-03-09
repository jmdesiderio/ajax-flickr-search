$(document).ready(function() {


 $('form').submit(function (evt) {
    evt.preventDefault();
    $('#photos').html("");
    var $searchField = $('#search');
    var $submitButton = $('#submit');
   
    $searchField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("Searching....");
    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var tag = $searchField.val();
    var flickrOptions = {
      tags: tag,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '';
      if (data.items.length === 0) {
        $(".heading").append('<br /><br /><h2>Sorry, there are no photos containing the "' + tag + '" tag.</h2>');
      } else {
        photoHTML = '<ul>';
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
        photoHTML += '</ul>'; 
      }
      
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready