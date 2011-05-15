(function($,window,undefined) {

/**
 * jQuery.fn.typMeasure(options);
 * 
 * A jQuery plugin to determine the lengths of each line in a block type element.
 * Good when you need to know the number of characters per line for readability 
 * and such topics alike.
 * 
 * Version 0.0.1 Alpha
 *
 * Comming:
 * -Better documentation
 * 
 * New features (possibly):
 * -Support for html elements in the target block type element (ie. the element with the text in).
 * 
 * by Hampus Nordin
 * http://hampusnordin.se/
 * http://github.com/hampusn/typoMeasure/
 */

$.fn.typoMeasure = function(options) {
	
	//Merge default values with passed values.
	var o = (typeof options !== 'undefined') ? $.extend({}, $.fn.typoMeasure.defaults, options) : $.extend({}, $.fn.typoMeasure.defaults);
	
	//The returned array
	var a = [];
	
	this.each(function(i, e) {
		var b = {};
		b.fullText = $(e).text();
		b.lines = [];
		
		var len = b.fullText.length - 1;
		var tempHeight = 0;
		for (var j = 0; j < len; j++) {	
			$(e).html(b.fullText.substring(0,j)+'<span class="'+o.measureClass+'">'+b.fullText.substring(j,j+3) +'</span>'+ b.fullText.substring(j+2));
			var tempHeight2 = $(e).find('span.'+o.measureClass).height();
			
			if (j != 0 && tempHeight2 > tempHeight) {
				var l1 = b.lines[b.lines.length-1];
				var l2 = {};
				
				var x = (l1) ? l1.endAt+1 : 0;
				
				l2.startAt = x;
				l2.endAt = j;
				l2.lineText = b.fullText.substring(x,j+1);
				l2.lineLength = l2.lineText.length;
				
				b.lines[b.lines.length] = l2;

			}
			tempHeight = tempHeight2;
			$(e).html(b.fullText);
		}
		
		if (b.lines.length === 0)
			b.lines[0] = {"startAt": 0, "endAt": b.fullText.length-1,"lineText": b.fullText, "lineLength": b.fullText.length};
		
		b.avgMeasure = b.fullText.length / b.lines.length;
		
		////////////////////
		a[a.length] = b;
		$(e).data(o.dataKey, b);
	});
	
	if (o.returnData === false)
		return this;
	
	return (o.arrayFix === true && a.length === 1) ? a[0] : a;
};

//Default values for the function call.
$.fn.typoMeasure.defaults = {
		
	//Key to store the data on the object with.
	dataKey: 'typoMeasureData',
	
	//Classname to add the span element which is used for detecting the line breaks.
	measureClass: 'typoMeasure',
	
	//This will return the actual object instead of an array, if there is only one object in the array.
	arrayFix: true,
	
	//Return as data to assign to a variable. Pass FALSE if you want 'jquery-chainability'.
	returnData: true
};

})(jQuery,this);