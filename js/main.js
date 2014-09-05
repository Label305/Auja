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

$(document).ready(function() { 
    
    // Nav animation

   function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 100,
                header = document.querySelector("#navigation");
            if (distanceY > shrinkOn) {
                classie.add(header,"on-top");
            } else {
                if (classie.has(header,"on-top")) {
                    classie.remove(header,"on-top");
                }
            }
        });
    }

    // Minimized menu
    
    $('.menu-trigger').bind('click', function(){
        if ($('#navigation').hasClass('menu-open')) {
            $('#navMenuList').hide();
        } else {
            $('#navMenuList').fadeIn('fast');
        }
        $('#navigation').toggleClass('menu-open');
    });

    window.onload = init();
});


 