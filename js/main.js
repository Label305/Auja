/*   _            _          _ ____   ___  _____  
 *  | |          | |        | |___ \ / _ \| ____| 
 *  | |      __ _| |__   ___| | __) | | | | |__   
 *  | |     / _` | '_ \ / _ \ ||__ <|  -  |___ \  
 *  | |____| (_| | |_) |  __/ |___) |     |___) | 
 *  |______|\__,_|_.__/ \___|_|____/ \___/|____/  
 * 
 *  Copyright Label305 B.V. All rights reserved.
 * 
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT
 * WARRANTY OF ANY KIND. ONLY OUR CLIENTS FOR CUSTOM SOFTWARE 
 * ARE ENTITLED TO A LIMITED WARRANTY. SEE OUR OUR GENERAL 
 * TERMS AND CONDITIONS FOR MORE INFORMATION ON OUR WARRANTY. 
 */



$(window).scroll(function() {
    // Scale the header
    if ($(this).scrollTop() == 0) {
        $(document).stop().find('.minified').removeClass('minified');
    }

    if ($(this).scrollTop() > 40) {
        $("header.home").stop().addClass('minified');
    } else{
        $("header.home").stop().removeClass('minified');
    }
    if ($(this).scrollTop() > 100) {
        $("header.docs").stop().addClass('minified');
    } else{
        $("header.docs").stop().removeClass('minified');
    }
});


 