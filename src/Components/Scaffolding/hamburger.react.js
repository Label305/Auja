/**
 * @jsx React.DOM
 */
 define(['react', 'jquery'], function (React) {
    return React.createClass({
        render: function () {
            //Hamburger menu
            jQuery(function($){
              $( '.menu-trigger' ).click(function(){
                  $('.hamburger').toggleClass('expand')
              })
          });


            return (
                <div>
                <div className="menu-trigger">
                    <span></span>
                </div>

                <div class="hamburger">
                <ul>
                </ul>
                </div>

                </div>
                );

        }
    });

});
