jQuery(document).ready(function($){
	if($('.banner').length){

		var $banner = $('.banner');
		var	bg = $banner.find('img').attr('src');
			$banner.css("background-image", "url('"+bg+"')");
	}
	if($('.main-slider').length){
		var $mainslider = $('.main-slider');
		$mainslider.slick({
			arrows:false
		})

		var $subslider = $('.sub-slider');

		$subslider.slick({
			infinite: true,
			slidesToShow: 3,
			asNavFor: '.main-slider',
			focusOnSelect: true,
			prevArrow:'<span class="arrow-left"></span>',
			nextArrow:'<span class="arrow-right"></span>'
		})
	}
	if($('.equals-slider').length){
		$('.equals-slider').slick({
			slidesToShow: 4,
			prevArrow:'<span class="arrow-left"></span>',
			nextArrow:'<span class="arrow-right"></span>',
			responsive:[
			{
				breakpoint:1300,
				settings:{
					slidesToShow:3
				}
			},
			{
				breakpoint:1045,
				settings:{
					slidesToShow:2
				}
			},
			{
				breakpoint:768,
				settings:{
					slidesToShow:1
				}
			}
			]
		})
	}
	$('.toggle-button').click(function(e){
		$(this).parent().find('.navbar').slideToggle();
	});
	jQuery.fn.valueCleaner = function () {
        var input = jQuery(this);
        input.each(function(){
        	var input = $(this);
        	input.focusin(function () {
	            var x = jQuery(this).attr('placeholder');
	            var z = jQuery(this).val();
	            if (x == z) {
	                input.val("");
	            }
	        })
	        input.focusout(function () {
	            var x = jQuery(this).attr("placeholder");
	            var z = jQuery(this).val();
	            if (jQuery(this).val() == "") {
	                input.val(x);
	            }
	        });
        })
        
    };
    $('.inp-text').valueCleaner();
    $('.inp-search').valueCleaner();
    $('.banner-inp').valueCleaner();
})