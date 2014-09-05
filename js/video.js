$(document).ready(function () {

    $("video").bind("mouseover", function () {
        

        this.play();
    
    }).bind("mouseout", function () {
        
        this.pause();
        this.currentTime = null;

    });
});