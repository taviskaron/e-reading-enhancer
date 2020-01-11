// ==UserScript==
// @name     E-Reading Enhancer
// @version  1.1
// @grant    none
// @include		 *://*e-reading*/bookreader.php* 
// @run-at document-end
// ==/UserScript==

// naming the main container and the header which for unknown reason is called 'footer' with an astonishing 'id=#bookfooterid' over there
		var bookContent = document.getElementById('bookcontent');
		var upperSelects = document.getElementById('bookfooterid');

// creating extra controls
		var fontSelect = document.createElement('div');
    fontSelect.innerHTML = '<select style="margin-right:5px;" id="fontss"><option disabled>Антиква</option><option value="PT Serif">PT Serif</option><option value="Lingua Franca">Lingua Franca</option><option value="Source Serif Pro">Source Serif Pro</option><option disabled>Гротеск</option><option value="PT Sans">PT Sans</option><option value="Source Sans Pro">Source Sans Pro</option><option value="Tahoma">Tahoma</option><option value="Open Sans">Open Sans</option></select>';

		var widthSelect = document.createElement('div');
    widthSelect.innerHTML = '<select style="margin-right:5px;" id="widths"><option disabled>Ширина</option><option value="960px">960px</option><option value="720px">720px</option><option value="640px">640px</option><option value="480px">480px</option></select>';
		
		var alignSelect = document.createElement('div');
    alignSelect.innerHTML = '<select style="margin-right:5px;" id="aligns"><option disabled>Выравнивание</option><option value="justify">По формату</option><option value="left">Левым флагом</option></select>';

// current alignment for further comparison (basically a flag). We set it to 'justify' to avoid unnecessary realignment in the first time
		var currentAlign = "justify";

		var applyBtn = document.createElement('div');
    applyBtn.innerHTML = '<a style="cursor:pointer; font-family:Tahoma, Verdana, sans-serif; font-size: 14px; background:cecece; border:1px gray solid; padding:3px; margin: 0 5px;" id="app">Применить</a>';

// placing the controls
    while (fontSelect.firstChild) {
      upperSelects.appendChild(fontSelect.firstChild);
      upperSelects.appendChild(widthSelect.firstChild);
      upperSelects.appendChild(alignSelect.firstChild);
      upperSelects.appendChild(applyBtn.firstChild);
    }

// naming the main Apply button
		var applyButton = document.getElementById('app');

// predefined container styling
		bookContent.style.margin = '0 auto';
		bookContent.style.width = '960px';

// the function recalculates the overall style except the one of text alignment
		function recalc() {		
      bookContent.style.width = document.getElementById('widths').value;
      bookContent.style.fontFamily = document.getElementById('fontss').value;
		}

// the function realigns paragraphs in the 'bookContent' container. We don't want to go through all the array of <p>s each time, so we compare the desired alignment with the previous one at first
    function realign() {
      var desiredAlign = document.getElementById('aligns').value;
      if ( desiredAlign !== currentAlign) {
        var paragraphs = document.getElementsByTagName('p');
          for (i=0; i<(paragraphs.length -1); i++) {
            paragraphs[i].style.textAlign = desiredAlign;
          }
        // now, as the loop's over, we're setting the 'flag' to our new - current - alignment
        currentAlign = desiredAlign;
      }
    }

// event handlers for both functions
		applyButton.addEventListener("click", recalc, false);
		applyButton.addEventListener("click", realign, false);


