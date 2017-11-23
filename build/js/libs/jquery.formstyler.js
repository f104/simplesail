/*
 * jQuery Form Styler v2.0.2
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2017 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2017.10.22
 *
 */

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory($ || require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

	'use strict';

	var pluginName = 'styler',
			defaults = {
				idSuffix: '-styler',
				filePlaceholder: 'Файл не выбран',
				fileBrowse: 'Обзор...',
				fileNumber: 'Выбрано файлов: %s',
				selectPlaceholder: 'Выберите...',
				selectSearch: false,
				selectSearchLimit: 10,
				selectSearchNotFound: 'Совпадений не найдено',
				selectSearchPlaceholder: 'Поиск...',
				selectVisibleOptions: 0,
				selectSmartPositioning: true,
				locale: 'ru',
				locales: {
					'en': {
						filePlaceholder: 'No file selected',
						fileBrowse: 'Browse...',
						fileNumber: 'Selected files: %s',
						selectPlaceholder: 'Select...',
						selectSearchNotFound: 'No matches found',
						selectSearchPlaceholder: 'Search...'
					}
				},
				onSelectOpened: function() {},
				onSelectClosed: function() {},
				onFormStyled: function() {}
			};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		var locale = this.options.locale;
		if (this.options.locales[locale] !== undefined) {
			$.extend(this.options, this.options.locales[locale]);
		}
		this.init();
	}

	Plugin.prototype = {

		// инициализация
		init: function() {

			var el = $(this.element);
			var opt = this.options;

			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

			function Attributes() {
				if (el.attr('id') !== undefined && el.attr('id') !== '') {
					this.id = el.attr('id') + opt.idSuffix;
				}
				this.title = el.attr('title');
				this.classes = el.attr('class');
				this.data = el.data();
			}

			// checkbox
			if (el.is(':checkbox')) {

				var checkboxOutput = function() {

					var att = new Attributes();
					var checkbox = $('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(checkbox).prependTo(checkbox);
					if (el.is(':checked')) checkbox.addClass('checked');
					if (el.is(':disabled')) checkbox.addClass('disabled');

					// клик на псевдочекбокс
					checkbox.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!checkbox.is('.disabled')) {
							if (el.is(':checked')) {
								el.prop('checked', false);
								checkbox.removeClass('checked');
							} else {
								el.prop('checked', true);
								checkbox.addClass('checked');
							}
							el.focus().change();
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(checkbox).length) {
							checkbox.triggerHandler('click');
							e.preventDefault();
						}
					});
					// переключение по Space или Enter
					el.on('change.styler', function() {
						if (el.is(':checked')) checkbox.addClass('checked');
						else checkbox.removeClass('checked');
					})
					// чтобы переключался чекбокс, который находится в теге label
					.on('keydown.styler', function(e) {
						if (e.which == 32) checkbox.click();
					})
					.on('focus.styler', function() {
						if (!checkbox.is('.disabled')) checkbox.addClass('focused');
					})
					.on('blur.styler', function() {
						checkbox.removeClass('focused');
					});

				}; // end checkboxOutput()

				checkboxOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					checkboxOutput();
				});

			// end checkbox

			// radio
			} else if (el.is(':radio')) {

				var radioOutput = function() {

					var att = new Attributes();
					var radio = $('<div class="jq-radio"><div class="jq-radio__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(radio).prependTo(radio);
					if (el.is(':checked')) radio.addClass('checked');
					if (el.is(':disabled')) radio.addClass('disabled');

					// определяем общего родителя у радиокнопок с одинаковым name
					// http://stackoverflow.com/a/27733847
					$.fn.commonParents = function() {
						var cachedThis = this;
						return cachedThis.first().parents().filter(function() {
							return $(this).find(cachedThis).length === cachedThis.length;
						});
					};
					$.fn.commonParent = function() {
						return $(this).commonParents().first();
					};

					// клик на псевдорадиокнопке
					radio.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!radio.is('.disabled')) {
							var inputName = $('input[name="' + el.attr('name') + '"]');
							inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass('checked');
							el.prop('checked', true).parent().addClass('checked');
							el.focus().change();
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(radio).length) {
							radio.triggerHandler('click');
							e.preventDefault();
						}
					});
					// переключение стрелками
					el.on('change.styler', function() {
						el.parent().addClass('checked');
					})
					.on('focus.styler', function() {
						if (!radio.is('.disabled')) radio.addClass('focused');
					})
					.on('blur.styler', function() {
						radio.removeClass('focused');
					});

				}; // end radioOutput()

				radioOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					radioOutput();
				});

			// end radio

			// file
			} else if (el.is(':file')) {

				var fileOutput = function() {

					var att = new Attributes();
					var placeholder = el.data('placeholder');
					if (placeholder === undefined) placeholder = opt.filePlaceholder;
					var browse = el.data('browse');
					if (browse === undefined || browse === '') browse = opt.fileBrowse;

					var file =
						$('<div class="jq-file">' +
								'<div class="jq-file__name">' + placeholder + '</div>' +
								'<div class="jq-file__browse">' + browse + '</div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(file).appendTo(file);
					if (el.is(':disabled')) file.addClass('disabled');

					var value = el.val();
					var name = $('div.jq-file__name', file);

					// чтобы при динамическом изменении имя файла не сбрасывалось
					if (value) name.text(value.replace(/.+[\\\/]/, ''));

					el.on('change.styler', function() {
						var value = el.val();
						if (el.is('[multiple]')) {
							value = '';
							var files = el[0].files.length;
							if (files > 0) {
								var number = el.data('number');
								if (number === undefined) number = opt.fileNumber;
								number = number.replace('%s', files);
								value = number;
							}
						}
						name.text(value.replace(/.+[\\\/]/, ''));
						if (value === '') {
							name.text(placeholder);
							file.removeClass('changed');
						} else {
							file.addClass('changed');
						}
					})
					.on('focus.styler', function() {
						file.addClass('focused');
					})
					.on('blur.styler', function() {
						file.removeClass('focused');
					})
					.on('click.styler', function() {
						file.removeClass('focused');
					});

				}; // end fileOutput()

				fileOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					fileOutput();
				});

			// end file

			// number
			} else if (el.is('input[type="number"]')) {

				var numberOutput = function() {

					var att = new Attributes();
					var number =
						$('<div class="jq-number">' +
								'<div class="jq-number__spin minus"></div>' +
								'<div class="jq-number__spin plus"></div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');
					if (el.is(':disabled')) number.addClass('disabled');

					var min,
							max,
							step,
							timeout = null,
							interval = null;
					if (el.attr('min') !== undefined) min = el.attr('min');
					if (el.attr('max') !== undefined) max = el.attr('max');
					if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
						step = Number(el.attr('step'));
					else
						step = Number(1);

					var changeValue = function(spin) {
						var value = el.val(),
								newValue;

						if (!$.isNumeric(value)) {
							value = 0;
							el.val('0');
						}

						if (spin.is('.minus')) {
							newValue = Number(value) - step;
						} else if (spin.is('.plus')) {
							newValue = Number(value) + step;
						}

						// определяем количество десятичных знаков после запятой в step
						var decimals = (step.toString().split('.')[1] || []).length;
						if (decimals > 0) {
							var multiplier = '1';
							while (multiplier.length <= decimals) multiplier = multiplier + '0';
							// избегаем появления лишних знаков после запятой
							newValue = Math.round(newValue * multiplier) / multiplier;
						}

						if ($.isNumeric(min) && $.isNumeric(max)) {
							if (newValue >= min && newValue <= max) el.val(newValue);
						} else if ($.isNumeric(min) && !$.isNumeric(max)) {
							if (newValue >= min) el.val(newValue);
						} else if (!$.isNumeric(min) && $.isNumeric(max)) {
							if (newValue <= max) el.val(newValue);
						} else {
							el.val(newValue);
						}
					};

					if (!number.is('.disabled')) {
						number.on('mousedown', 'div.jq-number__spin', function() {
							var spin = $(this);
							changeValue(spin);
							timeout = setTimeout(function(){
								interval = setInterval(function(){ changeValue(spin); }, 40);
							}, 350);
						}).on('mouseup mouseout', 'div.jq-number__spin', function() {
							clearTimeout(timeout);
							clearInterval(interval);
						}).on('mouseup', 'div.jq-number__spin', function() {
							el.change().trigger('input');
						});
						el.on('focus.styler', function() {
							number.addClass('focused');
						})
						.on('blur.styler', function() {
							number.removeClass('focused');
						});
					}

				}; // end numberOutput()

				numberOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').closest('.jq-number').before(el).remove();
					numberOutput();
				});

			// end number

			// select
			} else if (el.is('select')) {

				var selectboxOutput = function() {

					// запрещаем прокрутку страницы при прокрутке селекта
					function preventScrolling(selector) {
                                            
                                            return;

						var scrollDiff = selector.prop('scrollHeight') - selector.outerHeight(),
								wheelDelta = null,
								scrollTop = null;

						selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {

							/**
							 * нормализация направления прокрутки
							 * (firefox < 0 || chrome etc... > 0)
							 * (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)
							 */
							wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1; // направление прокрутки (-1 вниз, 1 вверх)
							scrollTop = selector.scrollTop(); // позиция скролла

							if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
								e.stopPropagation();
								e.preventDefault();
							}

						});
					}

					var option = $('option', el);
					var list = '';
					// формируем список селекта
					function makeList() {
						for (var i = 0; i < option.length; i++) {
							var op = option.eq(i);
							var li = '',
									liClass = '',
									liClasses = '',
									id = '',
									title = '',
									dataList = '',
									optionClass = '',
									optgroupClass = '',
									dataJqfsClass = '';
							var disabled = 'disabled';
							var selDis = 'selected sel disabled';
							if (op.prop('selected')) liClass = 'selected sel';
							if (op.is(':disabled')) liClass = disabled;
							if (op.is(':selected:disabled')) liClass = selDis;
							if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
							if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
							if (op.attr('class') !== undefined) {
								optionClass = ' ' + op.attr('class');
								dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
							}

							var data = op.data();
							for (var k in data) {
								if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
							}

							if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
							li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';

							// если есть optgroup
							if (op.parent().is('optgroup')) {
								if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
								li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
								if (op.is(':first-child')) {
									li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
								}
							}

							list += li;
						}
					} // end makeList()

					// одиночный селект
					function doSelect() {

						var att = new Attributes();
						var searchHTML = '';
						var selectPlaceholder = el.data('placeholder');
						var selectSearch = el.data('search');
						var selectSearchLimit = el.data('search-limit');
						var selectSearchNotFound = el.data('search-not-found');
						var selectSearchPlaceholder = el.data('search-placeholder');
						var selectSmartPositioning = el.data('smart-positioning');

						if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
						if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
						if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
						if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
						if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
						if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

						var selectbox =
							$('<div class="jq-selectbox jqselect">' +
									'<div class="jq-selectbox__select">' +
										'<div class="jq-selectbox__select-text"></div>' +
										'<div class="jq-selectbox__trigger">' +
											'<div class="jq-selectbox__trigger-arrow"></div></div>' +
									'</div>' +
								'</div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data)
						;

						el.after(selectbox).prependTo(selectbox);

						var selectzIndex = selectbox.css('z-index');
						selectzIndex = (selectzIndex > 0 ) ? selectzIndex : 1;
						var divSelect = $('div.jq-selectbox__select', selectbox);
						var divText = $('div.jq-selectbox__select-text', selectbox);
						var optionSelected = option.filter(':selected');

						makeList();

						if (selectSearch) searchHTML =
							'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
							'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
						var dropdown =
							$('<div class="jq-selectbox__dropdown">' +
									searchHTML + '<ul>' + list + '</ul>' +
								'</div>');
						selectbox.append(dropdown);
						var ul = $('ul', dropdown);
						var li = $('li', dropdown);
						var search = $('input', dropdown);
						var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
						if (li.length < selectSearchLimit) search.parent().hide();

						// показываем опцию по умолчанию
						// если у 1-й опции нет текста, она выбрана по умолчанию и параметр selectPlaceholder не false, то показываем плейсхолдер
						if (option.first().text() === '' && option.first().is(':selected') && selectPlaceholder !== false) {
							divText.text(selectPlaceholder).addClass('placeholder');
						} else {
							divText.text(optionSelected.text());
						}

						// определяем самый широкий пункт селекта
						var liWidthInner = 0,
								liWidth = 0;
						li.css({'display': 'inline-block'});
						li.each(function() {
							var l = $(this);
							if (l.innerWidth() > liWidthInner) {
								liWidthInner = l.innerWidth();
								liWidth = l.width();
							}
						});
						li.css({'display': ''});

						// подстраиваем ширину свернутого селекта в зависимости
						// от ширины плейсхолдера или самого широкого пункта
						if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
							divText.width(divText.width());
						} else {
							var selClone = selectbox.clone().appendTo('body').width('auto');
							var selCloneWidth = selClone.outerWidth();
							selClone.remove();
							if (selCloneWidth == selectbox.outerWidth()) {
								divText.width(liWidth);
							}
						}

						// подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
						if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

						// прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
						// если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
						if (option.first().text() === '' && el.data('placeholder') !== '') {
							li.first().hide();
						}

						var selectHeight = selectbox.outerHeight(true);
						var searchHeight = search.parent().outerHeight(true) || 0;
						var isMaxHeight = ul.css('max-height');
						var liSelected = li.filter('.selected');
						if (liSelected.length < 1) li.first().addClass('selected sel');
						if (li.data('li-height') === undefined) {
							var liOuterHeight = li.outerHeight();
							if (selectPlaceholder !== false) liOuterHeight = li.eq(1).outerHeight();
							li.data('li-height', liOuterHeight);
						}
						var position = dropdown.css('top');
						if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
						if (dropdown.css('top') == 'auto') {
							dropdown.css({top: selectHeight});
							position = selectHeight;
						}
						dropdown.hide();

						// если выбран не дефолтный пункт
						if (liSelected.length) {
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != optionSelected.text()) {
								selectbox.addClass('changed');
							}
							// передаем селекту класс выбранного пункта
							selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
							selectbox.addClass(liSelected.data('jqfs-class'));
						}

						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							return false;
						}

						// при клике на псевдоселекте
						divSelect.click(function() {

							// колбек при закрытии селекта
							if ($('div.jq-selectbox').filter('.opened').length) {
								opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
							}

							el.focus();

							// если iOS, то не показываем выпадающий список,
							// т.к. отображается нативный и неизвестно, как его спрятать
							if (iOS) return;

							// умное позиционирование
							var win = $(window);
							var liHeight = li.data('li-height');
							var topOffset = selectbox.offset().top;
							var bottomOffset = window.innerHeight - selectHeight - (topOffset - win.scrollTop());
							var visible = el.data('visible-options');
							if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
							var minHeight = liHeight * 5;
							var newHeight = liHeight * visible;
							if (visible > 0 && visible < 6) minHeight = newHeight;
							if (visible === 0) newHeight = 'auto';

							var dropDown = function() {
								dropdown.height('auto').css({bottom: 'auto', top: position});
								var maxHeightBottom = function() {
									ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightBottom();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if (bottomOffset < (dropdown.outerHeight() + 20)) {
									maxHeightBottom();
								}
							};

							var dropUp = function() {
								dropdown.height('auto').css({top: 'auto', bottom: position});
								var maxHeightTop = function() {
									ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightTop();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
									maxHeightTop();
								}
							};

							if (selectSmartPositioning === true || selectSmartPositioning === 1) {
//                                                            console.log([bottomOffset,minHeight,searchHeight]);
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								// раскрытие вверх
								} else {
									dropUp();
									selectbox.removeClass('dropdown').addClass('dropup');
								}
							} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								}
							} else {
								// если умное позиционирование отключено
								dropdown.height('auto').css({bottom: 'auto', top: position});
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
							}

							// если выпадающий список выходит за правый край окна браузера,
							// то меняем позиционирование с левого на правое
							if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
								dropdown.css({left: 'auto', right: 0});
							}
							// конец умного позиционирования

							$('div.jqselect').css({zIndex: (selectzIndex - 1)}).removeClass('opened');
							selectbox.css({zIndex: selectzIndex});
							if (dropdown.is(':hidden')) {
								$('div.jq-selectbox__dropdown:visible').hide();
								dropdown.show();
								selectbox.addClass('opened focused');
								// колбек при открытии селекта
								opt.onSelectOpened.call(selectbox);
							} else {
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								if ($('div.jq-selectbox').filter('.opened').length) {
									opt.onSelectClosed.call(selectbox);
								}
							}

							// поисковое поле
							if (search.length) {
								search.val('').keyup();
								notFound.hide();
								search.keyup(function() {
									var query = $(this).val();
									li.each(function() {
										if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
											$(this).hide();
										} else {
											$(this).show();
										}
									});
									// прячем 1-ю пустую опцию
									if (option.first().text() === '' && el.data('placeholder') !== '') {
										li.first().hide();
									}
									if (li.filter(':visible').length < 1) {
										notFound.show();
									} else {
										notFound.hide();
									}
								});
							}

							// прокручиваем до выбранного пункта при открытии списка
							if (li.filter('.selected').length) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									// если нечетное количество видимых пунктов,
									// то высоту пункта делим пополам для последующего расчета
									if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
								}
							}

							preventScrolling(ul);

						}); // end divSelect.click()

						// при наведении курсора на пункт списка
						li.hover(function() {
							$(this).siblings().removeClass('selected');
						});
						var selectedText = li.filter('.selected').text();

						// при клике на пункт списка
						li.filter(':not(.disabled):not(.optgroup)').click(function() {
							el.focus();
							var t = $(this);
							var liText = t.text();
							if (!t.is('.selected')) {
								var index = t.index();
								index -= t.prevAll('.optgroup').length;
								t.addClass('selected sel').siblings().removeClass('selected sel');
								option.prop('selected', false).eq(index).prop('selected', true);
								selectedText = liText;
								divText.text(liText);

								// передаем селекту класс выбранного пункта
								if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
								selectbox.data('jqfs-class', t.data('jqfs-class'));
								selectbox.addClass(t.data('jqfs-class'));

								el.change();
							}
							dropdown.hide();
							selectbox.removeClass('opened dropup dropdown');
							// колбек при закрытии селекта
							opt.onSelectClosed.call(selectbox);

						});
						dropdown.mouseout(function() {
							$('li.sel', dropdown).addClass('selected');
						});

						// изменение селекта
						el.on('change.styler', function() {
							divText.text(option.filter(':selected').text()).removeClass('placeholder');
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != li.filter('.selected').text()) {
								selectbox.addClass('changed');
							} else {
								selectbox.removeClass('changed');
							}
						})
						.on('focus.styler', function() {
							selectbox.addClass('focused');
							$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
						})
						.on('blur.styler', function() {
							selectbox.removeClass('focused');
						})
						// изменение селекта с клавиатуры
						.on('keydown.styler keyup.styler', function(e) {
							var liHeight = li.data('li-height');
							if (el.val() === '') {
								divText.text(selectPlaceholder).addClass('placeholder');
							} else {
								divText.text(option.filter(':selected').text());
							}
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// вверх, влево, Page Up, Home
							if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
								}
							}
							// вниз, вправо, Page Down, End
							if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
							}
							// закрываем выпадающий список при нажатии Enter
							if (e.which == 13) {
								e.preventDefault();
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								opt.onSelectClosed.call(selectbox);
							}
						}).on('keydown.styler', function(e) {
							// открываем выпадающий список при нажатии Space
							if (e.which == 32) {
								e.preventDefault();
								divSelect.click();
							}
						});

						// прячем выпадающий список при клике за пределами селекта
						if (!onDocumentClick.registered) {
							$(document).on('click', onDocumentClick);
							onDocumentClick.registered = true;
						}

					} // end doSelect()

					// мультиселект
					function doMultipleSelect() {

						var att = new Attributes();
						var selectbox =
							$('<div class="jq-select-multiple jqselect"></div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data)
						;

						el.after(selectbox);

						makeList();
						selectbox.append('<ul>' + list + '</ul>');
						var ul = $('ul', selectbox);
						var li = $('li', selectbox);
						var size = el.attr('size');
						var ulHeight = ul.outerHeight();
						var liHeight = li.outerHeight();
						if (size !== undefined && size > 0) {
							ul.css({'height': liHeight * size});
						} else {
							ul.css({'height': liHeight * 4});
						}
						if (ulHeight > selectbox.height()) {
							ul.css('overflowY', 'scroll');
							preventScrolling(ul);
							// прокручиваем до выбранного пункта
							if (li.filter('.selected').length) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
							}
						}

						// прячем оригинальный селект
						el.prependTo(selectbox);

						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							option.each(function() {
								if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
							});

						// если селект активный
						} else {

							// при клике на пункт списка
							li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
								el.focus();
								var clkd = $(this);
								if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
								if(!e.shiftKey) clkd.addClass('first');
								if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

								// выделение пунктов при зажатом Ctrl
								if(e.ctrlKey || e.metaKey) {
									if (clkd.is('.selected')) clkd.removeClass('selected first');
										else clkd.addClass('selected first');
									clkd.siblings().removeClass('first');
								}

								// выделение пунктов при зажатом Shift
								if(e.shiftKey) {
									var prev = false,
											next = false;
									clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
									clkd.prevAll().each(function() {
										if ($(this).is('.first')) prev = true;
									});
									clkd.nextAll().each(function() {
										if ($(this).is('.first')) next = true;
									});
									if (prev) {
										clkd.prevAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (next) {
										clkd.nextAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (li.filter('.selected').length == 1) clkd.addClass('first');
								}

								// отмечаем выбранные мышью
								option.prop('selected', false);
								li.filter('.selected').each(function() {
									var t = $(this);
									var index = t.index();
									if (t.is('.option')) index -= t.prevAll('.optgroup').length;
									option.eq(index).prop('selected', true);
								});
								el.change();

							});

							// отмечаем выбранные с клавиатуры
							option.each(function(i) {
								$(this).data('optionIndex', i);
							});
							el.on('change.styler', function() {
								li.removeClass('selected');
								var arrIndexes = [];
								option.filter(':selected').each(function() {
									arrIndexes.push($(this).data('optionIndex'));
								});
								li.not('.optgroup').filter(function(i) {
									return $.inArray(i, arrIndexes) > -1;
								}).addClass('selected');
							})
							.on('focus.styler', function() {
								selectbox.addClass('focused');
							})
							.on('blur.styler', function() {
								selectbox.removeClass('focused');
							});

							// прокручиваем с клавиатуры
							if (ulHeight > selectbox.height()) {
								el.on('keydown.styler', function(e) {
									// вверх, влево, PageUp
									if (e.which == 38 || e.which == 37 || e.which == 33) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
									}
									// вниз, вправо, PageDown
									if (e.which == 40 || e.which == 39 || e.which == 34) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
									}
								});
							}

						}
					} // end doMultipleSelect()

					if (el.is('[multiple]')) {

						// если Android или iOS, то мультиселект не стилизуем
						// причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
						// причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
						if (Android || iOS) return;

						doMultipleSelect();
					} else {
						doSelect();
					}

				}; // end selectboxOutput()

				selectboxOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					selectboxOutput();
				});

			// end select

			// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest('form').find('input, select').trigger('refresh');
					}, 1);
				});
			} // end reset

		}, // init: function()

		// деструктор
		destroy: function() {

			var el = $(this.element);

			if (el.is(':checkbox') || el.is(':radio')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
				el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
			} else if (el.is('input[type="number"]')) {
				el.removeData('_' + pluginName).off('.styler refresh').closest('.jq-number').before(el).remove();
			} else if (el.is(':file') || el.is('select')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
			}

		} // destroy: function()

	}; // Plugin.prototype

	$.fn[pluginName] = function(options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			this.each(function() {
				if (!$.data(this, '_' + pluginName)) {
					$.data(this, '_' + pluginName, new Plugin(this, options));
				}
			})
			// колбек после выполнения плагина
			.promise()
			.done(function() {
				var opt = $(this[0]).data('_' + pluginName);
				if (opt) opt.options.onFormStyled.call();
			});
			return this;
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function() {
				var instance = $.data(this, '_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return returns !== undefined ? returns : this;
		}
	};

	// прячем выпадающий список при клике за пределами селекта
	function onDocumentClick(e) {
		// e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
		// (при изменении селекта с клавиатуры срабатывает событие onclick)
		if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
			if ($('div.jq-selectbox.opened').length) {
				var selectbox = $('div.jq-selectbox.opened'),
						search = $('div.jq-selectbox__search input', selectbox),
						dropdown = $('div.jq-selectbox__dropdown', selectbox),
						opt = selectbox.find('select').data('_' + pluginName).options;

				// колбек при закрытии селекта
				opt.onSelectClosed.call(selectbox);

				if (search.length) search.val('').keyup();
				dropdown.hide().find('li.sel').addClass('selected');
				selectbox.removeClass('focused opened dropup dropdown');
			}
		}
	}
	onDocumentClick.registered = false;

}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWJzL2pxdWVyeS5mb3Jtc3R5bGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIGpRdWVyeSBGb3JtIFN0eWxlciB2Mi4wLjJcclxuICogaHR0cHM6Ly9naXRodWIuY29tL0RpbW94L2pRdWVyeUZvcm1TdHlsZXJcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTItMjAxNyBEaW1veCAoaHR0cDovL2RpbW94Lm5hbWUvKVxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqXHJcbiAqIERhdGU6IDIwMTcuMTAuMjJcclxuICpcclxuICovXHJcblxyXG47KGZ1bmN0aW9uKGZhY3RvcnkpIHtcclxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcblx0XHQvLyBBTURcclxuXHRcdGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG5cdFx0Ly8gQ29tbW9uSlNcclxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgkIHx8IHJlcXVpcmUoJ2pxdWVyeScpKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZmFjdG9yeShqUXVlcnkpO1xyXG5cdH1cclxufShmdW5jdGlvbigkKSB7XHJcblxyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0dmFyIHBsdWdpbk5hbWUgPSAnc3R5bGVyJyxcclxuXHRcdFx0ZGVmYXVsdHMgPSB7XHJcblx0XHRcdFx0aWRTdWZmaXg6ICctc3R5bGVyJyxcclxuXHRcdFx0XHRmaWxlUGxhY2Vob2xkZXI6ICfQpNCw0LnQuyDQvdC1INCy0YvQsdGA0LDQvScsXHJcblx0XHRcdFx0ZmlsZUJyb3dzZTogJ9Ce0LHQt9C+0YAuLi4nLFxyXG5cdFx0XHRcdGZpbGVOdW1iZXI6ICfQktGL0LHRgNCw0L3QviDRhNCw0LnQu9C+0LI6ICVzJyxcclxuXHRcdFx0XHRzZWxlY3RQbGFjZWhvbGRlcjogJ9CS0YvQsdC10YDQuNGC0LUuLi4nLFxyXG5cdFx0XHRcdHNlbGVjdFNlYXJjaDogZmFsc2UsXHJcblx0XHRcdFx0c2VsZWN0U2VhcmNoTGltaXQ6IDEwLFxyXG5cdFx0XHRcdHNlbGVjdFNlYXJjaE5vdEZvdW5kOiAn0KHQvtCy0L/QsNC00LXQvdC40Lkg0L3QtSDQvdCw0LnQtNC10L3QvicsXHJcblx0XHRcdFx0c2VsZWN0U2VhcmNoUGxhY2Vob2xkZXI6ICfQn9C+0LjRgdC6Li4uJyxcclxuXHRcdFx0XHRzZWxlY3RWaXNpYmxlT3B0aW9uczogMCxcclxuXHRcdFx0XHRzZWxlY3RTbWFydFBvc2l0aW9uaW5nOiB0cnVlLFxyXG5cdFx0XHRcdGxvY2FsZTogJ3J1JyxcclxuXHRcdFx0XHRsb2NhbGVzOiB7XHJcblx0XHRcdFx0XHQnZW4nOiB7XHJcblx0XHRcdFx0XHRcdGZpbGVQbGFjZWhvbGRlcjogJ05vIGZpbGUgc2VsZWN0ZWQnLFxyXG5cdFx0XHRcdFx0XHRmaWxlQnJvd3NlOiAnQnJvd3NlLi4uJyxcclxuXHRcdFx0XHRcdFx0ZmlsZU51bWJlcjogJ1NlbGVjdGVkIGZpbGVzOiAlcycsXHJcblx0XHRcdFx0XHRcdHNlbGVjdFBsYWNlaG9sZGVyOiAnU2VsZWN0Li4uJyxcclxuXHRcdFx0XHRcdFx0c2VsZWN0U2VhcmNoTm90Rm91bmQ6ICdObyBtYXRjaGVzIGZvdW5kJyxcclxuXHRcdFx0XHRcdFx0c2VsZWN0U2VhcmNoUGxhY2Vob2xkZXI6ICdTZWFyY2guLi4nXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRvblNlbGVjdE9wZW5lZDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvblNlbGVjdENsb3NlZDogZnVuY3Rpb24oKSB7fSxcclxuXHRcdFx0XHRvbkZvcm1TdHlsZWQ6IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0fTtcclxuXHJcblx0ZnVuY3Rpb24gUGx1Z2luKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblx0XHR0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cdFx0dmFyIGxvY2FsZSA9IHRoaXMub3B0aW9ucy5sb2NhbGU7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmxvY2FsZXNbbG9jYWxlXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdCQuZXh0ZW5kKHRoaXMub3B0aW9ucywgdGhpcy5vcHRpb25zLmxvY2FsZXNbbG9jYWxlXSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdFBsdWdpbi5wcm90b3R5cGUgPSB7XHJcblxyXG5cdFx0Ly8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyIGVsID0gJCh0aGlzLmVsZW1lbnQpO1xyXG5cdFx0XHR2YXIgb3B0ID0gdGhpcy5vcHRpb25zO1xyXG5cclxuXHRcdFx0dmFyIGlPUyA9IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCkvaSkgJiYgIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhXaW5kb3dzXFxzUGhvbmUpL2kpKSA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0dmFyIEFuZHJvaWQgPSAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSAmJiAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKFdpbmRvd3NcXHNQaG9uZSkvaSkpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gQXR0cmlidXRlcygpIHtcclxuXHRcdFx0XHRpZiAoZWwuYXR0cignaWQnKSAhPT0gdW5kZWZpbmVkICYmIGVsLmF0dHIoJ2lkJykgIT09ICcnKSB7XHJcblx0XHRcdFx0XHR0aGlzLmlkID0gZWwuYXR0cignaWQnKSArIG9wdC5pZFN1ZmZpeDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy50aXRsZSA9IGVsLmF0dHIoJ3RpdGxlJyk7XHJcblx0XHRcdFx0dGhpcy5jbGFzc2VzID0gZWwuYXR0cignY2xhc3MnKTtcclxuXHRcdFx0XHR0aGlzLmRhdGEgPSBlbC5kYXRhKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGNoZWNrYm94XHJcblx0XHRcdGlmIChlbC5pcygnOmNoZWNrYm94JykpIHtcclxuXHJcblx0XHRcdFx0dmFyIGNoZWNrYm94T3V0cHV0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGF0dCA9IG5ldyBBdHRyaWJ1dGVzKCk7XHJcblx0XHRcdFx0XHR2YXIgY2hlY2tib3ggPSAkKCc8ZGl2IGNsYXNzPVwianEtY2hlY2tib3hcIj48ZGl2IGNsYXNzPVwianEtY2hlY2tib3hfX2RpdlwiPjwvZGl2PjwvZGl2PicpXHJcblx0XHRcdFx0XHRcdC5hdHRyKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogYXR0LmlkLFxyXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBhdHQudGl0bGVcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKGF0dC5jbGFzc2VzKVxyXG5cdFx0XHRcdFx0XHQuZGF0YShhdHQuZGF0YSlcclxuXHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRlbC5hZnRlcihjaGVja2JveCkucHJlcGVuZFRvKGNoZWNrYm94KTtcclxuXHRcdFx0XHRcdGlmIChlbC5pcygnOmNoZWNrZWQnKSkgY2hlY2tib3guYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcclxuXHRcdFx0XHRcdGlmIChlbC5pcygnOmRpc2FibGVkJykpIGNoZWNrYm94LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdC8vINC60LvQuNC6INC90LAg0L/RgdC10LLQtNC+0YfQtdC60LHQvtC60YFcclxuXHRcdFx0XHRcdGNoZWNrYm94LmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRlbC50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFjaGVja2JveC5pcygnLmRpc2FibGVkJykpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZWwuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGVsLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRjaGVja2JveC5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRlbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRjaGVja2JveC5hZGRDbGFzcygnY2hlY2tlZCcpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbC5mb2N1cygpLmNoYW5nZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdC8vINC60LvQuNC6INC90LAgbGFiZWxcclxuXHRcdFx0XHRcdGVsLmNsb3Nlc3QoJ2xhYmVsJykuYWRkKCdsYWJlbFtmb3I9XCInICsgZWwuYXR0cignaWQnKSArICdcIl0nKS5vbignY2xpY2suc3R5bGVyJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoISQoZS50YXJnZXQpLmlzKCdhJykgJiYgISQoZS50YXJnZXQpLmNsb3Nlc3QoY2hlY2tib3gpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdGNoZWNrYm94LnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xyXG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHQvLyDQv9C10YDQtdC60LvRjtGH0LXQvdC40LUg0L/QviBTcGFjZSDQuNC70LggRW50ZXJcclxuXHRcdFx0XHRcdGVsLm9uKCdjaGFuZ2Uuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGlmIChlbC5pcygnOmNoZWNrZWQnKSkgY2hlY2tib3guYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcclxuXHRcdFx0XHRcdFx0ZWxzZSBjaGVja2JveC5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC8vINGH0YLQvtCx0Ysg0L/QtdGA0LXQutC70Y7Rh9Cw0LvRgdGPINGH0LXQutCx0L7QutGBLCDQutC+0YLQvtGA0YvQuSDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0YLQtdCz0LUgbGFiZWxcclxuXHRcdFx0XHRcdC5vbigna2V5ZG93bi5zdHlsZXInLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChlLndoaWNoID09IDMyKSBjaGVja2JveC5jbGljaygpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5vbignZm9jdXMuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGlmICghY2hlY2tib3guaXMoJy5kaXNhYmxlZCcpKSBjaGVja2JveC5hZGRDbGFzcygnZm9jdXNlZCcpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5vbignYmx1ci5zdHlsZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0Y2hlY2tib3gucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9OyAvLyBlbmQgY2hlY2tib3hPdXRwdXQoKVxyXG5cclxuXHRcdFx0XHRjaGVja2JveE91dHB1dCgpO1xyXG5cclxuXHRcdFx0XHQvLyDQvtCx0L3QvtCy0LvQtdC90LjQtSDQv9GA0Lgg0LTQuNC90LDQvNC40YfQtdGB0LrQvtC8INC40LfQvNC10L3QtdC90LjQuFxyXG5cdFx0XHRcdGVsLm9uKCdyZWZyZXNoJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRlbC5jbG9zZXN0KCdsYWJlbCcpLmFkZCgnbGFiZWxbZm9yPVwiJyArIGVsLmF0dHIoJ2lkJykgKyAnXCJdJykub2ZmKCcuc3R5bGVyJyk7XHJcblx0XHRcdFx0XHRlbC5vZmYoJy5zdHlsZXInKS5wYXJlbnQoKS5iZWZvcmUoZWwpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0Y2hlY2tib3hPdXRwdXQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVuZCBjaGVja2JveFxyXG5cclxuXHRcdFx0Ly8gcmFkaW9cclxuXHRcdFx0fSBlbHNlIGlmIChlbC5pcygnOnJhZGlvJykpIHtcclxuXHJcblx0XHRcdFx0dmFyIHJhZGlvT3V0cHV0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGF0dCA9IG5ldyBBdHRyaWJ1dGVzKCk7XHJcblx0XHRcdFx0XHR2YXIgcmFkaW8gPSAkKCc8ZGl2IGNsYXNzPVwianEtcmFkaW9cIj48ZGl2IGNsYXNzPVwianEtcmFkaW9fX2RpdlwiPjwvZGl2PjwvZGl2PicpXHJcblx0XHRcdFx0XHRcdC5hdHRyKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogYXR0LmlkLFxyXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBhdHQudGl0bGVcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKGF0dC5jbGFzc2VzKVxyXG5cdFx0XHRcdFx0XHQuZGF0YShhdHQuZGF0YSlcclxuXHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRlbC5hZnRlcihyYWRpbykucHJlcGVuZFRvKHJhZGlvKTtcclxuXHRcdFx0XHRcdGlmIChlbC5pcygnOmNoZWNrZWQnKSkgcmFkaW8uYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcclxuXHRcdFx0XHRcdGlmIChlbC5pcygnOmRpc2FibGVkJykpIHJhZGlvLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdC8vINC+0L/RgNC10LTQtdC70Y/QtdC8INC+0LHRidC10LPQviDRgNC+0LTQuNGC0LXQu9GPINGDINGA0LDQtNC40L7QutC90L7Qv9C+0Log0YEg0L7QtNC40L3QsNC60L7QstGL0LwgbmFtZVxyXG5cdFx0XHRcdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjc3MzM4NDdcclxuXHRcdFx0XHRcdCQuZm4uY29tbW9uUGFyZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgY2FjaGVkVGhpcyA9IHRoaXM7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjYWNoZWRUaGlzLmZpcnN0KCkucGFyZW50cygpLmZpbHRlcihmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5maW5kKGNhY2hlZFRoaXMpLmxlbmd0aCA9PT0gY2FjaGVkVGhpcy5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdCQuZm4uY29tbW9uUGFyZW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAkKHRoaXMpLmNvbW1vblBhcmVudHMoKS5maXJzdCgpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyDQutC70LjQuiDQvdCwINC/0YHQtdCy0LTQvtGA0LDQtNC40L7QutC90L7Qv9C60LVcclxuXHRcdFx0XHRcdHJhZGlvLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRlbC50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFyYWRpby5pcygnLmRpc2FibGVkJykpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgaW5wdXROYW1lID0gJCgnaW5wdXRbbmFtZT1cIicgKyBlbC5hdHRyKCduYW1lJykgKyAnXCJdJyk7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXROYW1lLmNvbW1vblBhcmVudCgpLmZpbmQoaW5wdXROYW1lKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XHJcblx0XHRcdFx0XHRcdFx0ZWwucHJvcCgnY2hlY2tlZCcsIHRydWUpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJyk7XHJcblx0XHRcdFx0XHRcdFx0ZWwuZm9jdXMoKS5jaGFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHQvLyDQutC70LjQuiDQvdCwIGxhYmVsXHJcblx0XHRcdFx0XHRlbC5jbG9zZXN0KCdsYWJlbCcpLmFkZCgnbGFiZWxbZm9yPVwiJyArIGVsLmF0dHIoJ2lkJykgKyAnXCJdJykub24oJ2NsaWNrLnN0eWxlcicsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCEkKGUudGFyZ2V0KS5pcygnYScpICYmICEkKGUudGFyZ2V0KS5jbG9zZXN0KHJhZGlvKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRyYWRpby50cmlnZ2VySGFuZGxlcignY2xpY2snKTtcclxuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Ly8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INGB0YLRgNC10LvQutCw0LzQuFxyXG5cdFx0XHRcdFx0ZWwub24oJ2NoYW5nZS5zdHlsZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZWwucGFyZW50KCkuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQub24oJ2ZvY3VzLnN0eWxlcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIXJhZGlvLmlzKCcuZGlzYWJsZWQnKSkgcmFkaW8uYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQub24oJ2JsdXIuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJhZGlvLnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fTsgLy8gZW5kIHJhZGlvT3V0cHV0KClcclxuXHJcblx0XHRcdFx0cmFkaW9PdXRwdXQoKTtcclxuXHJcblx0XHRcdFx0Ly8g0L7QsdC90L7QstC70LXQvdC40LUg0L/RgNC4INC00LjQvdCw0LzQuNGH0LXRgdC60L7QvCDQuNC30LzQtdC90LXQvdC40LhcclxuXHRcdFx0XHRlbC5vbigncmVmcmVzaCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0ZWwuY2xvc2VzdCgnbGFiZWwnKS5hZGQoJ2xhYmVsW2Zvcj1cIicgKyBlbC5hdHRyKCdpZCcpICsgJ1wiXScpLm9mZignLnN0eWxlcicpO1xyXG5cdFx0XHRcdFx0ZWwub2ZmKCcuc3R5bGVyJykucGFyZW50KCkuYmVmb3JlKGVsKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdHJhZGlvT3V0cHV0KCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlbmQgcmFkaW9cclxuXHJcblx0XHRcdC8vIGZpbGVcclxuXHRcdFx0fSBlbHNlIGlmIChlbC5pcygnOmZpbGUnKSkge1xyXG5cclxuXHRcdFx0XHR2YXIgZmlsZU91dHB1dCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBhdHQgPSBuZXcgQXR0cmlidXRlcygpO1xyXG5cdFx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gZWwuZGF0YSgncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHRcdGlmIChwbGFjZWhvbGRlciA9PT0gdW5kZWZpbmVkKSBwbGFjZWhvbGRlciA9IG9wdC5maWxlUGxhY2Vob2xkZXI7XHJcblx0XHRcdFx0XHR2YXIgYnJvd3NlID0gZWwuZGF0YSgnYnJvd3NlJyk7XHJcblx0XHRcdFx0XHRpZiAoYnJvd3NlID09PSB1bmRlZmluZWQgfHwgYnJvd3NlID09PSAnJykgYnJvd3NlID0gb3B0LmZpbGVCcm93c2U7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGZpbGUgPVxyXG5cdFx0XHRcdFx0XHQkKCc8ZGl2IGNsYXNzPVwianEtZmlsZVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJqcS1maWxlX19uYW1lXCI+JyArIHBsYWNlaG9sZGVyICsgJzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJqcS1maWxlX19icm93c2VcIj4nICsgYnJvd3NlICsgJzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nKVxyXG5cdFx0XHRcdFx0XHQuYXR0cih7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IGF0dC5pZCxcclxuXHRcdFx0XHRcdFx0XHR0aXRsZTogYXR0LnRpdGxlXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhhdHQuY2xhc3NlcylcclxuXHRcdFx0XHRcdFx0LmRhdGEoYXR0LmRhdGEpXHJcblx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0ZWwuYWZ0ZXIoZmlsZSkuYXBwZW5kVG8oZmlsZSk7XHJcblx0XHRcdFx0XHRpZiAoZWwuaXMoJzpkaXNhYmxlZCcpKSBmaWxlLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IGVsLnZhbCgpO1xyXG5cdFx0XHRcdFx0dmFyIG5hbWUgPSAkKCdkaXYuanEtZmlsZV9fbmFtZScsIGZpbGUpO1xyXG5cclxuXHRcdFx0XHRcdC8vINGH0YLQvtCx0Ysg0L/RgNC4INC00LjQvdCw0LzQuNGH0LXRgdC60L7QvCDQuNC30LzQtdC90LXQvdC40Lgg0LjQvNGPINGE0LDQudC70LAg0L3QtSDRgdCx0YDQsNGB0YvQstCw0LvQvtGB0YxcclxuXHRcdFx0XHRcdGlmICh2YWx1ZSkgbmFtZS50ZXh0KHZhbHVlLnJlcGxhY2UoLy4rW1xcXFxcXC9dLywgJycpKTtcclxuXHJcblx0XHRcdFx0XHRlbC5vbignY2hhbmdlLnN0eWxlcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBlbC52YWwoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGVsLmlzKCdbbXVsdGlwbGVdJykpIHtcclxuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlcyA9IGVsWzBdLmZpbGVzLmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZmlsZXMgPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbnVtYmVyID0gZWwuZGF0YSgnbnVtYmVyJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAobnVtYmVyID09PSB1bmRlZmluZWQpIG51bWJlciA9IG9wdC5maWxlTnVtYmVyO1xyXG5cdFx0XHRcdFx0XHRcdFx0bnVtYmVyID0gbnVtYmVyLnJlcGxhY2UoJyVzJywgZmlsZXMpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWUgPSBudW1iZXI7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG5hbWUudGV4dCh2YWx1ZS5yZXBsYWNlKC8uK1tcXFxcXFwvXS8sICcnKSk7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lLnRleHQocGxhY2Vob2xkZXIpO1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUucmVtb3ZlQ2xhc3MoJ2NoYW5nZWQnKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLmFkZENsYXNzKCdjaGFuZ2VkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQub24oJ2ZvY3VzLnN0eWxlcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRmaWxlLmFkZENsYXNzKCdmb2N1c2VkJyk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0Lm9uKCdibHVyLnN0eWxlcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRmaWxlLnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0Lm9uKCdjbGljay5zdHlsZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZmlsZS5yZW1vdmVDbGFzcygnZm9jdXNlZCcpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH07IC8vIGVuZCBmaWxlT3V0cHV0KClcclxuXHJcblx0XHRcdFx0ZmlsZU91dHB1dCgpO1xyXG5cclxuXHRcdFx0XHQvLyDQvtCx0L3QvtCy0LvQtdC90LjQtSDQv9GA0Lgg0LTQuNC90LDQvNC40YfQtdGB0LrQvtC8INC40LfQvNC10L3QtdC90LjQuFxyXG5cdFx0XHRcdGVsLm9uKCdyZWZyZXNoJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRlbC5vZmYoJy5zdHlsZXInKS5wYXJlbnQoKS5iZWZvcmUoZWwpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0ZmlsZU91dHB1dCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZW5kIGZpbGVcclxuXHJcblx0XHRcdC8vIG51bWJlclxyXG5cdFx0XHR9IGVsc2UgaWYgKGVsLmlzKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykpIHtcclxuXHJcblx0XHRcdFx0dmFyIG51bWJlck91dHB1dCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBhdHQgPSBuZXcgQXR0cmlidXRlcygpO1xyXG5cdFx0XHRcdFx0dmFyIG51bWJlciA9XHJcblx0XHRcdFx0XHRcdCQoJzxkaXYgY2xhc3M9XCJqcS1udW1iZXJcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwianEtbnVtYmVyX19zcGluIG1pbnVzXCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImpxLW51bWJlcl9fc3BpbiBwbHVzXCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0JzwvZGl2PicpXHJcblx0XHRcdFx0XHRcdC5hdHRyKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogYXR0LmlkLFxyXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBhdHQudGl0bGVcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKGF0dC5jbGFzc2VzKVxyXG5cdFx0XHRcdFx0XHQuZGF0YShhdHQuZGF0YSlcclxuXHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRlbC5hZnRlcihudW1iZXIpLnByZXBlbmRUbyhudW1iZXIpLndyYXAoJzxkaXYgY2xhc3M9XCJqcS1udW1iZXJfX2ZpZWxkXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRpZiAoZWwuaXMoJzpkaXNhYmxlZCcpKSBudW1iZXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIG1pbixcclxuXHRcdFx0XHRcdFx0XHRtYXgsXHJcblx0XHRcdFx0XHRcdFx0c3RlcCxcclxuXHRcdFx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbCxcclxuXHRcdFx0XHRcdFx0XHRpbnRlcnZhbCA9IG51bGw7XHJcblx0XHRcdFx0XHRpZiAoZWwuYXR0cignbWluJykgIT09IHVuZGVmaW5lZCkgbWluID0gZWwuYXR0cignbWluJyk7XHJcblx0XHRcdFx0XHRpZiAoZWwuYXR0cignbWF4JykgIT09IHVuZGVmaW5lZCkgbWF4ID0gZWwuYXR0cignbWF4Jyk7XHJcblx0XHRcdFx0XHRpZiAoZWwuYXR0cignc3RlcCcpICE9PSB1bmRlZmluZWQgJiYgJC5pc051bWVyaWMoZWwuYXR0cignc3RlcCcpKSlcclxuXHRcdFx0XHRcdFx0c3RlcCA9IE51bWJlcihlbC5hdHRyKCdzdGVwJykpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRzdGVwID0gTnVtYmVyKDEpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBjaGFuZ2VWYWx1ZSA9IGZ1bmN0aW9uKHNwaW4pIHtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gZWwudmFsKCksXHJcblx0XHRcdFx0XHRcdFx0XHRuZXdWYWx1ZTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICghJC5pc051bWVyaWModmFsdWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdGVsLnZhbCgnMCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoc3Bpbi5pcygnLm1pbnVzJykpIHtcclxuXHRcdFx0XHRcdFx0XHRuZXdWYWx1ZSA9IE51bWJlcih2YWx1ZSkgLSBzdGVwO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHNwaW4uaXMoJy5wbHVzJykpIHtcclxuXHRcdFx0XHRcdFx0XHRuZXdWYWx1ZSA9IE51bWJlcih2YWx1ZSkgKyBzdGVwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQvtC/0YDQtdC00LXQu9GP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQtNC10YHRj9GC0LjRh9C90YvRhSDQt9C90LDQutC+0LIg0L/QvtGB0LvQtSDQt9Cw0L/Rj9GC0L7QuSDQsiBzdGVwXHJcblx0XHRcdFx0XHRcdHZhciBkZWNpbWFscyA9IChzdGVwLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSB8fCBbXSkubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRpZiAoZGVjaW1hbHMgPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG11bHRpcGxpZXIgPSAnMSc7XHJcblx0XHRcdFx0XHRcdFx0d2hpbGUgKG11bHRpcGxpZXIubGVuZ3RoIDw9IGRlY2ltYWxzKSBtdWx0aXBsaWVyID0gbXVsdGlwbGllciArICcwJztcclxuXHRcdFx0XHRcdFx0XHQvLyDQuNC30LHQtdCz0LDQtdC8INC/0L7Rj9Cy0LvQtdC90LjRjyDQu9C40YjQvdC40YUg0LfQvdCw0LrQvtCyINC/0L7RgdC70LUg0LfQsNC/0Y/RgtC+0LlcclxuXHRcdFx0XHRcdFx0XHRuZXdWYWx1ZSA9IE1hdGgucm91bmQobmV3VmFsdWUgKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICgkLmlzTnVtZXJpYyhtaW4pICYmICQuaXNOdW1lcmljKG1heCkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAobmV3VmFsdWUgPj0gbWluICYmIG5ld1ZhbHVlIDw9IG1heCkgZWwudmFsKG5ld1ZhbHVlKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkLmlzTnVtZXJpYyhtaW4pICYmICEkLmlzTnVtZXJpYyhtYXgpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG5ld1ZhbHVlID49IG1pbikgZWwudmFsKG5ld1ZhbHVlKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICghJC5pc051bWVyaWMobWluKSAmJiAkLmlzTnVtZXJpYyhtYXgpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKG5ld1ZhbHVlIDw9IG1heCkgZWwudmFsKG5ld1ZhbHVlKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRlbC52YWwobmV3VmFsdWUpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdGlmICghbnVtYmVyLmlzKCcuZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRudW1iZXIub24oJ21vdXNlZG93bicsICdkaXYuanEtbnVtYmVyX19zcGluJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHNwaW4gPSAkKHRoaXMpO1xyXG5cdFx0XHRcdFx0XHRcdGNoYW5nZVZhbHVlKHNwaW4pO1xyXG5cdFx0XHRcdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7IGNoYW5nZVZhbHVlKHNwaW4pOyB9LCA0MCk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMzUwKTtcclxuXHRcdFx0XHRcdFx0fSkub24oJ21vdXNldXAgbW91c2VvdXQnLCAnZGl2LmpxLW51bWJlcl9fc3BpbicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcclxuXHRcdFx0XHRcdFx0fSkub24oJ21vdXNldXAnLCAnZGl2LmpxLW51bWJlcl9fc3BpbicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGVsLmNoYW5nZSgpLnRyaWdnZXIoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRlbC5vbignZm9jdXMuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0bnVtYmVyLmFkZENsYXNzKCdmb2N1c2VkJyk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5vbignYmx1ci5zdHlsZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRudW1iZXIucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH07IC8vIGVuZCBudW1iZXJPdXRwdXQoKVxyXG5cclxuXHRcdFx0XHRudW1iZXJPdXRwdXQoKTtcclxuXHJcblx0XHRcdFx0Ly8g0L7QsdC90L7QstC70LXQvdC40LUg0L/RgNC4INC00LjQvdCw0LzQuNGH0LXRgdC60L7QvCDQuNC30LzQtdC90LXQvdC40LhcclxuXHRcdFx0XHRlbC5vbigncmVmcmVzaCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0ZWwub2ZmKCcuc3R5bGVyJykuY2xvc2VzdCgnLmpxLW51bWJlcicpLmJlZm9yZShlbCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRudW1iZXJPdXRwdXQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVuZCBudW1iZXJcclxuXHJcblx0XHRcdC8vIHNlbGVjdFxyXG5cdFx0XHR9IGVsc2UgaWYgKGVsLmlzKCdzZWxlY3QnKSkge1xyXG5cclxuXHRcdFx0XHR2YXIgc2VsZWN0Ym94T3V0cHV0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8g0LfQsNC/0YDQtdGJ0LDQtdC8INC/0YDQvtC60YDRg9GC0LrRgyDRgdGC0YDQsNC90LjRhtGLINC/0YDQuCDQv9GA0L7QutGA0YPRgtC60LUg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIHByZXZlbnRTY3JvbGxpbmcoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc2Nyb2xsRGlmZiA9IHNlbGVjdG9yLnByb3AoJ3Njcm9sbEhlaWdodCcpIC0gc2VsZWN0b3Iub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdHdoZWVsRGVsdGEgPSBudWxsLFxyXG5cdFx0XHRcdFx0XHRcdFx0c2Nyb2xsVG9wID0gbnVsbDtcclxuXHJcblx0XHRcdFx0XHRcdHNlbGVjdG9yLm9mZignbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCcpLm9uKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdFx0XHQgKiDQvdC+0YDQvNCw0LvQuNC30LDRhtC40Y8g0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDQv9GA0L7QutGA0YPRgtC60LhcclxuXHRcdFx0XHRcdFx0XHQgKiAoZmlyZWZveCA8IDAgfHwgY2hyb21lIGV0Yy4uLiA+IDApXHJcblx0XHRcdFx0XHRcdFx0ICogKGUub3JpZ2luYWxFdmVudC5kZXRhaWwgPCAwIHx8IGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMClcclxuXHRcdFx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdFx0XHR3aGVlbERlbHRhID0gKGUub3JpZ2luYWxFdmVudC5kZXRhaWwgPCAwIHx8IGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMCkgPyAxIDogLTE7IC8vINC90LDQv9GA0LDQstC70LXQvdC40LUg0L/RgNC+0LrRgNGD0YLQutC4ICgtMSDQstC90LjQtywgMSDQstCy0LXRgNGFKVxyXG5cdFx0XHRcdFx0XHRcdHNjcm9sbFRvcCA9IHNlbGVjdG9yLnNjcm9sbFRvcCgpOyAvLyDQv9C+0LfQuNGG0LjRjyDRgdC60YDQvtC70LvQsFxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoKHNjcm9sbFRvcCA+PSBzY3JvbGxEaWZmICYmIHdoZWVsRGVsdGEgPCAwKSB8fCAoc2Nyb2xsVG9wIDw9IDAgJiYgd2hlZWxEZWx0YSA+IDApKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBvcHRpb24gPSAkKCdvcHRpb24nLCBlbCk7XHJcblx0XHRcdFx0XHR2YXIgbGlzdCA9ICcnO1xyXG5cdFx0XHRcdFx0Ly8g0YTQvtGA0LzQuNGA0YPQtdC8INGB0L/QuNGB0L7QuiDRgdC10LvQtdC60YLQsFxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gbWFrZUxpc3QoKSB7XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9uLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG9wID0gb3B0aW9uLmVxKGkpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBsaSA9ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsaUNsYXNzID0gJycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGxpQ2xhc3NlcyA9ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZCA9ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZSA9ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhTGlzdCA9ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25DbGFzcyA9ICcnLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRncm91cENsYXNzID0gJycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGFKcWZzQ2xhc3MgPSAnJztcclxuXHRcdFx0XHRcdFx0XHR2YXIgZGlzYWJsZWQgPSAnZGlzYWJsZWQnO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBzZWxEaXMgPSAnc2VsZWN0ZWQgc2VsIGRpc2FibGVkJztcclxuXHRcdFx0XHRcdFx0XHRpZiAob3AucHJvcCgnc2VsZWN0ZWQnKSkgbGlDbGFzcyA9ICdzZWxlY3RlZCBzZWwnO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcC5pcygnOmRpc2FibGVkJykpIGxpQ2xhc3MgPSBkaXNhYmxlZDtcclxuXHRcdFx0XHRcdFx0XHRpZiAob3AuaXMoJzpzZWxlY3RlZDpkaXNhYmxlZCcpKSBsaUNsYXNzID0gc2VsRGlzO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcC5hdHRyKCdpZCcpICE9PSB1bmRlZmluZWQgJiYgb3AuYXR0cignaWQnKSAhPT0gJycpIGlkID0gJyBpZD1cIicgKyBvcC5hdHRyKCdpZCcpICsgb3B0LmlkU3VmZml4ICsgJ1wiJztcclxuXHRcdFx0XHRcdFx0XHRpZiAob3AuYXR0cigndGl0bGUnKSAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbi5hdHRyKCd0aXRsZScpICE9PSAnJykgdGl0bGUgPSAnIHRpdGxlPVwiJyArIG9wLmF0dHIoJ3RpdGxlJykgKyAnXCInO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcC5hdHRyKCdjbGFzcycpICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbkNsYXNzID0gJyAnICsgb3AuYXR0cignY2xhc3MnKTtcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGFKcWZzQ2xhc3MgPSAnIGRhdGEtanFmcy1jbGFzcz1cIicgKyBvcC5hdHRyKCdjbGFzcycpICsgJ1wiJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBkYXRhID0gb3AuZGF0YSgpO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGsgaW4gZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGFba10gIT09ICcnKSBkYXRhTGlzdCArPSAnIGRhdGEtJyArIGsgKyAnPVwiJyArIGRhdGFba10gKyAnXCInO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCAobGlDbGFzcyArIG9wdGlvbkNsYXNzKSAhPT0gJycgKSAgIGxpQ2xhc3NlcyA9ICcgY2xhc3M9XCInICsgbGlDbGFzcyArIG9wdGlvbkNsYXNzICsgJ1wiJztcclxuXHRcdFx0XHRcdFx0XHRsaSA9ICc8bGknICsgZGF0YUpxZnNDbGFzcyArIGRhdGFMaXN0ICsgbGlDbGFzc2VzICsgdGl0bGUgKyBpZCArICc+Jysgb3AuaHRtbCgpICsnPC9saT4nO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCDQtdGB0YLRjCBvcHRncm91cFxyXG5cdFx0XHRcdFx0XHRcdGlmIChvcC5wYXJlbnQoKS5pcygnb3B0Z3JvdXAnKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9wLnBhcmVudCgpLmF0dHIoJ2NsYXNzJykgIT09IHVuZGVmaW5lZCkgb3B0Z3JvdXBDbGFzcyA9ICcgJyArIG9wLnBhcmVudCgpLmF0dHIoJ2NsYXNzJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRsaSA9ICc8bGknICsgZGF0YUpxZnNDbGFzcyArIGRhdGFMaXN0ICsgJyBjbGFzcz1cIicgKyBsaUNsYXNzICsgb3B0aW9uQ2xhc3MgKyAnIG9wdGlvbicgKyBvcHRncm91cENsYXNzICsgJ1wiJyArIHRpdGxlICsgaWQgKyAnPicrIG9wLmh0bWwoKSArJzwvbGk+JztcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChvcC5pcygnOmZpcnN0LWNoaWxkJykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGkgPSAnPGxpIGNsYXNzPVwib3B0Z3JvdXAnICsgb3B0Z3JvdXBDbGFzcyArICdcIj4nICsgb3AucGFyZW50KCkuYXR0cignbGFiZWwnKSArICc8L2xpPicgKyBsaTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGxpc3QgKz0gbGk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gLy8gZW5kIG1ha2VMaXN0KClcclxuXHJcblx0XHRcdFx0XHQvLyDQvtC00LjQvdC+0YfQvdGL0Lkg0YHQtdC70LXQutGCXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBkb1NlbGVjdCgpIHtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBhdHQgPSBuZXcgQXR0cmlidXRlcygpO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VhcmNoSFRNTCA9ICcnO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0UGxhY2Vob2xkZXIgPSBlbC5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0U2VhcmNoID0gZWwuZGF0YSgnc2VhcmNoJyk7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RTZWFyY2hMaW1pdCA9IGVsLmRhdGEoJ3NlYXJjaC1saW1pdCcpO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0U2VhcmNoTm90Rm91bmQgPSBlbC5kYXRhKCdzZWFyY2gtbm90LWZvdW5kJyk7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RTZWFyY2hQbGFjZWhvbGRlciA9IGVsLmRhdGEoJ3NlYXJjaC1wbGFjZWhvbGRlcicpO1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0U21hcnRQb3NpdGlvbmluZyA9IGVsLmRhdGEoJ3NtYXJ0LXBvc2l0aW9uaW5nJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0UGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgc2VsZWN0UGxhY2Vob2xkZXIgPSBvcHQuc2VsZWN0UGxhY2Vob2xkZXI7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RTZWFyY2ggPT09IHVuZGVmaW5lZCB8fCBzZWxlY3RTZWFyY2ggPT09ICcnKSBzZWxlY3RTZWFyY2ggPSBvcHQuc2VsZWN0U2VhcmNoO1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0U2VhcmNoTGltaXQgPT09IHVuZGVmaW5lZCB8fCBzZWxlY3RTZWFyY2hMaW1pdCA9PT0gJycpIHNlbGVjdFNlYXJjaExpbWl0ID0gb3B0LnNlbGVjdFNlYXJjaExpbWl0O1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0U2VhcmNoTm90Rm91bmQgPT09IHVuZGVmaW5lZCB8fCBzZWxlY3RTZWFyY2hOb3RGb3VuZCA9PT0gJycpIHNlbGVjdFNlYXJjaE5vdEZvdW5kID0gb3B0LnNlbGVjdFNlYXJjaE5vdEZvdW5kO1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0U2VhcmNoUGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCkgc2VsZWN0U2VhcmNoUGxhY2Vob2xkZXIgPSBvcHQuc2VsZWN0U2VhcmNoUGxhY2Vob2xkZXI7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RTbWFydFBvc2l0aW9uaW5nID09PSB1bmRlZmluZWQgfHwgc2VsZWN0U21hcnRQb3NpdGlvbmluZyA9PT0gJycpIHNlbGVjdFNtYXJ0UG9zaXRpb25pbmcgPSBvcHQuc2VsZWN0U21hcnRQb3NpdGlvbmluZztcclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3Rib3ggPVxyXG5cdFx0XHRcdFx0XHRcdCQoJzxkaXYgY2xhc3M9XCJqcS1zZWxlY3Rib3gganFzZWxlY3RcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJqcS1zZWxlY3Rib3hfX3NlbGVjdFwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwianEtc2VsZWN0Ym94X19zZWxlY3QtdGV4dFwiPjwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwianEtc2VsZWN0Ym94X190cmlnZ2VyXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImpxLXNlbGVjdGJveF9fdHJpZ2dlci1hcnJvd1wiPjwvZGl2PjwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JylcclxuXHRcdFx0XHRcdFx0XHQuYXR0cih7XHJcblx0XHRcdFx0XHRcdFx0XHRpZDogYXR0LmlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IGF0dC50aXRsZVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKGF0dC5jbGFzc2VzKVxyXG5cdFx0XHRcdFx0XHRcdC5kYXRhKGF0dC5kYXRhKVxyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRlbC5hZnRlcihzZWxlY3Rib3gpLnByZXBlbmRUbyhzZWxlY3Rib3gpO1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdHpJbmRleCA9IHNlbGVjdGJveC5jc3MoJ3otaW5kZXgnKTtcclxuXHRcdFx0XHRcdFx0c2VsZWN0ekluZGV4ID0gKHNlbGVjdHpJbmRleCA+IDAgKSA/IHNlbGVjdHpJbmRleCA6IDE7XHJcblx0XHRcdFx0XHRcdHZhciBkaXZTZWxlY3QgPSAkKCdkaXYuanEtc2VsZWN0Ym94X19zZWxlY3QnLCBzZWxlY3Rib3gpO1xyXG5cdFx0XHRcdFx0XHR2YXIgZGl2VGV4dCA9ICQoJ2Rpdi5qcS1zZWxlY3Rib3hfX3NlbGVjdC10ZXh0Jywgc2VsZWN0Ym94KTtcclxuXHRcdFx0XHRcdFx0dmFyIG9wdGlvblNlbGVjdGVkID0gb3B0aW9uLmZpbHRlcignOnNlbGVjdGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRtYWtlTGlzdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdFNlYXJjaCkgc2VhcmNoSFRNTCA9XHJcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJqcS1zZWxlY3Rib3hfX3NlYXJjaFwiPjxpbnB1dCB0eXBlPVwic2VhcmNoXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcGxhY2Vob2xkZXI9XCInICsgc2VsZWN0U2VhcmNoUGxhY2Vob2xkZXIgKyAnXCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJqcS1zZWxlY3Rib3hfX25vdC1mb3VuZFwiPicgKyBzZWxlY3RTZWFyY2hOb3RGb3VuZCArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdFx0XHR2YXIgZHJvcGRvd24gPVxyXG5cdFx0XHRcdFx0XHRcdCQoJzxkaXYgY2xhc3M9XCJqcS1zZWxlY3Rib3hfX2Ryb3Bkb3duXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXJjaEhUTUwgKyAnPHVsPicgKyBsaXN0ICsgJzwvdWw+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+Jyk7XHJcblx0XHRcdFx0XHRcdHNlbGVjdGJveC5hcHBlbmQoZHJvcGRvd24pO1xyXG5cdFx0XHRcdFx0XHR2YXIgdWwgPSAkKCd1bCcsIGRyb3Bkb3duKTtcclxuXHRcdFx0XHRcdFx0dmFyIGxpID0gJCgnbGknLCBkcm9wZG93bik7XHJcblx0XHRcdFx0XHRcdHZhciBzZWFyY2ggPSAkKCdpbnB1dCcsIGRyb3Bkb3duKTtcclxuXHRcdFx0XHRcdFx0dmFyIG5vdEZvdW5kID0gJCgnZGl2LmpxLXNlbGVjdGJveF9fbm90LWZvdW5kJywgZHJvcGRvd24pLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGxpLmxlbmd0aCA8IHNlbGVjdFNlYXJjaExpbWl0KSBzZWFyY2gucGFyZW50KCkuaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8g0L/QvtC60LDQt9GL0LLQsNC10Lwg0L7Qv9GG0LjRjiDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG5cdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCDRgyAxLdC5INC+0L/RhtC40Lgg0L3QtdGCINGC0LXQutGB0YLQsCwg0L7QvdCwINCy0YvQsdGA0LDQvdCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC4INC/0LDRgNCw0LzQtdGC0YAgc2VsZWN0UGxhY2Vob2xkZXIg0L3QtSBmYWxzZSwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQv9C70LXQudGB0YXQvtC70LTQtdGAXHJcblx0XHRcdFx0XHRcdGlmIChvcHRpb24uZmlyc3QoKS50ZXh0KCkgPT09ICcnICYmIG9wdGlvbi5maXJzdCgpLmlzKCc6c2VsZWN0ZWQnKSAmJiBzZWxlY3RQbGFjZWhvbGRlciAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRkaXZUZXh0LnRleHQoc2VsZWN0UGxhY2Vob2xkZXIpLmFkZENsYXNzKCdwbGFjZWhvbGRlcicpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGRpdlRleHQudGV4dChvcHRpb25TZWxlY3RlZC50ZXh0KCkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQvtC/0YDQtdC00LXQu9GP0LXQvCDRgdCw0LzRi9C5INGI0LjRgNC+0LrQuNC5INC/0YPQvdC60YIg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0dmFyIGxpV2lkdGhJbm5lciA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRsaVdpZHRoID0gMDtcclxuXHRcdFx0XHRcdFx0bGkuY3NzKHsnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snfSk7XHJcblx0XHRcdFx0XHRcdGxpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGwgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChsLmlubmVyV2lkdGgoKSA+IGxpV2lkdGhJbm5lcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0bGlXaWR0aElubmVyID0gbC5pbm5lcldpZHRoKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRsaVdpZHRoID0gbC53aWR0aCgpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGxpLmNzcyh7J2Rpc3BsYXknOiAnJ30pO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8g0L/QvtC00YHRgtGA0LDQuNCy0LDQtdC8INGI0LjRgNC40L3RgyDRgdCy0LXRgNC90YPRgtC+0LPQviDRgdC10LvQtdC60YLQsCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcblx0XHRcdFx0XHRcdC8vINC+0YIg0YjQuNGA0LjQvdGLINC/0LvQtdC50YHRhdC+0LvQtNC10YDQsCDQuNC70Lgg0YHQsNC80L7Qs9C+INGI0LjRgNC+0LrQvtCz0L4g0L/Rg9C90LrRgtCwXHJcblx0XHRcdFx0XHRcdGlmIChkaXZUZXh0LmlzKCcucGxhY2Vob2xkZXInKSAmJiAoZGl2VGV4dC53aWR0aCgpID4gbGlXaWR0aElubmVyKSkge1xyXG5cdFx0XHRcdFx0XHRcdGRpdlRleHQud2lkdGgoZGl2VGV4dC53aWR0aCgpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc2VsQ2xvbmUgPSBzZWxlY3Rib3guY2xvbmUoKS5hcHBlbmRUbygnYm9keScpLndpZHRoKCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHNlbENsb25lV2lkdGggPSBzZWxDbG9uZS5vdXRlcldpZHRoKCk7XHJcblx0XHRcdFx0XHRcdFx0c2VsQ2xvbmUucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHNlbENsb25lV2lkdGggPT0gc2VsZWN0Ym94Lm91dGVyV2lkdGgoKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGl2VGV4dC53aWR0aChsaVdpZHRoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vINC/0L7QtNGB0YLRgNCw0LjQstCw0LXQvCDRiNC40YDQuNC90YMg0LLRi9C/0LDQtNCw0Y7RidC10LPQviDRgdC/0LjRgdC60LAg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINGB0LDQvNC+0LPQviDRiNC40YDQvtC60L7Qs9C+INC/0YPQvdC60YLQsFxyXG5cdFx0XHRcdFx0XHRpZiAobGlXaWR0aElubmVyID4gc2VsZWN0Ym94LndpZHRoKCkpIGRyb3Bkb3duLndpZHRoKGxpV2lkdGhJbm5lcik7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQv9GA0Y/Rh9C10LwgMS3RjiDQv9GD0YHRgtGD0Y4g0L7Qv9GG0LjRjiwg0LXRgdC70Lgg0L7QvdCwINC10YHRgtGMINC4INC10YHQu9C4INCw0YLRgNC40LHRg9GCIGRhdGEtcGxhY2Vob2xkZXIg0L3QtSDQv9GD0YHRgtC+0LlcclxuXHRcdFx0XHRcdFx0Ly8g0LXRgdC70Lgg0LLRgdC1INC20LUg0L3Rg9C20L3Qviwg0YfRgtC+0LHRiyDQv9C10YDQstCw0Y8g0L/Rg9GB0YLQsNGPINC+0L/RhtC40Y8g0L7RgtC+0LHRgNCw0LbQsNC70LDRgdGMLCDRgtC+INGD0LrQsNC30YvQstCw0LXQvCDRgyDRgdC10LvQtdC60YLQsDogZGF0YS1wbGFjZWhvbGRlcj1cIlwiXHJcblx0XHRcdFx0XHRcdGlmIChvcHRpb24uZmlyc3QoKS50ZXh0KCkgPT09ICcnICYmIGVsLmRhdGEoJ3BsYWNlaG9sZGVyJykgIT09ICcnKSB7XHJcblx0XHRcdFx0XHRcdFx0bGkuZmlyc3QoKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RIZWlnaHQgPSBzZWxlY3Rib3gub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHZhciBzZWFyY2hIZWlnaHQgPSBzZWFyY2gucGFyZW50KCkub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdFx0XHRcdFx0dmFyIGlzTWF4SGVpZ2h0ID0gdWwuY3NzKCdtYXgtaGVpZ2h0Jyk7XHJcblx0XHRcdFx0XHRcdHZhciBsaVNlbGVjdGVkID0gbGkuZmlsdGVyKCcuc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0aWYgKGxpU2VsZWN0ZWQubGVuZ3RoIDwgMSkgbGkuZmlyc3QoKS5hZGRDbGFzcygnc2VsZWN0ZWQgc2VsJyk7XHJcblx0XHRcdFx0XHRcdGlmIChsaS5kYXRhKCdsaS1oZWlnaHQnKSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGxpT3V0ZXJIZWlnaHQgPSBsaS5vdXRlckhlaWdodCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChzZWxlY3RQbGFjZWhvbGRlciAhPT0gZmFsc2UpIGxpT3V0ZXJIZWlnaHQgPSBsaS5lcSgxKS5vdXRlckhlaWdodCgpO1xyXG5cdFx0XHRcdFx0XHRcdGxpLmRhdGEoJ2xpLWhlaWdodCcsIGxpT3V0ZXJIZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IGRyb3Bkb3duLmNzcygndG9wJyk7XHJcblx0XHRcdFx0XHRcdGlmIChkcm9wZG93bi5jc3MoJ2xlZnQnKSA9PSAnYXV0bycpIGRyb3Bkb3duLmNzcyh7bGVmdDogMH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoZHJvcGRvd24uY3NzKCd0b3AnKSA9PSAnYXV0bycpIHtcclxuXHRcdFx0XHRcdFx0XHRkcm9wZG93bi5jc3Moe3RvcDogc2VsZWN0SGVpZ2h0fSk7XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSBzZWxlY3RIZWlnaHQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZHJvcGRvd24uaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8g0LXRgdC70Lgg0LLRi9Cx0YDQsNC9INC90LUg0LTQtdGE0L7Qu9GC0L3Ri9C5INC/0YPQvdC60YJcclxuXHRcdFx0XHRcdFx0aWYgKGxpU2VsZWN0ZWQubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8g0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEsINC/0L7QutCw0LfRi9Cy0LDRjtGJ0LjQuSDQuNC30LzQtdC90LXQvdC40LUg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9uLmZpcnN0KCkudGV4dCgpICE9IG9wdGlvblNlbGVjdGVkLnRleHQoKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0Ym94LmFkZENsYXNzKCdjaGFuZ2VkJyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdC8vINC/0LXRgNC10LTQsNC10Lwg0YHQtdC70LXQutGC0YMg0LrQu9Cw0YHRgSDQstGL0LHRgNCw0L3QvdC+0LPQviDQv9GD0L3QutGC0LBcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3Rib3guZGF0YSgnanFmcy1jbGFzcycsIGxpU2VsZWN0ZWQuZGF0YSgnanFmcy1jbGFzcycpKTtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3Rib3guYWRkQ2xhc3MobGlTZWxlY3RlZC5kYXRhKCdqcWZzLWNsYXNzJykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCDRgdC10LvQtdC60YIg0L3QtdCw0LrRgtC40LLQvdGL0LlcclxuXHRcdFx0XHRcdFx0aWYgKGVsLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0L/RgdC10LLQtNC+0YHQtdC70LXQutGC0LVcclxuXHRcdFx0XHRcdFx0ZGl2U2VsZWN0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyDQutC+0LvQsdC10Log0L/RgNC4INC30LDQutGA0YvRgtC40Lgg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0XHRpZiAoJCgnZGl2LmpxLXNlbGVjdGJveCcpLmZpbHRlcignLm9wZW5lZCcpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0Lm9uU2VsZWN0Q2xvc2VkLmNhbGwoJCgnZGl2LmpxLXNlbGVjdGJveCcpLmZpbHRlcignLm9wZW5lZCcpKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGVsLmZvY3VzKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vINC10YHQu9C4IGlPUywg0YLQviDQvdC1INC/0L7QutCw0LfRi9Cy0LDQtdC8INCy0YvQv9Cw0LTQsNGO0YnQuNC5INGB0L/QuNGB0L7QuixcclxuXHRcdFx0XHRcdFx0XHQvLyDRgi7Qui4g0L7RgtC+0LHRgNCw0LbQsNC10YLRgdGPINC90LDRgtC40LLQvdGL0Lkg0Lgg0L3QtdC40LfQstC10YHRgtC90L4sINC60LDQuiDQtdCz0L4g0YHQv9GA0Y/RgtCw0YLRjFxyXG5cdFx0XHRcdFx0XHRcdGlmIChpT1MpIHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8g0YPQvNC90L7QtSDQv9C+0LfQuNGG0LjQvtC90LjRgNC+0LLQsNC90LjQtVxyXG5cdFx0XHRcdFx0XHRcdHZhciB3aW4gPSAkKHdpbmRvdyk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGxpSGVpZ2h0ID0gbGkuZGF0YSgnbGktaGVpZ2h0Jyk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHRvcE9mZnNldCA9IHNlbGVjdGJveC5vZmZzZXQoKS50b3A7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGJvdHRvbU9mZnNldCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHNlbGVjdEhlaWdodCAtICh0b3BPZmZzZXQgLSB3aW4uc2Nyb2xsVG9wKCkpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciB2aXNpYmxlID0gZWwuZGF0YSgndmlzaWJsZS1vcHRpb25zJyk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHZpc2libGUgPT09IHVuZGVmaW5lZCB8fCB2aXNpYmxlID09PSAnJykgdmlzaWJsZSA9IG9wdC5zZWxlY3RWaXNpYmxlT3B0aW9ucztcclxuXHRcdFx0XHRcdFx0XHR2YXIgbWluSGVpZ2h0ID0gbGlIZWlnaHQgKiA1O1xyXG5cdFx0XHRcdFx0XHRcdHZhciBuZXdIZWlnaHQgPSBsaUhlaWdodCAqIHZpc2libGU7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHZpc2libGUgPiAwICYmIHZpc2libGUgPCA2KSBtaW5IZWlnaHQgPSBuZXdIZWlnaHQ7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHZpc2libGUgPT09IDApIG5ld0hlaWdodCA9ICdhdXRvJztcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGRyb3BEb3duID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkcm9wZG93bi5oZWlnaHQoJ2F1dG8nKS5jc3Moe2JvdHRvbTogJ2F1dG8nLCB0b3A6IHBvc2l0aW9ufSk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbWF4SGVpZ2h0Qm90dG9tID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVsLmNzcygnbWF4LWhlaWdodCcsIE1hdGguZmxvb3IoKGJvdHRvbU9mZnNldCAtIDIwIC0gc2VhcmNoSGVpZ2h0KSAvIGxpSGVpZ2h0KSAqIGxpSGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0XHRtYXhIZWlnaHRCb3R0b20oKTtcclxuXHRcdFx0XHRcdFx0XHRcdHVsLmNzcygnbWF4LWhlaWdodCcsIG5ld0hlaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNNYXhIZWlnaHQgIT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVsLmNzcygnbWF4LWhlaWdodCcsIGlzTWF4SGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChib3R0b21PZmZzZXQgPCAoZHJvcGRvd24ub3V0ZXJIZWlnaHQoKSArIDIwKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRtYXhIZWlnaHRCb3R0b20oKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgZHJvcFVwID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkcm9wZG93bi5oZWlnaHQoJ2F1dG8nKS5jc3Moe3RvcDogJ2F1dG8nLCBib3R0b206IHBvc2l0aW9ufSk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbWF4SGVpZ2h0VG9wID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVsLmNzcygnbWF4LWhlaWdodCcsIE1hdGguZmxvb3IoKHRvcE9mZnNldCAtIHdpbi5zY3JvbGxUb3AoKSAtIDIwIC0gc2VhcmNoSGVpZ2h0KSAvIGxpSGVpZ2h0KSAqIGxpSGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0XHRtYXhIZWlnaHRUb3AoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHVsLmNzcygnbWF4LWhlaWdodCcsIG5ld0hlaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXNNYXhIZWlnaHQgIT0gJ25vbmUnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVsLmNzcygnbWF4LWhlaWdodCcsIGlzTWF4SGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGlmICgodG9wT2Zmc2V0IC0gd2luLnNjcm9sbFRvcCgpIC0gMjApIDwgKGRyb3Bkb3duLm91dGVySGVpZ2h0KCkgKyAyMCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bWF4SGVpZ2h0VG9wKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHNlbGVjdFNtYXJ0UG9zaXRpb25pbmcgPT09IHRydWUgfHwgc2VsZWN0U21hcnRQb3NpdGlvbmluZyA9PT0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFtib3R0b21PZmZzZXQsbWluSGVpZ2h0LHNlYXJjaEhlaWdodF0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0YDQsNGB0LrRgNGL0YLQuNC1INCy0L3QuNC3XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoYm90dG9tT2Zmc2V0ID4gKG1pbkhlaWdodCArIHNlYXJjaEhlaWdodCArIDIwKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkcm9wRG93bigpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3gucmVtb3ZlQ2xhc3MoJ2Ryb3B1cCcpLmFkZENsYXNzKCdkcm9wZG93bicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0YDQsNGB0LrRgNGL0YLQuNC1INCy0LLQtdGA0YVcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRyb3BVcCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3gucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duJykuYWRkQ2xhc3MoJ2Ryb3B1cCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoc2VsZWN0U21hcnRQb3NpdGlvbmluZyA9PT0gZmFsc2UgfHwgc2VsZWN0U21hcnRQb3NpdGlvbmluZyA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0YDQsNGB0LrRgNGL0YLQuNC1INCy0L3QuNC3XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoYm90dG9tT2Zmc2V0ID4gKG1pbkhlaWdodCArIHNlYXJjaEhlaWdodCArIDIwKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkcm9wRG93bigpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3gucmVtb3ZlQ2xhc3MoJ2Ryb3B1cCcpLmFkZENsYXNzKCdkcm9wZG93bicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCDRg9C80L3QvtC1INC/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0L3QuNC1INC+0YLQutC70Y7Rh9C10L3QvlxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJvcGRvd24uaGVpZ2h0KCdhdXRvJykuY3NzKHtib3R0b206ICdhdXRvJywgdG9wOiBwb3NpdGlvbn0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0dWwuY3NzKCdtYXgtaGVpZ2h0JywgbmV3SGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc01heEhlaWdodCAhPSAnbm9uZScpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dWwuY3NzKCdtYXgtaGVpZ2h0JywgaXNNYXhIZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8g0LXRgdC70Lgg0LLRi9C/0LDQtNCw0Y7RidC40Lkg0YHQv9C40YHQvtC6INCy0YvRhdC+0LTQuNGCINC30LAg0L/RgNCw0LLRi9C5INC60YDQsNC5INC+0LrQvdCwINCx0YDQsNGD0LfQtdGA0LAsXHJcblx0XHRcdFx0XHRcdFx0Ly8g0YLQviDQvNC10L3Rj9C10Lwg0L/QvtC30LjRhtC40L7QvdC40YDQvtCy0LDQvdC40LUg0YEg0LvQtdCy0L7Qs9C+INC90LAg0L/RgNCw0LLQvtC1XHJcblx0XHRcdFx0XHRcdFx0aWYgKHNlbGVjdGJveC5vZmZzZXQoKS5sZWZ0ICsgZHJvcGRvd24ub3V0ZXJXaWR0aCgpID4gd2luLndpZHRoKCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRyb3Bkb3duLmNzcyh7bGVmdDogJ2F1dG8nLCByaWdodDogMH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQvLyDQutC+0L3QtdGGINGD0LzQvdC+0LPQviDQv9C+0LfQuNGG0LjQvtC90LjRgNC+0LLQsNC90LjRj1xyXG5cclxuXHRcdFx0XHRcdFx0XHQkKCdkaXYuanFzZWxlY3QnKS5jc3Moe3pJbmRleDogKHNlbGVjdHpJbmRleCAtIDEpfSkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5jc3Moe3pJbmRleDogc2VsZWN0ekluZGV4fSk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGRyb3Bkb3duLmlzKCc6aGlkZGVuJykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdCQoJ2Rpdi5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duOnZpc2libGUnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRkcm9wZG93bi5zaG93KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3guYWRkQ2xhc3MoJ29wZW5lZCBmb2N1c2VkJyk7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyDQutC+0LvQsdC10Log0L/RgNC4INC+0YLQutGA0YvRgtC40Lgg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0XHRcdG9wdC5vblNlbGVjdE9wZW5lZC5jYWxsKHNlbGVjdGJveCk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRyb3Bkb3duLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5yZW1vdmVDbGFzcygnb3BlbmVkIGRyb3B1cCBkcm9wZG93bicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0LrQvtC70LHQtdC6INC/0YDQuCDQt9Cw0LrRgNGL0YLQuNC4INGB0LXQu9C10LrRgtCwXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoJCgnZGl2LmpxLXNlbGVjdGJveCcpLmZpbHRlcignLm9wZW5lZCcpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHQub25TZWxlY3RDbG9zZWQuY2FsbChzZWxlY3Rib3gpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8g0L/QvtC40YHQutC+0LLQvtC1INC/0L7Qu9C1XHJcblx0XHRcdFx0XHRcdFx0aWYgKHNlYXJjaC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlYXJjaC52YWwoJycpLmtleXVwKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRub3RGb3VuZC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWFyY2gua2V5dXAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBxdWVyeSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGxpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkKHRoaXMpLmh0bWwoKS5tYXRjaChuZXcgUmVnRXhwKCcuKj8nICsgcXVlcnkgKyAnLio/JywgJ2knKSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyDQv9GA0Y/Rh9C10LwgMS3RjiDQv9GD0YHRgtGD0Y4g0L7Qv9GG0LjRjlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9uLmZpcnN0KCkudGV4dCgpID09PSAnJyAmJiBlbC5kYXRhKCdwbGFjZWhvbGRlcicpICE9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxpLmZpcnN0KCkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChsaS5maWx0ZXIoJzp2aXNpYmxlJykubGVuZ3RoIDwgMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vdEZvdW5kLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub3RGb3VuZC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8g0L/RgNC+0LrRgNGD0YfQuNCy0LDQtdC8INC00L4g0LLRi9Cx0YDQsNC90L3QvtCz0L4g0L/Rg9C90LrRgtCwINC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4INGB0L/QuNGB0LrQsFxyXG5cdFx0XHRcdFx0XHRcdGlmIChsaS5maWx0ZXIoJy5zZWxlY3RlZCcpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVsLnZhbCgpID09PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1bC5zY3JvbGxUb3AoMCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCDQvdC10YfQtdGC0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INCy0LjQtNC40LzRi9GFINC/0YPQvdC60YLQvtCyLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyDRgtC+INCy0YvRgdC+0YLRgyDQv9GD0L3QutGC0LAg0LTQtdC70LjQvCDQv9C+0L/QvtC70LDQvCDQtNC70Y8g0L/QvtGB0LvQtdC00YPRjtGJ0LXQs9C+INGA0LDRgdGH0LXRgtCwXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggKHVsLmlubmVySGVpZ2h0KCkgLyBsaUhlaWdodCkgJSAyICE9PSAwICkgbGlIZWlnaHQgPSBsaUhlaWdodCAvIDI7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHVsLnNjcm9sbFRvcCh1bC5zY3JvbGxUb3AoKSArIGxpLmZpbHRlcignLnNlbGVjdGVkJykucG9zaXRpb24oKS50b3AgLSB1bC5pbm5lckhlaWdodCgpIC8gMiArIGxpSGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHByZXZlbnRTY3JvbGxpbmcodWwpO1xyXG5cclxuXHRcdFx0XHRcdFx0fSk7IC8vIGVuZCBkaXZTZWxlY3QuY2xpY2soKVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8g0L/RgNC4INC90LDQstC10LTQtdC90LjQuCDQutGD0YDRgdC+0YDQsCDQvdCwINC/0YPQvdC60YIg0YHQv9C40YHQutCwXHJcblx0XHRcdFx0XHRcdGxpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdCQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZFRleHQgPSBsaS5maWx0ZXIoJy5zZWxlY3RlZCcpLnRleHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0L/Rg9C90LrRgiDRgdC/0LjRgdC60LBcclxuXHRcdFx0XHRcdFx0bGkuZmlsdGVyKCc6bm90KC5kaXNhYmxlZCk6bm90KC5vcHRncm91cCknKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRlbC5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHRcdHZhciB0ID0gJCh0aGlzKTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgbGlUZXh0ID0gdC50ZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCF0LmlzKCcuc2VsZWN0ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGluZGV4ID0gdC5pbmRleCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aW5kZXggLT0gdC5wcmV2QWxsKCcub3B0Z3JvdXAnKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdFx0XHR0LmFkZENsYXNzKCdzZWxlY3RlZCBzZWwnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCBzZWwnKTtcclxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbi5wcm9wKCdzZWxlY3RlZCcsIGZhbHNlKS5lcShpbmRleCkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkVGV4dCA9IGxpVGV4dDtcclxuXHRcdFx0XHRcdFx0XHRcdGRpdlRleHQudGV4dChsaVRleHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vINC/0LXRgNC10LTQsNC10Lwg0YHQtdC70LXQutGC0YMg0LrQu9Cw0YHRgSDQstGL0LHRgNCw0L3QvdC+0LPQviDQv9GD0L3QutGC0LBcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChzZWxlY3Rib3guZGF0YSgnanFmcy1jbGFzcycpKSBzZWxlY3Rib3gucmVtb3ZlQ2xhc3Moc2VsZWN0Ym94LmRhdGEoJ2pxZnMtY2xhc3MnKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3guZGF0YSgnanFmcy1jbGFzcycsIHQuZGF0YSgnanFmcy1jbGFzcycpKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5hZGRDbGFzcyh0LmRhdGEoJ2pxZnMtY2xhc3MnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZWwuY2hhbmdlKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGRyb3Bkb3duLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3Rib3gucmVtb3ZlQ2xhc3MoJ29wZW5lZCBkcm9wdXAgZHJvcGRvd24nKTtcclxuXHRcdFx0XHRcdFx0XHQvLyDQutC+0LvQsdC10Log0L/RgNC4INC30LDQutGA0YvRgtC40Lgg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0XHRvcHQub25TZWxlY3RDbG9zZWQuY2FsbChzZWxlY3Rib3gpO1xyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGRyb3Bkb3duLm1vdXNlb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdCQoJ2xpLnNlbCcsIGRyb3Bkb3duKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQuNC30LzQtdC90LXQvdC40LUg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0ZWwub24oJ2NoYW5nZS5zdHlsZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRkaXZUZXh0LnRleHQob3B0aW9uLmZpbHRlcignOnNlbGVjdGVkJykudGV4dCgpKS5yZW1vdmVDbGFzcygncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHRcdFx0XHRsaS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQgc2VsJykubm90KCcub3B0Z3JvdXAnKS5lcShlbFswXS5zZWxlY3RlZEluZGV4KS5hZGRDbGFzcygnc2VsZWN0ZWQgc2VsJyk7XHJcblx0XHRcdFx0XHRcdFx0Ly8g0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEsINC/0L7QutCw0LfRi9Cy0LDRjtGJ0LjQuSDQuNC30LzQtdC90LXQvdC40LUg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9uLmZpcnN0KCkudGV4dCgpICE9IGxpLmZpbHRlcignLnNlbGVjdGVkJykudGV4dCgpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3guYWRkQ2xhc3MoJ2NoYW5nZWQnKTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0Ym94LnJlbW92ZUNsYXNzKCdjaGFuZ2VkJyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQub24oJ2ZvY3VzLnN0eWxlcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5hZGRDbGFzcygnZm9jdXNlZCcpO1xyXG5cdFx0XHRcdFx0XHRcdCQoJ2Rpdi5qcXNlbGVjdCcpLm5vdCgnLmZvY3VzZWQnKS5yZW1vdmVDbGFzcygnb3BlbmVkIGRyb3B1cCBkcm9wZG93bicpLmZpbmQoJ2Rpdi5qcS1zZWxlY3Rib3hfX2Ryb3Bkb3duJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQub24oJ2JsdXIuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZWN0Ym94LnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC8vINC40LfQvNC10L3QtdC90LjQtSDRgdC10LvQtdC60YLQsCDRgSDQutC70LDQstC40LDRgtGD0YDRi1xyXG5cdFx0XHRcdFx0XHQub24oJ2tleWRvd24uc3R5bGVyIGtleXVwLnN0eWxlcicsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgbGlIZWlnaHQgPSBsaS5kYXRhKCdsaS1oZWlnaHQnKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZWwudmFsKCkgPT09ICcnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkaXZUZXh0LnRleHQoc2VsZWN0UGxhY2Vob2xkZXIpLmFkZENsYXNzKCdwbGFjZWhvbGRlcicpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkaXZUZXh0LnRleHQob3B0aW9uLmZpbHRlcignOnNlbGVjdGVkJykudGV4dCgpKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0bGkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIHNlbCcpLm5vdCgnLm9wdGdyb3VwJykuZXEoZWxbMF0uc2VsZWN0ZWRJbmRleCkuYWRkQ2xhc3MoJ3NlbGVjdGVkIHNlbCcpO1xyXG5cdFx0XHRcdFx0XHRcdC8vINCy0LLQtdGA0YUsINCy0LvQtdCy0L4sIFBhZ2UgVXAsIEhvbWVcclxuXHRcdFx0XHRcdFx0XHRpZiAoZS53aGljaCA9PSAzOCB8fCBlLndoaWNoID09IDM3IHx8IGUud2hpY2ggPT0gMzMgfHwgZS53aGljaCA9PSAzNikge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVsLnZhbCgpID09PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1bC5zY3JvbGxUb3AoMCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1bC5zY3JvbGxUb3AodWwuc2Nyb2xsVG9wKCkgKyBsaS5maWx0ZXIoJy5zZWxlY3RlZCcpLnBvc2l0aW9uKCkudG9wKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Ly8g0LLQvdC40LcsINCy0L/RgNCw0LLQviwgUGFnZSBEb3duLCBFbmRcclxuXHRcdFx0XHRcdFx0XHRpZiAoZS53aGljaCA9PSA0MCB8fCBlLndoaWNoID09IDM5IHx8IGUud2hpY2ggPT0gMzQgfHwgZS53aGljaCA9PSAzNSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dWwuc2Nyb2xsVG9wKHVsLnNjcm9sbFRvcCgpICsgbGkuZmlsdGVyKCcuc2VsZWN0ZWQnKS5wb3NpdGlvbigpLnRvcCAtIHVsLmlubmVySGVpZ2h0KCkgKyBsaUhlaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdC8vINC30LDQutGA0YvQstCw0LXQvCDQstGL0L/QsNC00LDRjtGJ0LjQuSDRgdC/0LjRgdC+0Log0L/RgNC4INC90LDQttCw0YLQuNC4IEVudGVyXHJcblx0XHRcdFx0XHRcdFx0aWYgKGUud2hpY2ggPT0gMTMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGRyb3Bkb3duLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5yZW1vdmVDbGFzcygnb3BlbmVkIGRyb3B1cCBkcm9wZG93bicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0LrQvtC70LHQtdC6INC/0YDQuCDQt9Cw0LrRgNGL0YLQuNC4INGB0LXQu9C10LrRgtCwXHJcblx0XHRcdFx0XHRcdFx0XHRvcHQub25TZWxlY3RDbG9zZWQuY2FsbChzZWxlY3Rib3gpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSkub24oJ2tleWRvd24uc3R5bGVyJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vINC+0YLQutGA0YvQstCw0LXQvCDQstGL0L/QsNC00LDRjtGJ0LjQuSDRgdC/0LjRgdC+0Log0L/RgNC4INC90LDQttCw0YLQuNC4IFNwYWNlXHJcblx0XHRcdFx0XHRcdFx0aWYgKGUud2hpY2ggPT0gMzIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGRpdlNlbGVjdC5jbGljaygpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQv9GA0Y/Rh9C10Lwg0LLRi9C/0LDQtNCw0Y7RidC40Lkg0YHQv9C40YHQvtC6INC/0YDQuCDQutC70LjQutC1INC30LAg0L/RgNC10LTQtdC70LDQvNC4INGB0LXQu9C10LrRgtCwXHJcblx0XHRcdFx0XHRcdGlmICghb25Eb2N1bWVudENsaWNrLnJlZ2lzdGVyZWQpIHtcclxuXHRcdFx0XHRcdFx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBvbkRvY3VtZW50Q2xpY2spO1xyXG5cdFx0XHRcdFx0XHRcdG9uRG9jdW1lbnRDbGljay5yZWdpc3RlcmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH0gLy8gZW5kIGRvU2VsZWN0KClcclxuXHJcblx0XHRcdFx0XHQvLyDQvNGD0LvRjNGC0LjRgdC10LvQtdC60YJcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGRvTXVsdGlwbGVTZWxlY3QoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgYXR0ID0gbmV3IEF0dHJpYnV0ZXMoKTtcclxuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGJveCA9XHJcblx0XHRcdFx0XHRcdFx0JCgnPGRpdiBjbGFzcz1cImpxLXNlbGVjdC1tdWx0aXBsZSBqcXNlbGVjdFwiPjwvZGl2PicpXHJcblx0XHRcdFx0XHRcdFx0LmF0dHIoe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWQ6IGF0dC5pZCxcclxuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBhdHQudGl0bGVcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhhdHQuY2xhc3NlcylcclxuXHRcdFx0XHRcdFx0XHQuZGF0YShhdHQuZGF0YSlcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0ZWwuYWZ0ZXIoc2VsZWN0Ym94KTtcclxuXHJcblx0XHRcdFx0XHRcdG1ha2VMaXN0KCk7XHJcblx0XHRcdFx0XHRcdHNlbGVjdGJveC5hcHBlbmQoJzx1bD4nICsgbGlzdCArICc8L3VsPicpO1xyXG5cdFx0XHRcdFx0XHR2YXIgdWwgPSAkKCd1bCcsIHNlbGVjdGJveCk7XHJcblx0XHRcdFx0XHRcdHZhciBsaSA9ICQoJ2xpJywgc2VsZWN0Ym94KTtcclxuXHRcdFx0XHRcdFx0dmFyIHNpemUgPSBlbC5hdHRyKCdzaXplJyk7XHJcblx0XHRcdFx0XHRcdHZhciB1bEhlaWdodCA9IHVsLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdFx0XHRcdHZhciBsaUhlaWdodCA9IGxpLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdFx0XHRcdGlmIChzaXplICE9PSB1bmRlZmluZWQgJiYgc2l6ZSA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHR1bC5jc3MoeydoZWlnaHQnOiBsaUhlaWdodCAqIHNpemV9KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR1bC5jc3MoeydoZWlnaHQnOiBsaUhlaWdodCAqIDR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAodWxIZWlnaHQgPiBzZWxlY3Rib3guaGVpZ2h0KCkpIHtcclxuXHRcdFx0XHRcdFx0XHR1bC5jc3MoJ292ZXJmbG93WScsICdzY3JvbGwnKTtcclxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50U2Nyb2xsaW5nKHVsKTtcclxuXHRcdFx0XHRcdFx0XHQvLyDQv9GA0L7QutGA0YPRh9C40LLQsNC10Lwg0LTQviDQstGL0LHRgNCw0L3QvdC+0LPQviDQv9GD0L3QutGC0LBcclxuXHRcdFx0XHRcdFx0XHRpZiAobGkuZmlsdGVyKCcuc2VsZWN0ZWQnKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHVsLnNjcm9sbFRvcCh1bC5zY3JvbGxUb3AoKSArIGxpLmZpbHRlcignLnNlbGVjdGVkJykucG9zaXRpb24oKS50b3ApO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8g0L/RgNGP0YfQtdC8INC+0YDQuNCz0LjQvdCw0LvRjNC90YvQuSDRgdC10LvQtdC60YJcclxuXHRcdFx0XHRcdFx0ZWwucHJlcGVuZFRvKHNlbGVjdGJveCk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCDRgdC10LvQtdC60YIg0L3QtdCw0LrRgtC40LLQvdGL0LlcclxuXHRcdFx0XHRcdFx0aWYgKGVsLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRvcHRpb24uZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmlzKCc6c2VsZWN0ZWQnKSkgbGkuZXEoJCh0aGlzKS5pbmRleCgpKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdC8vINC10YHQu9C4INGB0LXQu9C10LrRgiDQsNC60YLQuNCy0L3Ri9C5XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0L/Rg9C90LrRgiDRgdC/0LjRgdC60LBcclxuXHRcdFx0XHRcdFx0XHRsaS5maWx0ZXIoJzpub3QoLmRpc2FibGVkKTpub3QoLm9wdGdyb3VwKScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGVsLmZvY3VzKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgY2xrZCA9ICQodGhpcyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZighZS5jdHJsS2V5ICYmICFlLm1ldGFLZXkpIGNsa2QuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZighZS5zaGlmdEtleSkgY2xrZC5hZGRDbGFzcygnZmlyc3QnKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKCFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhZS5zaGlmdEtleSkgY2xrZC5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCBmaXJzdCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vINCy0YvQtNC10LvQtdC90LjQtSDQv9GD0L3QutGC0L7QsiDQv9GA0Lgg0LfQsNC20LDRgtC+0LwgQ3RybFxyXG5cdFx0XHRcdFx0XHRcdFx0aWYoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2xrZC5pcygnLnNlbGVjdGVkJykpIGNsa2QucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIGZpcnN0Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBjbGtkLmFkZENsYXNzKCdzZWxlY3RlZCBmaXJzdCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGtkLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2ZpcnN0Jyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8g0LLRi9C00LXQu9C10L3QuNC1INC/0YPQvdC60YLQvtCyINC/0YDQuCDQt9Cw0LbQsNGC0L7QvCBTaGlmdFxyXG5cdFx0XHRcdFx0XHRcdFx0aWYoZS5zaGlmdEtleSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcHJldiA9IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bmV4dCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGtkLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJykuc2libGluZ3MoJy5maXJzdCcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGtkLnByZXZBbGwoKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmlzKCcuZmlyc3QnKSkgcHJldiA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGtkLm5leHRBbGwoKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmlzKCcuZmlyc3QnKSkgbmV4dCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocHJldikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsa2QucHJldkFsbCgpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoJCh0aGlzKS5pcygnLnNlbGVjdGVkJykpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSAkKHRoaXMpLm5vdCgnLmRpc2FibGVkLCAub3B0Z3JvdXAnKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobmV4dCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsa2QubmV4dEFsbCgpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoJCh0aGlzKS5pcygnLnNlbGVjdGVkJykpIHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSAkKHRoaXMpLm5vdCgnLmRpc2FibGVkLCAub3B0Z3JvdXAnKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobGkuZmlsdGVyKCcuc2VsZWN0ZWQnKS5sZW5ndGggPT0gMSkgY2xrZC5hZGRDbGFzcygnZmlyc3QnKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyDQvtGC0LzQtdGH0LDQtdC8INCy0YvQsdGA0LDQvdC90YvQtSDQvNGL0YjRjNGOXHJcblx0XHRcdFx0XHRcdFx0XHRvcHRpb24ucHJvcCgnc2VsZWN0ZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRsaS5maWx0ZXIoJy5zZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciB0ID0gJCh0aGlzKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGluZGV4ID0gdC5pbmRleCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodC5pcygnLm9wdGlvbicpKSBpbmRleCAtPSB0LnByZXZBbGwoJy5vcHRncm91cCcpLmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uLmVxKGluZGV4KS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRlbC5jaGFuZ2UoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vINC+0YLQvNC10YfQsNC10Lwg0LLRi9Cx0YDQsNC90L3Ri9C1INGBINC60LvQsNCy0LjQsNGC0YPRgNGLXHJcblx0XHRcdFx0XHRcdFx0b3B0aW9uLmVhY2goZnVuY3Rpb24oaSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCdvcHRpb25JbmRleCcsIGkpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdGVsLm9uKCdjaGFuZ2Uuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRsaS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBhcnJJbmRleGVzID0gW107XHJcblx0XHRcdFx0XHRcdFx0XHRvcHRpb24uZmlsdGVyKCc6c2VsZWN0ZWQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRhcnJJbmRleGVzLnB1c2goJCh0aGlzKS5kYXRhKCdvcHRpb25JbmRleCcpKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0bGkubm90KCcub3B0Z3JvdXAnKS5maWx0ZXIoZnVuY3Rpb24oaSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KGksIGFyckluZGV4ZXMpID4gLTE7XHJcblx0XHRcdFx0XHRcdFx0XHR9KS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC5vbignZm9jdXMuc3R5bGVyJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3Rib3guYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC5vbignYmx1ci5zdHlsZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGJveC5yZW1vdmVDbGFzcygnZm9jdXNlZCcpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyDQv9GA0L7QutGA0YPRh9C40LLQsNC10Lwg0YEg0LrQu9Cw0LLQuNCw0YLRg9GA0YtcclxuXHRcdFx0XHRcdFx0XHRpZiAodWxIZWlnaHQgPiBzZWxlY3Rib3guaGVpZ2h0KCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGVsLm9uKCdrZXlkb3duLnN0eWxlcicsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8g0LLQstC10YDRhSwg0LLQu9C10LLQviwgUGFnZVVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlLndoaWNoID09IDM4IHx8IGUud2hpY2ggPT0gMzcgfHwgZS53aGljaCA9PSAzMykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVsLnNjcm9sbFRvcCh1bC5zY3JvbGxUb3AoKSArIGxpLmZpbHRlcignLnNlbGVjdGVkJykucG9zaXRpb24oKS50b3AgLSBsaUhlaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8g0LLQvdC40LcsINCy0L/RgNCw0LLQviwgUGFnZURvd25cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGUud2hpY2ggPT0gNDAgfHwgZS53aGljaCA9PSAzOSB8fCBlLndoaWNoID09IDM0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dWwuc2Nyb2xsVG9wKHVsLnNjcm9sbFRvcCgpICsgbGkuZmlsdGVyKCcuc2VsZWN0ZWQ6bGFzdCcpLnBvc2l0aW9uKCkudG9wIC0gdWwuaW5uZXJIZWlnaHQoKSArIGxpSGVpZ2h0ICogMik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gLy8gZW5kIGRvTXVsdGlwbGVTZWxlY3QoKVxyXG5cclxuXHRcdFx0XHRcdGlmIChlbC5pcygnW211bHRpcGxlXScpKSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyDQtdGB0LvQuCBBbmRyb2lkINC40LvQuCBpT1MsINGC0L4g0LzRg9C70YzRgtC40YHQtdC70LXQutGCINC90LUg0YHRgtC40LvQuNC30YPQtdC8XHJcblx0XHRcdFx0XHRcdC8vINC/0YDQuNGH0LjQvdCwINC00LvRjyBBbmRyb2lkIC0g0LIg0YHRgtC40LvQuNC30L7QstCw0L3QvdC+0Lwg0YHQtdC70LXQutGC0LUg0L3QtdGCINCy0L7Qt9C80L7QttC90L7RgdGC0Lgg0LLRi9Cx0YDQsNGC0Ywg0L3QtdGB0LrQvtC70YzQutC+INC/0YPQvdC60YLQvtCyXHJcblx0XHRcdFx0XHRcdC8vINC/0YDQuNGH0LjQvdCwINC00LvRjyBpT1MgLSDQsiDRgdGC0LjQu9C40LfQvtCy0LDQvdC90L7QvCDRgdC10LvQtdC60YLQtSDQvdC10L/RgNCw0LLQuNC70YzQvdC+INC+0YLQvtCx0YDQsNC20LDRjtGC0YHRjyDQstGL0LHRgNCw0L3QvdGL0LUg0L/Rg9C90LrRgtGLXHJcblx0XHRcdFx0XHRcdGlmIChBbmRyb2lkIHx8IGlPUykgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0ZG9NdWx0aXBsZVNlbGVjdCgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZG9TZWxlY3QoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fTsgLy8gZW5kIHNlbGVjdGJveE91dHB1dCgpXHJcblxyXG5cdFx0XHRcdHNlbGVjdGJveE91dHB1dCgpO1xyXG5cclxuXHRcdFx0XHQvLyDQvtCx0L3QvtCy0LvQtdC90LjQtSDQv9GA0Lgg0LTQuNC90LDQvNC40YfQtdGB0LrQvtC8INC40LfQvNC10L3QtdC90LjQuFxyXG5cdFx0XHRcdGVsLm9uKCdyZWZyZXNoJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRlbC5vZmYoJy5zdHlsZXInKS5wYXJlbnQoKS5iZWZvcmUoZWwpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0c2VsZWN0Ym94T3V0cHV0KCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlbmQgc2VsZWN0XHJcblxyXG5cdFx0XHQvLyByZXNldFxyXG5cdFx0XHR9IGVsc2UgaWYgKGVsLmlzKCc6cmVzZXQnKSkge1xyXG5cdFx0XHRcdGVsLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZWwuY2xvc2VzdCgnZm9ybScpLmZpbmQoJ2lucHV0LCBzZWxlY3QnKS50cmlnZ2VyKCdyZWZyZXNoJyk7XHJcblx0XHRcdFx0XHR9LCAxKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSAvLyBlbmQgcmVzZXRcclxuXHJcblx0XHR9LCAvLyBpbml0OiBmdW5jdGlvbigpXHJcblxyXG5cdFx0Ly8g0LTQtdGB0YLRgNGD0LrRgtC+0YBcclxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyIGVsID0gJCh0aGlzLmVsZW1lbnQpO1xyXG5cclxuXHRcdFx0aWYgKGVsLmlzKCc6Y2hlY2tib3gnKSB8fCBlbC5pcygnOnJhZGlvJykpIHtcclxuXHRcdFx0XHRlbC5yZW1vdmVEYXRhKCdfJyArIHBsdWdpbk5hbWUpLm9mZignLnN0eWxlciByZWZyZXNoJykucmVtb3ZlQXR0cignc3R5bGUnKS5wYXJlbnQoKS5iZWZvcmUoZWwpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdGVsLmNsb3Nlc3QoJ2xhYmVsJykuYWRkKCdsYWJlbFtmb3I9XCInICsgZWwuYXR0cignaWQnKSArICdcIl0nKS5vZmYoJy5zdHlsZXInKTtcclxuXHRcdFx0fSBlbHNlIGlmIChlbC5pcygnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpKSB7XHJcblx0XHRcdFx0ZWwucmVtb3ZlRGF0YSgnXycgKyBwbHVnaW5OYW1lKS5vZmYoJy5zdHlsZXIgcmVmcmVzaCcpLmNsb3Nlc3QoJy5qcS1udW1iZXInKS5iZWZvcmUoZWwpLnJlbW92ZSgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGVsLmlzKCc6ZmlsZScpIHx8IGVsLmlzKCdzZWxlY3QnKSkge1xyXG5cdFx0XHRcdGVsLnJlbW92ZURhdGEoJ18nICsgcGx1Z2luTmFtZSkub2ZmKCcuc3R5bGVyIHJlZnJlc2gnKS5yZW1vdmVBdHRyKCdzdHlsZScpLnBhcmVudCgpLmJlZm9yZShlbCkucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IC8vIGRlc3Ryb3k6IGZ1bmN0aW9uKClcclxuXHJcblx0fTsgLy8gUGx1Z2luLnByb3RvdHlwZVxyXG5cclxuXHQkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKCEkLmRhdGEodGhpcywgJ18nICsgcGx1Z2luTmFtZSkpIHtcclxuXHRcdFx0XHRcdCQuZGF0YSh0aGlzLCAnXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKHRoaXMsIG9wdGlvbnMpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdC8vINC60L7Qu9Cx0LXQuiDQv9C+0YHQu9C1INCy0YvQv9C+0LvQvdC10L3QuNGPINC/0LvQsNCz0LjQvdCwXHJcblx0XHRcdC5wcm9taXNlKClcclxuXHRcdFx0LmRvbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIG9wdCA9ICQodGhpc1swXSkuZGF0YSgnXycgKyBwbHVnaW5OYW1lKTtcclxuXHRcdFx0XHRpZiAob3B0KSBvcHQub3B0aW9ucy5vbkZvcm1TdHlsZWQuY2FsbCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyAmJiBvcHRpb25zWzBdICE9PSAnXycgJiYgb3B0aW9ucyAhPT0gJ2luaXQnKSB7XHJcblx0XHRcdHZhciByZXR1cm5zO1xyXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGluc3RhbmNlID0gJC5kYXRhKHRoaXMsICdfJyArIHBsdWdpbk5hbWUpO1xyXG5cdFx0XHRcdGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIFBsdWdpbiAmJiB0eXBlb2YgaW5zdGFuY2Vbb3B0aW9uc10gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdHJldHVybnMgPSBpbnN0YW5jZVtvcHRpb25zXS5hcHBseShpbnN0YW5jZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncywgMSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiByZXR1cm5zICE9PSB1bmRlZmluZWQgPyByZXR1cm5zIDogdGhpcztcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvLyDQv9GA0Y/Rh9C10Lwg0LLRi9C/0LDQtNCw0Y7RidC40Lkg0YHQv9C40YHQvtC6INC/0YDQuCDQutC70LjQutC1INC30LAg0L/RgNC10LTQtdC70LDQvNC4INGB0LXQu9C10LrRgtCwXHJcblx0ZnVuY3Rpb24gb25Eb2N1bWVudENsaWNrKGUpIHtcclxuXHRcdC8vIGUudGFyZ2V0Lm5vZGVOYW1lICE9ICdPUFRJT04nIC0g0LTQvtCx0LDQstC70LXQvdC+INC00LvRjyDQvtCx0YXQvtC00LAg0LHQsNCz0LAg0LIgT3BlcmEg0L3QsCDQtNCy0LjQttC60LUgUHJlc3RvXHJcblx0XHQvLyAo0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCDRgdC10LvQtdC60YLQsCDRgSDQutC70LDQstC40LDRgtGD0YDRiyDRgdGA0LDQsdCw0YLRi9Cy0LDQtdGCINGB0L7QsdGL0YLQuNC1IG9uY2xpY2spXHJcblx0XHRpZiAoISQoZS50YXJnZXQpLnBhcmVudHMoKS5oYXNDbGFzcygnanEtc2VsZWN0Ym94JykgJiYgZS50YXJnZXQubm9kZU5hbWUgIT0gJ09QVElPTicpIHtcclxuXHRcdFx0aWYgKCQoJ2Rpdi5qcS1zZWxlY3Rib3gub3BlbmVkJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0dmFyIHNlbGVjdGJveCA9ICQoJ2Rpdi5qcS1zZWxlY3Rib3gub3BlbmVkJyksXHJcblx0XHRcdFx0XHRcdHNlYXJjaCA9ICQoJ2Rpdi5qcS1zZWxlY3Rib3hfX3NlYXJjaCBpbnB1dCcsIHNlbGVjdGJveCksXHJcblx0XHRcdFx0XHRcdGRyb3Bkb3duID0gJCgnZGl2LmpxLXNlbGVjdGJveF9fZHJvcGRvd24nLCBzZWxlY3Rib3gpLFxyXG5cdFx0XHRcdFx0XHRvcHQgPSBzZWxlY3Rib3guZmluZCgnc2VsZWN0JykuZGF0YSgnXycgKyBwbHVnaW5OYW1lKS5vcHRpb25zO1xyXG5cclxuXHRcdFx0XHQvLyDQutC+0LvQsdC10Log0L/RgNC4INC30LDQutGA0YvRgtC40Lgg0YHQtdC70LXQutGC0LBcclxuXHRcdFx0XHRvcHQub25TZWxlY3RDbG9zZWQuY2FsbChzZWxlY3Rib3gpO1xyXG5cclxuXHRcdFx0XHRpZiAoc2VhcmNoLmxlbmd0aCkgc2VhcmNoLnZhbCgnJykua2V5dXAoKTtcclxuXHRcdFx0XHRkcm9wZG93bi5oaWRlKCkuZmluZCgnbGkuc2VsJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0c2VsZWN0Ym94LnJlbW92ZUNsYXNzKCdmb2N1c2VkIG9wZW5lZCBkcm9wdXAgZHJvcGRvd24nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRvbkRvY3VtZW50Q2xpY2sucmVnaXN0ZXJlZCA9IGZhbHNlO1xyXG5cclxufSkpOyJdLCJmaWxlIjoibGlicy9qcXVlcnkuZm9ybXN0eWxlci5qcyJ9
