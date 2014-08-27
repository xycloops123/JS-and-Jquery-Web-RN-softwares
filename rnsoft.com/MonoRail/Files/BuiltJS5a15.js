/**
 * jQuery Validation Plugin 1.8.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&this.find("input, button").filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator");e="on"+e.type.replace(/^validate/,
"");f.settings[e]&&f.settings[e].call(f,this[0])}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=this.settings.rules;
c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",a).validateDelegate(":radio, :checkbox, select, option","click",a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",
[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=a=this.clean(a);this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,
a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},
objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==
a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,
this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.clean(a);if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=
c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=
this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+
a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];
this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);
this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass().addClass(this.settings.errorClass);d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||
"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},
idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},
depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<
0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},
email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b=
{};a=c(a);for(var d in c.validator.methods){var e=a.attr(d);if(e)b[d]=e}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===
false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&
a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},
methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=
e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=
e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||
a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9-]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);

$(function () {
    var pause_before_fading_starts = 750; 	//Amount of time in ms to wait before starting the first fade	
    var h1_fade_in_duration = 750; 			//Amount of time in ms for the h1 to fade in
    var content_fade_in_duration = 750; 		//Amount of time in ms for the main content to fade in
    var header_faded_up = false;
    var content_faded_up = false;
    var images_loaded = false;


    function content_fadeIn() {
        $("#content").fadeIn(content_fade_in_duration, function () {
            //fading complete
            content_faded_up = true;
        });
    }

    setTimeout(function () {
        $("#header_text_wrapper").fadeIn(h1_fade_in_duration, function () {
            $('#content').waitForImages({
                finished: function () {
                    content_fadeIn();
                },
                each: function () {
                },
                waitForAll: true
            });
        });
    }, pause_before_fading_starts);

    $("header .labs").mouseenter(function () {
        $(this).stop().animate({ marginTop: "0px" });
    });
    $("header .labs").mouseout(function () {
        $(this).stop().animate({ marginTop: "-20px" });
    });

    $(".contact-link").fancybox({
        'padding': 0,
        'width': 540,
        'type': 'iframe',
        'scrolling': 'no',
        'height': 540,
        'showCloseButton': false
    });

    $("#lower-contact-link").fancybox({
        'padding': 0,
        'width': 540,
        'type': 'iframe',
        'scrolling': 'no',
        'height': 540
    });

    $(".borders").css({ 'opacity': '0' }); //needed for ie7 as opacity: 0 doesnt work in ie7

    function show() {
        $(this).siblings(".borders").stop().animate({
            'opacity': '1'
        }, 1000);
    }

    function hide() {
        $(".borders").stop().animate({
            'opacity': '0'
        });
        $(".active").stop().animate({
            'opacity': '1'
        });
    }

    $("nav ul li a").mouseenter(show).mouseleave(hide);

    $("#post-code").click(function () {
        $("#map-form form").attr("target", "_blank")
    });

    $("nav ul li .active").css({
        'opacity': '1'
    });
});
/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function($) {
	var tmp, loading, overlay, wrap, outer, content, close, title, nav_left, nav_right,

		selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

		ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

		loadingTimer, loadingFrame = 1,

		titleHeight = 0, titleStr = '', start_pos, final_pos, busy = false, fx = $.extend($('<div/>')[0], { prop: 0 }),

		isIE6 = $.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest,

		/*
		 * Private methods 
		 */

		_abort = function() {
			loading.hide();

			imgPreloader.onerror = imgPreloader.onload = null;

			if (ajaxLoader) {
				ajaxLoader.abort();
			}

			tmp.empty();
		},

		_error = function() {
			if (false === selectedOpts.onError(selectedArray, selectedIndex, selectedOpts)) {
				loading.hide();
				busy = false;
				return;
			}

			selectedOpts.titleShow = false;

			selectedOpts.width = 'auto';
			selectedOpts.height = 'auto';

			tmp.html( '<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>' );

			_process_inline();
		},

		_start = function() {
			var obj = selectedArray[ selectedIndex ],
				href, 
				type, 
				title,
				str,
				emb,
				ret;

			_abort();

			selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));

			ret = selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts);

			if (ret === false) {
				busy = false;
				return;
			} else if (typeof ret == 'object') {
				selectedOpts = $.extend(selectedOpts, ret);
			}

			title = selectedOpts.title || (obj.nodeName ? $(obj).attr('title') : obj.title) || '';

			if (obj.nodeName && !selectedOpts.orig) {
				selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
			}

			if (title === '' && selectedOpts.orig && selectedOpts.titleFromAlt) {
				title = selectedOpts.orig.attr('alt');
			}

			href = selectedOpts.href || (obj.nodeName ? $(obj).attr('href') : obj.href) || null;

			if ((/^(?:javascript)/i).test(href) || href == '#') {
				href = null;
			}

			if (selectedOpts.type) {
				type = selectedOpts.type;

				if (!href) {
					href = selectedOpts.content;
				}

			} else if (selectedOpts.content) {
				type = 'html';

			} else if (href) {
				if (href.match(imgRegExp)) {
					type = 'image';

				} else if (href.match(swfRegExp)) {
					type = 'swf';

				} else if ($(obj).hasClass("iframe")) {
					type = 'iframe';

				} else if (href.indexOf("#") === 0) {
					type = 'inline';

				} else {
					type = 'ajax';
				}
			}

			if (!type) {
				_error();
				return;
			}

			if (type == 'inline') {
				obj	= href.substr(href.indexOf("#"));
				type = $(obj).length > 0 ? 'inline' : 'ajax';
			}

			selectedOpts.type = type;
			selectedOpts.href = href;
			selectedOpts.title = title;

			if (selectedOpts.autoDimensions) {
				if (selectedOpts.type == 'html' || selectedOpts.type == 'inline' || selectedOpts.type == 'ajax') {
					selectedOpts.width = 'auto';
					selectedOpts.height = 'auto';
				} else {
					selectedOpts.autoDimensions = false;	
				}
			}

			if (selectedOpts.modal) {
				selectedOpts.overlayShow = true;
				selectedOpts.hideOnOverlayClick = false;
				selectedOpts.hideOnContentClick = false;
				selectedOpts.enableEscapeButton = false;
				selectedOpts.showCloseButton = false;
			}

			selectedOpts.padding = parseInt(selectedOpts.padding, 10);
			selectedOpts.margin = parseInt(selectedOpts.margin, 10);

			tmp.css('padding', (selectedOpts.padding + selectedOpts.margin));

			$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
				$(this).replaceWith(content.children());				
			});

			switch (type) {
				case 'html' :
					tmp.html( selectedOpts.content );
					_process_inline();
				break;

				case 'inline' :
					if ( $(obj).parent().is('#fancybox-content') === true) {
						busy = false;
						return;
					}

					$('<div class="fancybox-inline-tmp" />')
						.hide()
						.insertBefore( $(obj) )
						.bind('fancybox-cleanup', function() {
							$(this).replaceWith(content.children());
						}).bind('fancybox-cancel', function() {
							$(this).replaceWith(tmp.children());
						});

					$(obj).appendTo(tmp);

					_process_inline();
				break;

				case 'image':
					busy = false;

					$.fancybox.showActivity();

					imgPreloader = new Image();

					imgPreloader.onerror = function() {
						_error();
					};

					imgPreloader.onload = function() {
						busy = true;

						imgPreloader.onerror = imgPreloader.onload = null;

						_process_image();
					};

					imgPreloader.src = href;
				break;

				case 'swf':
					selectedOpts.scrolling = 'no';

					str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
					emb = '';

					$.each(selectedOpts.swf, function(name, val) {
						str += '<param name="' + name + '" value="' + val + '"></param>';
						emb += ' ' + name + '="' + val + '"';
					});

					str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

					tmp.html(str);

					_process_inline();
				break;

				case 'ajax':
					busy = false;

					$.fancybox.showActivity();

					selectedOpts.ajax.win = selectedOpts.ajax.success;

					ajaxLoader = $.ajax($.extend({}, selectedOpts.ajax, {
						url	: href,
						data : selectedOpts.ajax.data || {},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							if ( XMLHttpRequest.status > 0 ) {
								_error();
							}
						},
						success : function(data, textStatus, XMLHttpRequest) {
							var o = typeof XMLHttpRequest == 'object' ? XMLHttpRequest : ajaxLoader;
							if (o.status == 200) {
								if ( typeof selectedOpts.ajax.win == 'function' ) {
									ret = selectedOpts.ajax.win(href, data, textStatus, XMLHttpRequest);

									if (ret === false) {
										loading.hide();
										return;
									} else if (typeof ret == 'string' || typeof ret == 'object') {
										data = ret;
									}
								}

								tmp.html( data );
								_process_inline();
							}
						}
					}));

				break;

				case 'iframe':
					_show();
				break;
			}
		},

		_process_inline = function() {
			var
				w = selectedOpts.width,
				h = selectedOpts.height;

			if (w.toString().indexOf('%') > -1) {
				w = parseInt( ($(window).width() - (selectedOpts.margin * 2)) * parseFloat(w) / 100, 10) + 'px';

			} else {
				w = w == 'auto' ? 'auto' : w + 'px';	
			}

			if (h.toString().indexOf('%') > -1) {
				h = parseInt( ($(window).height() - (selectedOpts.margin * 2)) * parseFloat(h) / 100, 10) + 'px';

			} else {
				h = h == 'auto' ? 'auto' : h + 'px';	
			}

			tmp.wrapInner('<div style="width:' + w + ';height:' + h + ';overflow: ' + (selectedOpts.scrolling == 'auto' ? 'auto' : (selectedOpts.scrolling == 'yes' ? 'scroll' : 'hidden')) + ';position:relative;"></div>');

			selectedOpts.width = tmp.width();
			selectedOpts.height = tmp.height();

			_show();
		},

		_process_image = function() {
			selectedOpts.width = imgPreloader.width;
			selectedOpts.height = imgPreloader.height;

			$("<img />").attr({
				'id' : 'fancybox-img',
				'src' : imgPreloader.src,
				'alt' : selectedOpts.title
			}).appendTo( tmp );

			_show();
		},

		_show = function() {
			var pos, equal;

			loading.hide();

			if (wrap.is(":visible") && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
				$.event.trigger('fancybox-cancel');

				busy = false;
				return;
			}

			busy = true;

			$(content.add( overlay )).unbind();

			$(window).unbind("resize.fb scroll.fb");
			$(document).unbind('keydown.fb');

			if (wrap.is(":visible") && currentOpts.titlePosition !== 'outside') {
				wrap.css('height', wrap.height());
			}

			currentArray = selectedArray;
			currentIndex = selectedIndex;
			currentOpts = selectedOpts;

			if (currentOpts.overlayShow) {
				overlay.css({
					'background-color' : currentOpts.overlayColor,
					'opacity' : currentOpts.overlayOpacity,
					'cursor' : currentOpts.hideOnOverlayClick ? 'pointer' : 'auto',
					'height' : $(document).height()
				});

				if (!overlay.is(':visible')) {
					if (isIE6) {
						$('select:not(#fancybox-tmp select)').filter(function() {
							return this.style.visibility !== 'hidden';
						}).css({'visibility' : 'hidden'}).one('fancybox-cleanup', function() {
							this.style.visibility = 'inherit';
						});
					}

					overlay.show();
				}
			} else {
				overlay.hide();
			}

			final_pos = _get_zoom_to();

			_process_title();

			if (wrap.is(":visible")) {
				$( close.add( nav_left ).add( nav_right ) ).hide();

				pos = wrap.position(),

				start_pos = {
					top	 : pos.top,
					left : pos.left,
					width : wrap.width(),
					height : wrap.height()
				};

				equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

				content.fadeTo(currentOpts.changeFade, 0.3, function() {
					var finish_resizing = function() {
						content.html( tmp.contents() ).fadeTo(currentOpts.changeFade, 1, _finish);
					};

					$.event.trigger('fancybox-change');

					content
						.empty()
						.removeAttr('filter')
						.css({
							'border-width' : currentOpts.padding,
							'width'	: final_pos.width - currentOpts.padding * 2,
							'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
						});

					if (equal) {
						finish_resizing();

					} else {
						fx.prop = 0;

						$(fx).animate({prop: 1}, {
							 duration : currentOpts.changeSpeed,
							 easing : currentOpts.easingChange,
							 step : _draw,
							 complete : finish_resizing
						});
					}
				});

				return;
			}

			wrap.removeAttr("style");

			content.css('border-width', currentOpts.padding);

			if (currentOpts.transitionIn == 'elastic') {
				start_pos = _get_zoom_from();

				content.html( tmp.contents() );

				wrap.show();

				if (currentOpts.opacity) {
					final_pos.opacity = 0;
				}

				fx.prop = 0;

				$(fx).animate({prop: 1}, {
					 duration : currentOpts.speedIn,
					 easing : currentOpts.easingIn,
					 step : _draw,
					 complete : _finish
				});

				return;
			}

			if (currentOpts.titlePosition == 'inside' && titleHeight > 0) {	
				title.show();	
			}

			content
				.css({
					'width' : final_pos.width - currentOpts.padding * 2,
					'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
				})
				.html( tmp.contents() );

			wrap
				.css(final_pos)
				.fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
		},

		_format_title = function(title) {
			if (title && title.length) {
				if (currentOpts.titlePosition == 'float') {
					return '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + title + '</td><td id="fancybox-title-float-right"></td></tr></table>';
				}

				return '<div id="fancybox-title-' + currentOpts.titlePosition + '">' + title + '</div>';
			}

			return false;
		},

		_process_title = function() {
			titleStr = currentOpts.title || '';
			titleHeight = 0;

			title
				.empty()
				.removeAttr('style')
				.removeClass();

			if (currentOpts.titleShow === false) {
				title.hide();
				return;
			}

			titleStr = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(titleStr, currentArray, currentIndex, currentOpts) : _format_title(titleStr);

			if (!titleStr || titleStr === '') {
				title.hide();
				return;
			}

			title
				.addClass('fancybox-title-' + currentOpts.titlePosition)
				.html( titleStr )
				.appendTo( 'body' )
				.show();

			switch (currentOpts.titlePosition) {
				case 'inside':
					title
						.css({
							'width' : final_pos.width - (currentOpts.padding * 2),
							'marginLeft' : currentOpts.padding,
							'marginRight' : currentOpts.padding
						});

					titleHeight = title.outerHeight(true);

					title.appendTo( outer );

					final_pos.height += titleHeight;
				break;

				case 'over':
					title
						.css({
							'marginLeft' : currentOpts.padding,
							'width'	: final_pos.width - (currentOpts.padding * 2),
							'bottom' : currentOpts.padding
						})
						.appendTo( outer );
				break;

				case 'float':
					title
						.css('left', parseInt((title.width() - final_pos.width - 40)/ 2, 10) * -1)
						.appendTo( wrap );
				break;

				default:
					title
						.css({
							'width' : final_pos.width - (currentOpts.padding * 2),
							'paddingLeft' : currentOpts.padding,
							'paddingRight' : currentOpts.padding
						})
						.appendTo( wrap );
				break;
			}

			title.hide();
		},

		_set_navigation = function() {
			if (currentOpts.enableEscapeButton || currentOpts.enableKeyboardNav) {
				$(document).bind('keydown.fb', function(e) {
					if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
						e.preventDefault();
						$.fancybox.close();

					} else if ((e.keyCode == 37 || e.keyCode == 39) && currentOpts.enableKeyboardNav && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
						e.preventDefault();
						$.fancybox[ e.keyCode == 37 ? 'prev' : 'next']();
					}
				});
			}

			if (!currentOpts.showNavArrows) { 
				nav_left.hide();
				nav_right.hide();
				return;
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
				nav_left.show();
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
				nav_right.show();
			}
		},

		_finish = function () {
			if (!$.support.opacity) {
				content.get(0).style.removeAttribute('filter');
				wrap.get(0).style.removeAttribute('filter');
			}

			if (selectedOpts.autoDimensions) {
				content.css('height', 'auto');
			}

			wrap.css('height', 'auto');

			if (titleStr && titleStr.length) {
				title.show();
			}

			if (currentOpts.showCloseButton) {
				close.show();
			}

			_set_navigation();
	
			if (currentOpts.hideOnContentClick)	{
				content.bind('click', $.fancybox.close);
			}

			if (currentOpts.hideOnOverlayClick)	{
				overlay.bind('click', $.fancybox.close);
			}

			$(window).bind("resize.fb", $.fancybox.resize);

			if (currentOpts.centerOnScroll) {
				$(window).bind("scroll.fb", $.fancybox.center);
			}

			if (currentOpts.type == 'iframe') {
				$('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + ($.browser.msie ? 'allowtransparency="true""' : '') + ' scrolling="' + selectedOpts.scrolling + '" src="' + currentOpts.href + '"></iframe>').appendTo(content);
			}

			wrap.show();

			busy = false;

			$.fancybox.center();

			currentOpts.onComplete(currentArray, currentIndex, currentOpts);

			_preload_images();
		},

		_preload_images = function() {
			var href, 
				objNext;

			if ((currentArray.length -1) > currentIndex) {
				href = currentArray[ currentIndex + 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (currentIndex > 0) {
				href = currentArray[ currentIndex - 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		},

		_draw = function(pos) {
			var dim = {
				width : parseInt(start_pos.width + (final_pos.width - start_pos.width) * pos, 10),
				height : parseInt(start_pos.height + (final_pos.height - start_pos.height) * pos, 10),

				top : parseInt(start_pos.top + (final_pos.top - start_pos.top) * pos, 10),
				left : parseInt(start_pos.left + (final_pos.left - start_pos.left) * pos, 10)
			};

			if (typeof final_pos.opacity !== 'undefined') {
				dim.opacity = pos < 0.5 ? 0.5 : pos;
			}

			wrap.css(dim);

			content.css({
				'width' : dim.width - currentOpts.padding * 2,
				'height' : dim.height - (titleHeight * pos) - currentOpts.padding * 2
			});
		},

		_get_viewport = function() {
			return [
				$(window).width() - (currentOpts.margin * 2),
				$(window).height() - (currentOpts.margin * 2),
				$(document).scrollLeft() + currentOpts.margin,
				$(document).scrollTop() + currentOpts.margin
			];
		},

		_get_zoom_to = function () {
			var view = _get_viewport(),
				to = {},
				resize = currentOpts.autoScale,
				double_padding = currentOpts.padding * 2,
				ratio;

			if (currentOpts.width.toString().indexOf('%') > -1) {
				to.width = parseInt((view[0] * parseFloat(currentOpts.width)) / 100, 10);
			} else {
				to.width = currentOpts.width + double_padding;
			}

			if (currentOpts.height.toString().indexOf('%') > -1) {
				to.height = parseInt((view[1] * parseFloat(currentOpts.height)) / 100, 10);
			} else {
				to.height = currentOpts.height + double_padding;
			}

			if (resize && (to.width > view[0] || to.height > view[1])) {
				if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
					ratio = (currentOpts.width ) / (currentOpts.height );

					if ((to.width ) > view[0]) {
						to.width = view[0];
						to.height = parseInt(((to.width - double_padding) / ratio) + double_padding, 10);
					}

					if ((to.height) > view[1]) {
						to.height = view[1];
						to.width = parseInt(((to.height - double_padding) * ratio) + double_padding, 10);
					}

				} else {
					to.width = Math.min(to.width, view[0]);
					to.height = Math.min(to.height, view[1]);
				}
			}

			to.top = parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - to.height - 40) * 0.5)), 10);
			to.left = parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - to.width - 40) * 0.5)), 10);

			return to;
		},

		_get_obj_pos = function(obj) {
			var pos = obj.offset();

			pos.top += parseInt( obj.css('paddingTop'), 10 ) || 0;
			pos.left += parseInt( obj.css('paddingLeft'), 10 ) || 0;

			pos.top += parseInt( obj.css('border-top-width'), 10 ) || 0;
			pos.left += parseInt( obj.css('border-left-width'), 10 ) || 0;

			pos.width = obj.width();
			pos.height = obj.height();

			return pos;
		},

		_get_zoom_from = function() {
			var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
				from = {},
				pos,
				view;

			if (orig && orig.length) {
				pos = _get_obj_pos(orig);

				from = {
					width : pos.width + (currentOpts.padding * 2),
					height : pos.height + (currentOpts.padding * 2),
					top	: pos.top - currentOpts.padding - 20,
					left : pos.left - currentOpts.padding - 20
				};

			} else {
				view = _get_viewport();

				from = {
					width : currentOpts.padding * 2,
					height : currentOpts.padding * 2,
					top	: parseInt(view[3] + view[1] * 0.5, 10),
					left : parseInt(view[2] + view[0] * 0.5, 10)
				};
			}

			return from;
		},

		_animate_loading = function() {
			if (!loading.is(':visible')){
				clearInterval(loadingTimer);
				return;
			}

			$('div', loading).css('top', (loadingFrame * -40) + 'px');

			loadingFrame = (loadingFrame + 1) % 12;
		};

	/*
	 * Public methods 
	 */

	$.fn.fancybox = function(options) {
		if (!$(this).length) {
			return this;
		}

		$(this)
			.data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
			.unbind('click.fb')
			.bind('click.fb', function(e) {
				e.preventDefault();

				if (busy) {
					return;
				}

				busy = true;

				$(this).blur();

				selectedArray = [];
				selectedIndex = 0;

				var rel = $(this).attr('rel') || '';

				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);

				} else {
					selectedArray = $("a[rel=" + rel + "], area[rel=" + rel + "]");
					selectedIndex = selectedArray.index( this );
				}

				_start();

				return;
			});

		return this;
	};

	$.fancybox = function(obj) {
		var opts;

		if (busy) {
			return;
		}

		busy = true;
		opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

		selectedArray = [];
		selectedIndex = parseInt(opts.index, 10) || 0;

		if ($.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					$(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
				} else {
					obj[i] = $({}).data('fancybox', $.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				$(obj).data('fancybox', $.extend({}, opts, obj));
			} else {
				obj = $({}).data('fancybox', $.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		if (selectedIndex > selectedArray.length || selectedIndex < 0) {
			selectedIndex = 0;
		}

		_start();
	};

	$.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(_animate_loading, 66);
	};

	$.fancybox.hideActivity = function() {
		loading.hide();
	};

	$.fancybox.next = function() {
		return $.fancybox.pos( currentIndex + 1);
	};

	$.fancybox.prev = function() {
		return $.fancybox.pos( currentIndex - 1);
	};

	$.fancybox.pos = function(pos) {
		if (busy) {
			return;
		}

		pos = parseInt(pos);

		selectedArray = currentArray;

		if (pos > -1 && pos < currentArray.length) {
			selectedIndex = pos;
			_start();

		} else if (currentOpts.cyclic && currentArray.length > 1) {
			selectedIndex = pos >= currentArray.length ? 0 : currentArray.length - 1;
			_start();
		}

		return;
	};

	$.fancybox.cancel = function() {
		if (busy) {
			return;
		}

		busy = true;

		$.event.trigger('fancybox-cancel');

		_abort();

		selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);

		busy = false;
	};

	// Note: within an iframe use - parent.$.fancybox.close();
	$.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		if (currentOpts && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
			busy = false;
			return;
		}

		_abort();

		$(close.add( nav_left ).add( nav_right )).hide();

		$(content.add( overlay )).unbind();

		$(window).unbind("resize.fb scroll.fb");
		$(document).unbind('keydown.fb');

		content.find('iframe').attr('src', isIE6 && /^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank');

		if (currentOpts.titlePosition !== 'inside') {
			title.empty();
		}

		wrap.stop();

		function _cleanup() {
			overlay.fadeOut('fast');

			title.empty().hide();
			wrap.hide();

			$.event.trigger('fancybox-cleanup');

			content.empty();

			currentOpts.onClosed(currentArray, currentIndex, currentOpts);

			currentArray = selectedOpts	= [];
			currentIndex = selectedIndex = 0;
			currentOpts = selectedOpts	= {};

			busy = false;
		}

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = _get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top	 : pos.top ,
				left : pos.left,
				width :	wrap.width(),
				height : wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			title.empty().hide();

			fx.prop = 1;

			$(fx).animate({ prop: 0 }, {
				 duration : currentOpts.speedOut,
				 easing : currentOpts.easingOut,
				 step : _draw,
				 complete : _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	$.fancybox.resize = function() {
		if (overlay.is(':visible')) {
			overlay.css('height', $(document).height());
		}

		$.fancybox.center(true);
	};

	$.fancybox.center = function() {
		var view, align;

		if (busy) {
			return;	
		}

		align = arguments[0] === true ? 1 : 0;
		view = _get_viewport();

		if (!align && (wrap.width() > view[0] || wrap.height() > view[1])) {
			return;	
		}

		wrap
			.stop()
			.animate({
				'top' : parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - content.height() - 40) * 0.5) - currentOpts.padding)),
				'left' : parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - content.width() - 40) * 0.5) - currentOpts.padding))
			}, typeof arguments[0] == 'number' ? arguments[0] : 200);
	};

	$.fancybox.init = function() {
		if ($("#fancybox-wrap").length) {
			return;
		}

		$('body').append(
			tmp	= $('<div id="fancybox-tmp"></div>'),
			loading	= $('<div id="fancybox-loading"><div></div></div>'),
			overlay	= $('<div id="fancybox-overlay"></div>'),
			wrap = $('<div id="fancybox-wrap"></div>')
		);

		outer = $('<div id="fancybox-outer"></div>')
			.append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>')
			.appendTo( wrap );

		outer.append(
			content = $('<div id="fancybox-content"></div>'),
			close = $('<a id="fancybox-close"></a>'),
			title = $('<div id="fancybox-title"></div>'),

			nav_left = $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
			nav_right = $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
		);

		close.click($.fancybox.close);
		loading.click($.fancybox.cancel);

		nav_left.click(function(e) {
			e.preventDefault();
			$.fancybox.prev();
		});

		nav_right.click(function(e) {
			e.preventDefault();
			$.fancybox.next();
		});

		if ($.fn.mousewheel) {
			wrap.bind('mousewheel.fb', function(e, delta) {
				if (busy) {
					e.preventDefault();

				} else if ($(e.target).get(0).clientHeight == 0 || $(e.target).get(0).scrollHeight === $(e.target).get(0).clientHeight) {
					e.preventDefault();
					$.fancybox[ delta > 0 ? 'prev' : 'next']();
				}
			});
		}

		if (!$.support.opacity) {
			wrap.addClass('fancybox-ie');
		}

		if (isIE6) {
			loading.addClass('fancybox-ie6');
			wrap.addClass('fancybox-ie6');

			$('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank' ) + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer);
		}
	};

	$.fn.fancybox.defaults = {
		padding : 10,
		margin : 40,
		opacity : false,
		modal : false,
		cyclic : false,
		scrolling : 'auto',	// 'auto', 'yes' or 'no'

		width : 560,
		height : 340,

		autoScale : true,
		autoDimensions : true,
		centerOnScroll : false,

		ajax : {},
		swf : { wmode: 'transparent' },

		hideOnOverlayClick : true,
		hideOnContentClick : false,

		overlayShow : true,
		overlayOpacity : 0.7,
		overlayColor : '#333',

		titleShow : true,
		titlePosition : 'float', // 'float', 'outside', 'inside' or 'over'
		titleFormat : null,
		titleFromAlt : false,

		transitionIn : 'fade', // 'elastic', 'fade' or 'none'
		transitionOut : 'fade', // 'elastic', 'fade' or 'none'

		speedIn : 300,
		speedOut : 300,

		changeSpeed : 300,
		changeFade : 'fast',

		easingIn : 'swing',
		easingOut : 'swing',

		showCloseButton	 : true,
		showNavArrows : true,
		enableEscapeButton : true,
		enableKeyboardNav : true,

		onStart : function(){},
		onCancel : function(){},
		onComplete : function(){},
		onCleanup : function(){},
		onClosed : function(){},
		onError : function(){}
	};

	$(document).ready(function() {
		$.fancybox.init();
	});

})(jQuery);
/*
* jQuery Tools 1.2.5 - The missing UI library for the Web
* 
* [toolbox.flashembed, toolbox.history, toolbox.expose, toolbox.mousewheel, tabs, tabs.slideshow, tooltip, tooltip.slide, tooltip.dynamic, scrollable, scrollable.autoscroll, scrollable.navigator, overlay, overlay.apple, dateinput, rangeinput, validator]
* 
* NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
* 
* http://flowplayer.org/tools/
* 
* jquery.event.wheel.js - rev 1 
* Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
* Liscensed under the MIT License (MIT-LICENSE.txt)
* http://www.opensource.org/licenses/mit-license.php
* Created: 2008-07-01 | Updated: 2008-07-14
* 
* -----
* 
* File generated: Wed Sep 22 06:12:53 GMT 2010
*/
(function () {
    function f(a, b) { if (b) for (var c in b) if (b.hasOwnProperty(c)) a[c] = b[c]; return a } function l(a, b) { var c = []; for (var d in a) if (a.hasOwnProperty(d)) c[d] = b(a[d]); return c } function m(a, b, c) {
        if (e.isSupported(b.version)) a.innerHTML = e.getHTML(b, c); else if (b.expressInstall && e.isSupported([6, 65])) a.innerHTML = e.getHTML(f(b, { src: b.expressInstall }), { MMredirectURL: location.href, MMplayerType: "PlugIn", MMdoctitle: document.title }); else {
            if (!a.innerHTML.replace(/\s/g, "")) {
                a.innerHTML = "<h2>Flash version " + b.version +
" or greater is required</h2><h3>" + (g[0] > 0 ? "Your version is " + g : "You have no flash plugin installed") + "</h3>" + (a.tagName == "A" ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='" + k + "'>here</a></p>"); if (a.tagName == "A") a.onclick = function () { location.href = k } 
            } if (b.onFail) { var d = b.onFail.call(this); if (typeof d == "string") a.innerHTML = d } 
        } if (i) window[b.id] = document.getElementById(b.id); f(this, { getRoot: function () { return a }, getOptions: function () { return b }, getConf: function () { return c },
            getApi: function () { return a.firstChild } 
        })
    } var i = document.all, k = "http://www.adobe.com/go/getflashplayer", n = typeof jQuery == "function", o = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/, j = { width: "100%", height: "100%", id: "_" + ("" + Math.random()).slice(9), allowfullscreen: true, allowscriptaccess: "always", quality: "high", version: [3, 0], onFail: null, expressInstall: null, w3c: false, cachebusting: false }; window.attachEvent && window.attachEvent("onbeforeunload", function () { __flash_unloadHandler = function () { }; __flash_savedUnloadHandler = function () { } });
    window.flashembed = function (a, b, c) { if (typeof a == "string") a = document.getElementById(a.replace("#", "")); if (a) { if (typeof b == "string") b = { src: b }; return new m(a, f(f({}, j), b), c) } }; var e = f(window.flashembed, { conf: j, getVersion: function () {
        var a, b; try { b = navigator.plugins["Shockwave Flash"].description.slice(16) } catch (c) { try { b = (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")) && a.GetVariable("$version") } catch (d) { try { b = (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")) && a.GetVariable("$version") } catch (h) { } } } return (b =
o.exec(b)) ? [b[1], b[3]] : [0, 0]
    }, asString: function (a) {
        if (a === null || a === undefined) return null; var b = typeof a; if (b == "object" && a.push) b = "array"; switch (b) { case "string": a = a.replace(new RegExp('(["\\\\])', "g"), "\\$1"); a = a.replace(/^\s?(\d+\.?\d+)%/, "$1pct"); return '"' + a + '"'; case "array": return "[" + l(a, function (d) { return e.asString(d) }).join(",") + "]"; case "function": return '"function()"'; case "object": b = []; for (var c in a) a.hasOwnProperty(c) && b.push('"' + c + '":' + e.asString(a[c])); return "{" + b.join(",") + "}" } return String(a).replace(/\s/g,
" ").replace(/\'/g, '"')
    }, getHTML: function (a, b) {
        a = f({}, a); var c = '<object width="' + a.width + '" height="' + a.height + '" id="' + a.id + '" name="' + a.id + '"'; if (a.cachebusting) a.src += (a.src.indexOf("?") != -1 ? "&" : "?") + Math.random(); c += a.w3c || !i ? ' data="' + a.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'; c += ">"; if (a.w3c || i) c += '<param name="movie" value="' + a.src + '" />'; a.width = a.height = a.id = a.w3c = a.src = null; a.onFail = a.version = a.expressInstall = null; for (var d in a) if (a[d]) c +=
'<param name="' + d + '" value="' + a[d] + '" />'; a = ""; if (b) { for (var h in b) if (b[h]) { d = b[h]; a += h + "=" + (/function|object/.test(typeof d) ? e.asString(d) : d) + "&" } a = a.slice(0, -1); c += '<param name="flashvars" value=\'' + a + "' />" } c += "</object>"; return c
    }, isSupported: function (a) { return g[0] > a[0] || g[0] == a[0] && g[1] >= a[1] } 
    }), g = e.getVersion(); if (n) {
        jQuery.tools = jQuery.tools || { version: "1.2.5" }; jQuery.tools.flashembed = { conf: j }; jQuery.fn.flashembed = function (a, b) {
            return this.each(function () {
                $(this).data("flashembed", flashembed(this,
a, b))
            })
        } 
    } 
})();
(function (b) {
    function h(c) { if (c) { var a = d.contentWindow.document; a.open().close(); a.location.hash = c } } var g, d, f, i; b.tools = b.tools || { version: "1.2.5" }; b.tools.history = { init: function (c) {
        if (!i) {
            if (b.browser.msie && b.browser.version < "8") { if (!d) { d = b("<iframe/>").attr("src", "javascript:false;").hide().get(0); b("body").append(d); setInterval(function () { var a = d.contentWindow.document; a = a.location.hash; g !== a && b.event.trigger("hash", a) }, 100); h(location.hash || "#") } } else setInterval(function () {
                var a = location.hash;
                a !== g && b.event.trigger("hash", a)
            }, 100); f = !f ? c : f.add(c); c.click(function (a) { var e = b(this).attr("href"); d && h(e); if (e.slice(0, 1) != "#") { location.href = "#" + e; return a.preventDefault() } }); i = true
        } 
    } 
    }; b(window).bind("hash", function (c, a) { a ? f.filter(function () { var e = b(this).attr("href"); return e == a || e == a.replace("#", "") }).trigger("history", [a]) : f.eq(0).trigger("history", [a]); g = a }); b.fn.history = function (c) { b.tools.history.init(this); return this.bind("history", c) } 
})(jQuery);
(function (b) {
    function k() { if (b.browser.msie) { var a = b(document).height(), d = b(window).height(); return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, a - d < 20 ? d : a] } return [b(document).width(), b(document).height()] } function h(a) { if (a) return a.call(b.mask) } b.tools = b.tools || { version: "1.2.5" }; var l; l = b.tools.expose = { conf: { maskId: "exposeMask", loadSpeed: "slow", closeSpeed: "fast", closeOnClick: true, closeOnEsc: true, zIndex: 9998, opacity: 0.8, startOpacity: 0, color: "#fff", onLoad: null,
        onClose: null
    }
    }; var c, i, e, g, j; b.mask = { load: function (a, d) {
        if (e) return this; if (typeof a == "string") a = { color: a }; a = a || g; g = a = b.extend(b.extend({}, l.conf), a); c = b("#" + a.maskId); if (!c.length) { c = b("<div/>").attr("id", a.maskId); b("body").append(c) } var m = k(); c.css({ position: "absolute", top: 0, left: 0, width: m[0], height: m[1], display: "none", opacity: a.startOpacity, zIndex: a.zIndex }); a.color && c.css("backgroundColor", a.color); if (h(a.onBeforeLoad) === false) return this; a.closeOnEsc && b(document).bind("keydown.mask", function (f) {
            f.keyCode ==
27 && b.mask.close(f)
        }); a.closeOnClick && c.bind("click.mask", function (f) { b.mask.close(f) }); b(window).bind("resize.mask", function () { b.mask.fit() }); if (d && d.length) { j = d.eq(0).css("zIndex"); b.each(d, function () { var f = b(this); /relative|absolute|fixed/i.test(f.css("position")) || f.css("position", "relative") }); i = d.css({ zIndex: Math.max(a.zIndex + 1, j == "auto" ? 0 : j) }) } c.css({ display: "block" }).fadeTo(a.loadSpeed, a.opacity, function () { b.mask.fit(); h(a.onLoad); e = "full" }); e = true; return this
    }, close: function () {
        if (e) {
            if (h(g.onBeforeClose) ===
false) return this; c.fadeOut(g.closeSpeed, function () { h(g.onClose); i && i.css({ zIndex: j }); e = false }); b(document).unbind("keydown.mask"); c.unbind("click.mask"); b(window).unbind("resize.mask")
        } return this
    }, fit: function () { if (e) { var a = k(); c.css({ width: a[0], height: a[1] }) } }, getMask: function () { return c }, isLoaded: function (a) { return a ? e == "full" : e }, getConf: function () { return g }, getExposed: function () { return i } 
    }; b.fn.mask = function (a) { b.mask.load(a); return this }; b.fn.expose = function (a) { b.mask.load(a, this); return this } 
})(jQuery);
(function (b) {
    function c(a) { switch (a.type) { case "mousemove": return b.extend(a.data, { clientX: a.clientX, clientY: a.clientY, pageX: a.pageX, pageY: a.pageY }); case "DOMMouseScroll": b.extend(a, a.data); a.delta = -a.detail / 3; break; case "mousewheel": a.delta = a.wheelDelta / 120; break } a.type = "wheel"; return b.event.handle.call(this, a, a.delta) } b.fn.mousewheel = function (a) { return this[a ? "bind" : "trigger"]("wheel", a) }; b.event.special.wheel = { setup: function () { b.event.add(this, d, c, {}) }, teardown: function () {
        b.event.remove(this,
d, c)
    } 
    }; var d = !b.browser.mozilla ? "mousewheel" : "DOMMouseScroll" + (b.browser.version < "1.9" ? " mousemove" : "")
})(jQuery);
(function (c) {
    function p(d, b, a) {
        var e = this, l = d.add(this), h = d.find(a.tabs), i = b.jquery ? b : d.children(b), j; h.length || (h = d.children()); i.length || (i = d.parent().find(b)); i.length || (i = c(b)); c.extend(this, { click: function (f, g) {
            var k = h.eq(f); if (typeof f == "string" && f.replace("#", "")) { k = h.filter("[href*=" + f.replace("#", "") + "]"); f = Math.max(h.index(k), 0) } if (a.rotate) { var n = h.length - 1; if (f < 0) return e.click(n, g); if (f > n) return e.click(0, g) } if (!k.length) { if (j >= 0) return e; f = a.initialIndex; k = h.eq(f) } if (f === j) return e;
            g = g || c.Event(); g.type = "onBeforeClick"; l.trigger(g, [f]); if (!g.isDefaultPrevented()) { o[a.effect].call(e, f, function () { g.type = "onClick"; l.trigger(g, [f]) }); j = f; h.removeClass(a.current); k.addClass(a.current); return e } 
        }, getConf: function () { return a }, getTabs: function () { return h }, getPanes: function () { return i }, getCurrentPane: function () { return i.eq(j) }, getCurrentTab: function () { return h.eq(j) }, getIndex: function () { return j }, next: function () { return e.click(j + 1) }, prev: function () { return e.click(j - 1) }, destroy: function () {
            h.unbind(a.event).removeClass(a.current);
            i.find("a[href^=#]").unbind("click.T"); return e
        } 
        }); c.each("onBeforeClick,onClick".split(","), function (f, g) { c.isFunction(a[g]) && c(e).bind(g, a[g]); e[g] = function (k) { k && c(e).bind(g, k); return e } }); if (a.history && c.fn.history) { c.tools.history.init(h); a.event = "history" } h.each(function (f) { c(this).bind(a.event, function (g) { e.click(f, g); return g.preventDefault() }) }); i.find("a[href^=#]").bind("click.T", function (f) { e.click(c(this).attr("href"), f) }); if (location.hash && a.tabs == "a" && d.find("[href=" + location.hash + "]").length) e.click(location.hash);
        else if (a.initialIndex === 0 || a.initialIndex > 0) e.click(a.initialIndex)
    } c.tools = c.tools || { version: "1.2.5" }; c.tools.tabs = { conf: { tabs: "a", current: "current", onBeforeClick: null, onClick: null, effect: "default", initialIndex: 0, event: "click", rotate: false, history: false }, addEffect: function (d, b) { o[d] = b } }; var o = { "default": function (d, b) { this.getPanes().hide().eq(d).show(); b.call() }, fade: function (d, b) { var a = this.getConf(), e = a.fadeOutSpeed, l = this.getPanes(); e ? l.fadeOut(e) : l.hide(); l.eq(d).fadeIn(a.fadeInSpeed, b) }, slide: function (d,
b) { this.getPanes().slideUp(200); this.getPanes().eq(d).slideDown(400, b) }, ajax: function (d, b) { this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"), b) } 
    }, m; c.tools.tabs.addEffect("horizontal", function (d, b) { m || (m = this.getPanes().eq(0).width()); this.getCurrentPane().animate({ width: 0 }, function () { c(this).hide() }); this.getPanes().eq(d).animate({ width: m }, function () { c(this).show(); b.call() }) }); c.fn.tabs = function (d, b) {
        var a = this.data("tabs"); if (a) { a.destroy(); this.removeData("tabs") } if (c.isFunction(b)) b =
{ onBeforeClick: b }; b = c.extend({}, c.tools.tabs.conf, b); this.each(function () { a = new p(c(this), d, b); c(this).data("tabs", a) }); return b.api ? a : this
    } 
})(jQuery);
(function (c) {
    function p(g, a) {
        function m(f) { var e = c(f); return e.length < 2 ? e : g.parent().find(f) } var b = this, i = g.add(this), d = g.data("tabs"), h, j = true, n = m(a.next).click(function () { d.next() }), k = m(a.prev).click(function () { d.prev() }); c.extend(b, { getTabs: function () { return d }, getConf: function () { return a }, play: function () { if (h) return b; var f = c.Event("onBeforePlay"); i.trigger(f); if (f.isDefaultPrevented()) return b; h = setInterval(d.next, a.interval); j = false; i.trigger("onPlay"); return b }, pause: function () {
            if (!h) return b;
            var f = c.Event("onBeforePause"); i.trigger(f); if (f.isDefaultPrevented()) return b; h = clearInterval(h); i.trigger("onPause"); return b
        }, stop: function () { b.pause(); j = true } 
        }); c.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function (f, e) { c.isFunction(a[e]) && c(b).bind(e, a[e]); b[e] = function (q) { return c(b).bind(e, q) } }); a.autopause && d.getTabs().add(n).add(k).add(d.getPanes()).hover(b.pause, function () { j || b.play() }); a.autoplay && b.play(); a.clickable && d.getPanes().click(function () { d.next() }); if (!d.getConf().rotate) {
            var l =
a.disabledClass; d.getIndex() || k.addClass(l); d.onBeforeClick(function (f, e) { k.toggleClass(l, !e); n.toggleClass(l, e == d.getTabs().length - 1) })
        } 
    } var o; o = c.tools.tabs.slideshow = { conf: { next: ".forward", prev: ".backward", disabledClass: "disabled", autoplay: false, autopause: true, interval: 3E3, clickable: true, api: false} }; c.fn.slideshow = function (g) { var a = this.data("slideshow"); if (a) return a; g = c.extend({}, o.conf, g); this.each(function () { a = new p(c(this), g); c(this).data("slideshow", a) }); return g.api ? a : this } 
})(jQuery);
(function (f) {
    function p(a, b, c) { var h = c.relative ? a.position().top : a.offset().top, d = c.relative ? a.position().left : a.offset().left, i = c.position[0]; h -= b.outerHeight() - c.offset[0]; d += a.outerWidth() + c.offset[1]; if (/iPad/i.test(navigator.userAgent)) h -= f(window).scrollTop(); var j = b.outerHeight() + a.outerHeight(); if (i == "center") h += j / 2; if (i == "bottom") h += j; i = c.position[1]; a = b.outerWidth() + a.outerWidth(); if (i == "center") d -= a / 2; if (i == "left") d -= a; return { top: h, left: d} } function u(a, b) {
        var c = this, h = a.add(c), d, i = 0, j =
0, m = a.attr("title"), q = a.attr("data-tooltip"), r = o[b.effect], l, s = a.is(":input"), v = s && a.is(":checkbox, :radio, select, :button, :submit"), t = a.attr("type"), k = b.events[t] || b.events[s ? v ? "widget" : "input" : "def"]; if (!r) throw 'Nonexistent effect "' + b.effect + '"'; k = k.split(/,\s*/); if (k.length != 2) throw "Tooltip: bad events configuration for " + t; a.bind(k[0], function (e) { clearTimeout(i); if (b.predelay) j = setTimeout(function () { c.show(e) }, b.predelay); else c.show(e) }).bind(k[1], function (e) {
    clearTimeout(j); if (b.delay) i =
setTimeout(function () { c.hide(e) }, b.delay); else c.hide(e)
}); if (m && b.cancelDefault) { a.removeAttr("title"); a.data("title", m) } f.extend(c, { show: function (e) {
    if (!d) { if (q) d = f(q); else if (b.tip) d = f(b.tip).eq(0); else if (m) d = f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m); else { d = a.next(); d.length || (d = a.parent().next()) } if (!d.length) throw "Cannot find tooltip for " + a; } if (c.isShown()) return c; d.stop(true, true); var g = p(a, d, b); b.tip && d.html(a.data("title")); e = e || f.Event(); e.type = "onBeforeShow";
    h.trigger(e, [g]); if (e.isDefaultPrevented()) return c; g = p(a, d, b); d.css({ position: "absolute", top: g.top, left: g.left }); l = true; r[0].call(c, function () { e.type = "onShow"; l = "full"; h.trigger(e) }); g = b.events.tooltip.split(/,\s*/); if (!d.data("__set")) { d.bind(g[0], function () { clearTimeout(i); clearTimeout(j) }); g[1] && !a.is("input:not(:checkbox, :radio), textarea") && d.bind(g[1], function (n) { n.relatedTarget != a[0] && a.trigger(k[1].split(" ")[0]) }); d.data("__set", true) } return c
}, hide: function (e) {
    if (!d || !c.isShown()) return c;
    e = e || f.Event(); e.type = "onBeforeHide"; h.trigger(e); if (!e.isDefaultPrevented()) { l = false; o[b.effect][1].call(c, function () { e.type = "onHide"; h.trigger(e) }); return c } 
}, isShown: function (e) { return e ? l == "full" : l }, getConf: function () { return b }, getTip: function () { return d }, getTrigger: function () { return a } 
}); f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (e, g) { f.isFunction(b[g]) && f(c).bind(g, b[g]); c[g] = function (n) { n && f(c).bind(g, n); return c } })
    } f.tools = f.tools || { version: "1.2.5" }; f.tools.tooltip =
{ conf: { effect: "toggle", fadeOutSpeed: "fast", predelay: 0, delay: 30, opacity: 1, tip: 0, position: ["top", "center"], offset: [0, 0], relative: false, cancelDefault: true, events: { def: "mouseenter,mouseleave", input: "focus,blur", widget: "focus mouseenter,blur mouseleave", tooltip: "mouseenter,mouseleave" }, layout: "<div/>", tipClass: "tooltip" }, addEffect: function (a, b, c) { o[a] = [b, c] } }; var o = { toggle: [function (a) { var b = this.getConf(), c = this.getTip(); b = b.opacity; b < 1 && c.css({ opacity: b }); c.show(); a.call() }, function (a) {
    this.getTip().hide();
    a.call()
} ], fade: [function (a) { var b = this.getConf(); this.getTip().fadeTo(b.fadeInSpeed, b.opacity, a) }, function (a) { this.getTip().fadeOut(this.getConf().fadeOutSpeed, a) } ]
}; f.fn.tooltip = function (a) { var b = this.data("tooltip"); if (b) return b; a = f.extend(true, {}, f.tools.tooltip.conf, a); if (typeof a.position == "string") a.position = a.position.split(/,?\s/); this.each(function () { b = new u(f(this), a); f(this).data("tooltip", b) }); return a.api ? b : this } 
})(jQuery);
(function (d) {
    var i = d.tools.tooltip; d.extend(i.conf, { direction: "up", bounce: false, slideOffset: 10, slideInSpeed: 200, slideOutSpeed: 200, slideFade: !d.browser.msie }); var e = { up: ["-", "top"], down: ["+", "top"], left: ["-", "left"], right: ["+", "left"] }; i.addEffect("slide", function (g) { var a = this.getConf(), f = this.getTip(), b = a.slideFade ? { opacity: a.opacity} : {}, c = e[a.direction] || e.up; b[c[1]] = c[0] + "=" + a.slideOffset; a.slideFade && f.css({ opacity: 0 }); f.show().animate(b, a.slideInSpeed, g) }, function (g) {
        var a = this.getConf(), f = a.slideOffset,
b = a.slideFade ? { opacity: 0} : {}, c = e[a.direction] || e.up, h = "" + c[0]; if (a.bounce) h = h == "+" ? "-" : "+"; b[c[1]] = h + "=" + f; this.getTip().animate(b, a.slideOutSpeed, function () { d(this).hide(); g.call() })
    })
})(jQuery);
(function (g) {
    function j(a) { var c = g(window), d = c.width() + c.scrollLeft(), h = c.height() + c.scrollTop(); return [a.offset().top <= c.scrollTop(), d <= a.offset().left + a.width(), h <= a.offset().top + a.height(), c.scrollLeft() >= a.offset().left] } function k(a) { for (var c = a.length; c--; ) if (a[c]) return false; return true } var i = g.tools.tooltip; i.dynamic = { conf: { classNames: "top right bottom left"} }; g.fn.dynamic = function (a) {
        if (typeof a == "number") a = { speed: a }; a = g.extend({}, i.dynamic.conf, a); var c = a.classNames.split(/\s/), d; this.each(function () {
            var h =
g(this).tooltip().onBeforeShow(function (e, f) {
    e = this.getTip(); var b = this.getConf(); d || (d = [b.position[0], b.position[1], b.offset[0], b.offset[1], g.extend({}, b)]); g.extend(b, d[4]); b.position = [d[0], d[1]]; b.offset = [d[2], d[3]]; e.css({ visibility: "hidden", position: "absolute", top: f.top, left: f.left }).show(); f = j(e); if (!k(f)) {
        if (f[2]) { g.extend(b, a.top); b.position[0] = "top"; e.addClass(c[0]) } if (f[3]) { g.extend(b, a.right); b.position[1] = "right"; e.addClass(c[1]) } if (f[0]) { g.extend(b, a.bottom); b.position[0] = "bottom"; e.addClass(c[2]) } if (f[1]) {
            g.extend(b,
a.left); b.position[1] = "left"; e.addClass(c[3])
        } if (f[0] || f[2]) b.offset[0] *= -1; if (f[1] || f[3]) b.offset[1] *= -1
    } e.css({ visibility: "visible" }).hide()
}); h.onBeforeShow(function () { var e = this.getConf(); this.getTip(); setTimeout(function () { e.position = [d[0], d[1]]; e.offset = [d[2], d[3]] }, 0) }); h.onHide(function () { var e = this.getTip(); e.removeClass(a.classNames) }); ret = h
        }); return a.api ? ret : this
    } 
})(jQuery);
(function (e) {
    function p(f, c) { var b = e(c); return b.length < 2 ? b : f.parent().find(c) } function u(f, c) {
        var b = this, n = f.add(b), g = f.children(), l = 0, j = c.vertical; k || (k = b); if (g.length > 1) g = e(c.items, f); e.extend(b, { getConf: function () { return c }, getIndex: function () { return l }, getSize: function () { return b.getItems().size() }, getNaviButtons: function () { return o.add(q) }, getRoot: function () { return f }, getItemWrap: function () { return g }, getItems: function () { return g.children(c.item).not("." + c.clonedClass) }, move: function (a, d) {
            return b.seekTo(l +
a, d)
        }, next: function (a) { return b.move(1, a) }, prev: function (a) { return b.move(-1, a) }, begin: function (a) { return b.seekTo(0, a) }, end: function (a) { return b.seekTo(b.getSize() - 1, a) }, focus: function () { return k = b }, addItem: function (a) { a = e(a); if (c.circular) { g.children("." + c.clonedClass + ":last").before(a); g.children("." + c.clonedClass + ":first").replaceWith(a.clone().addClass(c.clonedClass)) } else g.append(a); n.trigger("onAddItem", [a]); return b }, seekTo: function (a, d, h) {
            a.jquery || (a *= 1); if (c.circular && a === 0 && l == -1 && d !==
0) return b; if (!c.circular && a < 0 || a > b.getSize() || a < -1) return b; var i = a; if (a.jquery) a = b.getItems().index(a); else i = b.getItems().eq(a); var r = e.Event("onBeforeSeek"); if (!h) { n.trigger(r, [a, d]); if (r.isDefaultPrevented() || !i.length) return b } i = j ? { top: -i.position().top} : { left: -i.position().left }; l = a; k = b; if (d === undefined) d = c.speed; g.animate(i, d, c.easing, h || function () { n.trigger("onSeek", [a]) }); return b
        } 
        }); e.each(["onBeforeSeek", "onSeek", "onAddItem"], function (a, d) {
            e.isFunction(c[d]) && e(b).bind(d, c[d]); b[d] = function (h) {
                h &&
e(b).bind(d, h); return b
            } 
        }); if (c.circular) { var s = b.getItems().slice(-1).clone().prependTo(g), t = b.getItems().eq(1).clone().appendTo(g); s.add(t).addClass(c.clonedClass); b.onBeforeSeek(function (a, d, h) { if (!a.isDefaultPrevented()) if (d == -1) { b.seekTo(s, h, function () { b.end(0) }); return a.preventDefault() } else d == b.getSize() && b.seekTo(t, h, function () { b.begin(0) }) }); b.seekTo(0, 0, function () { }) } var o = p(f, c.prev).click(function () { b.prev() }), q = p(f, c.next).click(function () { b.next() }); if (!c.circular && b.getSize() > 1) {
            b.onBeforeSeek(function (a,
d) { setTimeout(function () { if (!a.isDefaultPrevented()) { o.toggleClass(c.disabledClass, d <= 0); q.toggleClass(c.disabledClass, d >= b.getSize() - 1) } }, 1) }); c.initialIndex || o.addClass(c.disabledClass)
        } c.mousewheel && e.fn.mousewheel && f.mousewheel(function (a, d) { if (c.mousewheel) { b.move(d < 0 ? 1 : -1, c.wheelSpeed || 50); return false } }); if (c.touch) {
            var m = {}; g[0].ontouchstart = function (a) { a = a.touches[0]; m.x = a.clientX; m.y = a.clientY }; g[0].ontouchmove = function (a) {
                if (a.touches.length == 1 && !g.is(":animated")) {
                    var d = a.touches[0], h =
m.x - d.clientX; d = m.y - d.clientY; b[j && d > 0 || !j && h > 0 ? "next" : "prev"](); a.preventDefault()
                } 
            } 
        } c.keyboard && e(document).bind("keydown.scrollable", function (a) { if (!(!c.keyboard || a.altKey || a.ctrlKey || e(a.target).is(":input"))) if (!(c.keyboard != "static" && k != b)) { var d = a.keyCode; if (j && (d == 38 || d == 40)) { b.move(d == 38 ? -1 : 1); return a.preventDefault() } if (!j && (d == 37 || d == 39)) { b.move(d == 37 ? -1 : 1); return a.preventDefault() } } }); c.initialIndex && b.seekTo(c.initialIndex, 0, function () { })
    } e.tools = e.tools || { version: "1.2.5" }; e.tools.scrollable =
{ conf: { activeClass: "active", circular: false, clonedClass: "cloned", disabledClass: "disabled", easing: "swing", initialIndex: 0, item: null, items: ".items", keyboard: true, mousewheel: false, next: ".next", prev: ".prev", speed: 400, vertical: false, touch: true, wheelSpeed: 0} }; var k; e.fn.scrollable = function (f) { var c = this.data("scrollable"); if (c) return c; f = e.extend({}, e.tools.scrollable.conf, f); this.each(function () { c = new u(e(this), f); e(this).data("scrollable", c) }); return f.api ? c : this } 
})(jQuery);
(function (b) {
    var f = b.tools.scrollable; f.autoscroll = { conf: { autoplay: true, interval: 3E3, autopause: true} }; b.fn.autoscroll = function (c) {
        if (typeof c == "number") c = { interval: c }; var d = b.extend({}, f.autoscroll.conf, c), g; this.each(function () {
            var a = b(this).data("scrollable"); if (a) g = a; var e, h = true; a.play = function () { if (!e) { h = false; e = setInterval(function () { a.next() }, d.interval) } }; a.pause = function () { e = clearInterval(e) }; a.stop = function () { a.pause(); h = true }; d.autopause && a.getRoot().add(a.getNaviButtons()).hover(a.pause,
a.play); d.autoplay && a.play()
        }); return d.api ? g : this
    } 
})(jQuery);
(function (d) {
    function p(b, g) { var h = d(g); return h.length < 2 ? h : b.parent().find(g) } var m = d.tools.scrollable; m.navigator = { conf: { navi: ".navi", naviItem: null, activeClass: "active", indexed: false, idPrefix: null, history: false} }; d.fn.navigator = function (b) {
        if (typeof b == "string") b = { navi: b }; b = d.extend({}, m.navigator.conf, b); var g; this.each(function () {
            function h(a, c, i) { e.seekTo(c); if (j) { if (location.hash) location.hash = a.attr("href").replace("#", "") } else return i.preventDefault() } function f() {
                return k.find(b.naviItem ||
"> *")
            } function n(a) { var c = d("<" + (b.naviItem || "a") + "/>").click(function (i) { h(d(this), a, i) }).attr("href", "#" + a); a === 0 && c.addClass(l); b.indexed && c.text(a + 1); b.idPrefix && c.attr("id", b.idPrefix + a); return c.appendTo(k) } function o(a, c) { a = f().eq(c.replace("#", "")); a.length || (a = f().filter("[href=" + c + "]")); a.click() } var e = d(this).data("scrollable"), k = b.navi.jquery ? b.navi : p(e.getRoot(), b.navi), q = e.getNaviButtons(), l = b.activeClass, j = b.history && d.fn.history; if (e) g = e; e.getNaviButtons = function () { return q.add(k) };
            f().length ? f().each(function (a) { d(this).click(function (c) { h(d(this), a, c) }) }) : d.each(e.getItems(), function (a) { n(a) }); e.onBeforeSeek(function (a, c) { setTimeout(function () { if (!a.isDefaultPrevented()) { var i = f().eq(c); !a.isDefaultPrevented() && i.length && f().removeClass(l).eq(c).addClass(l) } }, 1) }); e.onAddItem(function (a, c) { c = n(e.getItems().index(c)); j && c.history(o) }); j && f().history(o)
        }); return b.api ? g : this
    } 
})(jQuery);
(function (a) {
    function t(d, b) {
        var c = this, j = d.add(c), o = a(window), k, f, m, g = a.tools.expose && (b.mask || b.expose), n = Math.random().toString().slice(10); if (g) { if (typeof g == "string") g = { color: g }; g.closeOnClick = g.closeOnEsc = false } var p = b.target || d.attr("rel"); f = p ? a(p) : d; if (!f.length) throw "Could not find Overlay: " + p; d && d.index(f) == -1 && d.click(function (e) { c.load(e); return e.preventDefault() }); a.extend(c, { load: function (e) {
            if (c.isOpened()) return c; var h = q[b.effect]; if (!h) throw 'Overlay: cannot find effect : "' + b.effect +
'"'; b.oneInstance && a.each(s, function () { this.close(e) }); e = e || a.Event(); e.type = "onBeforeLoad"; j.trigger(e); if (e.isDefaultPrevented()) return c; m = true; g && a(f).expose(g); var i = b.top, r = b.left, u = f.outerWidth({ margin: true }), v = f.outerHeight({ margin: true }); if (typeof i == "string") i = i == "center" ? Math.max((o.height() - v) / 2, 0) : parseInt(i, 10) / 100 * o.height(); if (r == "center") r = Math.max((o.width() - u) / 2, 0); h[0].call(c, { top: i, left: r }, function () { if (m) { e.type = "onLoad"; j.trigger(e) } }); g && b.closeOnClick && a.mask.getMask().one("click",
c.close); b.closeOnClick && a(document).bind("click." + n, function (l) { a(l.target).parents(f).length || c.close(l) }); b.closeOnEsc && a(document).bind("keydown." + n, function (l) { l.keyCode == 27 && c.close(l) }); return c
        }, close: function (e) { if (!c.isOpened()) return c; e = e || a.Event(); e.type = "onBeforeClose"; j.trigger(e); if (!e.isDefaultPrevented()) { m = false; q[b.effect][1].call(c, function () { e.type = "onClose"; j.trigger(e) }); a(document).unbind("click." + n).unbind("keydown." + n); g && a.mask.close(); return c } }, getOverlay: function () { return f },
            getTrigger: function () { return d }, getClosers: function () { return k }, isOpened: function () { return m }, getConf: function () { return b } 
        }); a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (e, h) { a.isFunction(b[h]) && a(c).bind(h, b[h]); c[h] = function (i) { i && a(c).bind(h, i); return c } }); k = f.find(b.close || ".close"); if (!k.length && !b.close) { k = a('<a class="close"></a>'); f.prepend(k) } k.click(function (e) { c.close(e) }); b.load && c.load()
    } a.tools = a.tools || { version: "1.2.5" }; a.tools.overlay = { addEffect: function (d,
b, c) { q[d] = [b, c] }, conf: { close: null, closeOnClick: true, closeOnEsc: true, closeSpeed: "fast", effect: "default", fixed: !a.browser.msie || a.browser.version > 6, left: "center", load: false, mask: null, oneInstance: true, speed: "normal", target: null, top: "10%"}
    }; var s = [], q = {}; a.tools.overlay.addEffect("default", function (d, b) { var c = this.getConf(), j = a(window); if (!c.fixed) { d.top += j.scrollTop(); d.left += j.scrollLeft() } d.position = c.fixed ? "fixed" : "absolute"; this.getOverlay().css(d).fadeIn(c.speed, b) }, function (d) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed,
d)
    }); a.fn.overlay = function (d) { var b = this.data("overlay"); if (b) return b; if (a.isFunction(d)) d = { onBeforeLoad: d }; d = a.extend(true, {}, a.tools.overlay.conf, d); this.each(function () { b = new t(a(this), d); s.push(b); a(this).data("overlay", b) }); return d.api ? b : this } 
})(jQuery);
(function (h) {
    function k(d) { var e = d.offset(); return { top: e.top + d.height() / 2, left: e.left + d.width() / 2} } var l = h.tools.overlay, f = h(window); h.extend(l.conf, { start: { top: null, left: null }, fadeInSpeed: "fast", zIndex: 9999 }); function o(d, e) {
        var a = this.getOverlay(), c = this.getConf(), g = this.getTrigger(), p = this, m = a.outerWidth({ margin: true }), b = a.data("img"), n = c.fixed ? "fixed" : "absolute"; if (!b) {
            b = a.css("backgroundImage"); if (!b) throw "background-image CSS property not set for overlay"; b = b.slice(b.indexOf("(") + 1, b.indexOf(")")).replace(/\"/g,
""); a.css("backgroundImage", "none"); b = h('<img src="' + b + '"/>'); b.css({ border: 0, display: "none" }).width(m); h("body").append(b); a.data("img", b)
        } var i = c.start.top || Math.round(f.height() / 2), j = c.start.left || Math.round(f.width() / 2); if (g) { g = k(g); i = g.top; j = g.left } if (c.fixed) { i -= f.scrollTop(); j -= f.scrollLeft() } else { d.top += f.scrollTop(); d.left += f.scrollLeft() } b.css({ position: "absolute", top: i, left: j, width: 0, zIndex: c.zIndex }).show(); d.position = n; a.css(d); b.animate({ top: a.css("top"), left: a.css("left"), width: m },
c.speed, function () { a.css("zIndex", c.zIndex + 1).fadeIn(c.fadeInSpeed, function () { p.isOpened() && !h(this).index(a) ? e.call() : a.hide() }) }).css("position", n)
    } function q(d) { var e = this.getOverlay().hide(), a = this.getConf(), c = this.getTrigger(); e = e.data("img"); var g = { top: a.start.top, left: a.start.left, width: 0 }; c && h.extend(g, k(c)); a.fixed && e.css({ position: "absolute" }).animate({ top: "+=" + f.scrollTop(), left: "+=" + f.scrollLeft() }, 0); e.animate(g, a.closeSpeed, d) } l.addEffect("apple", o, q)
})(jQuery);
(function (d) {
    function R(a, c) { return 32 - (new Date(a, c, 32)).getDate() } function S(a, c) { a = "" + a; for (c = c || 2; a.length < c; ) a = "0" + a; return a } function T(a, c, j) { var q = a.getDate(), h = a.getDay(), r = a.getMonth(); a = a.getFullYear(); var f = { d: q, dd: S(q), ddd: B[j].shortDays[h], dddd: B[j].days[h], m: r + 1, mm: S(r + 1), mmm: B[j].shortMonths[r], mmmm: B[j].months[r], yy: String(a).slice(2), yyyy: a }; c = c.replace(X, function (s) { return s in f ? f[s] : s.slice(1, s.length - 1) }); return Y.html(c).html() } function v(a) { return parseInt(a, 10) } function U(a,
c) { return a.getFullYear() === c.getFullYear() && a.getMonth() == c.getMonth() && a.getDate() == c.getDate() } function C(a) { if (a) { if (a.constructor == Date) return a; if (typeof a == "string") { var c = a.split("-"); if (c.length == 3) return new Date(v(c[0]), v(c[1]) - 1, v(c[2])); if (!/^-?\d+$/.test(a)) return; a = v(a) } c = new Date; c.setDate(c.getDate() + a); return c } } function Z(a, c) {
    function j(b, e, g) {
        n = b; D = b.getFullYear(); E = b.getMonth(); G = b.getDate(); g = g || d.Event("api"); g.type = "change"; H.trigger(g, [b]); if (!g.isDefaultPrevented()) {
            a.val(T(b,
e.format, e.lang)); a.data("date", b); h.hide(g)
        } 
    } function q(b) {
        b.type = "onShow"; H.trigger(b); d(document).bind("keydown.d", function (e) {
            if (e.ctrlKey) return true; var g = e.keyCode; if (g == 8) { a.val(""); return h.hide(e) } if (g == 27) return h.hide(e); if (d(V).index(g) >= 0) {
                if (!w) { h.show(e); return e.preventDefault() } var i = d("#" + f.weeks + " a"), t = d("." + f.focus), o = i.index(t); t.removeClass(f.focus); if (g == 74 || g == 40) o += 7; else if (g == 75 || g == 38) o -= 7; else if (g == 76 || g == 39) o += 1; else if (g == 72 || g == 37) o -= 1; if (o > 41) {
                    h.addMonth(); t = d("#" +
f.weeks + " a:eq(" + (o - 42) + ")")
                } else if (o < 0) { h.addMonth(-1); t = d("#" + f.weeks + " a:eq(" + (o + 42) + ")") } else t = i.eq(o); t.addClass(f.focus); return e.preventDefault()
            } if (g == 34) return h.addMonth(); if (g == 33) return h.addMonth(-1); if (g == 36) return h.today(); if (g == 13) d(e.target).is("select") || d("." + f.focus).click(); return d([16, 17, 18, 9]).index(g) >= 0
        }); d(document).bind("click.d", function (e) { var g = e.target; if (!d(g).parents("#" + f.root).length && g != a[0] && (!L || g != L[0])) h.hide(e) })
    } var h = this, r = new Date, f = c.css, s = B[c.lang],
k = d("#" + f.root), M = k.find("#" + f.title), L, I, J, D, E, G, n = a.attr("data-value") || c.value || a.val(), m = a.attr("min") || c.min, p = a.attr("max") || c.max, w; if (m === 0) m = "0"; n = C(n) || r; m = C(m || c.yearRange[0] * 365); p = C(p || c.yearRange[1] * 365); if (!s) throw "Dateinput: invalid language: " + c.lang; if (a.attr("type") == "date") { var N = d("<input/>"); d.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","), function (b, e) { N.attr(e, a.attr(e)) }); a.replaceWith(N); a = N } a.addClass(f.input); var H =
a.add(h); if (!k.length) {
        k = d("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({ position: "absolute" }).attr("id", f.root); k.children().eq(0).attr("id", f.head).end().eq(1).attr("id", f.body).children().eq(0).attr("id", f.days).end().eq(1).attr("id", f.weeks).end().end().end().find("a").eq(0).attr("id", f.prev).end().eq(1).attr("id", f.next); M = k.find("#" + f.head).find("div").attr("id", f.title); if (c.selectors) { var z = d("<select/>").attr("id", f.month), A = d("<select/>").attr("id", f.year); M.html(z.add(A)) } for (var $ =
k.find("#" + f.days), O = 0; O < 7; O++) $.append(d("<span/>").text(s.shortDays[(O + c.firstDay) % 7])); d("body").append(k)
    } if (c.trigger) L = d("<a/>").attr("href", "#").addClass(f.trigger).click(function (b) { h.show(); return b.preventDefault() }).insertAfter(a); var K = k.find("#" + f.weeks); A = k.find("#" + f.year); z = k.find("#" + f.month); d.extend(h, { show: function (b) {
        if (!(a.attr("readonly") || a.attr("disabled") || w)) {
            b = b || d.Event(); b.type = "onBeforeShow"; H.trigger(b); if (!b.isDefaultPrevented()) {
                d.each(W, function () { this.hide() });
                w = true; z.unbind("change").change(function () { h.setValue(A.val(), d(this).val()) }); A.unbind("change").change(function () { h.setValue(d(this).val(), z.val()) }); I = k.find("#" + f.prev).unbind("click").click(function () { I.hasClass(f.disabled) || h.addMonth(-1); return false }); J = k.find("#" + f.next).unbind("click").click(function () { J.hasClass(f.disabled) || h.addMonth(); return false }); h.setValue(n); var e = a.offset(); if (/iPad/i.test(navigator.userAgent)) e.top -= d(window).scrollTop(); k.css({ top: e.top + a.outerHeight({ margins: true }) +
c.offset[0], left: e.left + c.offset[1]
                }); if (c.speed) k.show(c.speed, function () { q(b) }); else { k.show(); q(b) } return h
            } 
        } 
    }, setValue: function (b, e, g) {
        var i = v(e) >= -1 ? new Date(v(b), v(e), v(g || 1)) : b || n; if (i < m) i = m; else if (i > p) i = p; b = i.getFullYear(); e = i.getMonth(); g = i.getDate(); if (e == -1) { e = 11; b-- } else if (e == 12) { e = 0; b++ } if (!w) { j(i, c); return h } E = e; D = b; g = new Date(b, e, 1 - c.firstDay); g = g.getDay(); var t = R(b, e), o = R(b, e - 1), P; if (c.selectors) {
            z.empty(); d.each(s.months, function (x, F) {
                m < new Date(b, x + 1, -1) && p > new Date(b, x, 0) && z.append(d("<option/>").html(F).attr("value",
x))
            }); A.empty(); i = r.getFullYear(); for (var l = i + c.yearRange[0]; l < i + c.yearRange[1]; l++) m <= new Date(l + 1, -1, 1) && p > new Date(l, 0, 0) && A.append(d("<option/>").text(l)); z.val(e); A.val(b)
        } else M.html(s.months[e] + " " + b); K.empty(); I.add(J).removeClass(f.disabled); l = !g ? -7 : 0; for (var u, y; l < (!g ? 35 : 42); l++) {
            u = d("<a/>"); if (l % 7 === 0) { P = d("<div/>").addClass(f.week); K.append(P) } if (l < g) { u.addClass(f.off); y = o - g + l + 1; i = new Date(b, e - 1, y) } else if (l >= g + t) { u.addClass(f.off); y = l - t - g + 1; i = new Date(b, e + 1, y) } else {
                y = l - g + 1; i = new Date(b,
e, y); if (U(n, i)) u.attr("id", f.current).addClass(f.focus); else U(r, i) && u.attr("id", f.today)
            } m && i < m && u.add(I).addClass(f.disabled); p && i > p && u.add(J).addClass(f.disabled); u.attr("href", "#" + y).text(y).data("date", i); P.append(u)
        } K.find("a").click(function (x) { var F = d(this); if (!F.hasClass(f.disabled)) { d("#" + f.current).removeAttr("id"); F.attr("id", f.current); j(F.data("date"), c, x) } return false }); f.sunday && K.find(f.week).each(function () { var x = c.firstDay ? 7 - c.firstDay : 0; d(this).children().slice(x, x + 1).addClass(f.sunday) });
        return h
    }, setMin: function (b, e) { m = C(b); e && n < m && h.setValue(m); return h }, setMax: function (b, e) { p = C(b); e && n > p && h.setValue(p); return h }, today: function () { return h.setValue(r) }, addDay: function (b) { return this.setValue(D, E, G + (b || 1)) }, addMonth: function (b) { return this.setValue(D, E + (b || 1), G) }, addYear: function (b) { return this.setValue(D + (b || 1), E, G) }, hide: function (b) { if (w) { b = d.Event(); b.type = "onHide"; H.trigger(b); d(document).unbind("click.d").unbind("keydown.d"); if (b.isDefaultPrevented()) return; k.hide(); w = false } return h },
        getConf: function () { return c }, getInput: function () { return a }, getCalendar: function () { return k }, getValue: function (b) { return b ? T(n, b, c.lang) : n }, isOpen: function () { return w } 
    }); d.each(["onBeforeShow", "onShow", "change", "onHide"], function (b, e) { d.isFunction(c[e]) && d(h).bind(e, c[e]); h[e] = function (g) { g && d(h).bind(e, g); return h } }); a.bind("focus click", h.show).keydown(function (b) { var e = b.keyCode; if (!w && d(V).index(e) >= 0) { h.show(b); return b.preventDefault() } return b.shiftKey || b.ctrlKey || b.altKey || e == 9 ? true : b.preventDefault() });
    C(a.val()) && j(n, c)
} d.tools = d.tools || { version: "1.2.5" }; var W = [], Q, V = [75, 76, 38, 39, 74, 72, 40, 37], B = {}; Q = d.tools.dateinput = { conf: { format: "mm/dd/yy", selectors: false, yearRange: [-5, 5], lang: "en", offset: [0, 0], speed: 0, firstDay: 0, min: undefined, max: undefined, trigger: false, css: { prefix: "cal", input: "date", root: 0, head: 0, title: 0, prev: 0, next: 0, month: 0, year: 0, days: 0, body: 0, weeks: 0, today: 0, current: 0, week: 0, off: 0, sunday: 0, focus: 0, disabled: 0, trigger: 0} }, localize: function (a, c) {
    d.each(c, function (j, q) { c[j] = q.split(",") });
    B[a] = c
} 
}; Q.localize("en", { months: "January,February,March,April,May,June,July,August,September,October,November,December", shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec", days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday", shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat" }); var X = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, Y = d("<a/>"); d.expr[":"].date = function (a) { var c = a.getAttribute("type"); return c && c == "date" || !!d(a).data("dateinput") }; d.fn.dateinput = function (a) {
    if (this.data("dateinput")) return this;
    a = d.extend(true, {}, Q.conf, a); d.each(a.css, function (j, q) { if (!q && j != "prefix") a.css[j] = (a.css.prefix || "") + (q || j) }); var c; this.each(function () { var j = new Z(d(this), a); W.push(j); j = j.getInput().data("dateinput", j); c = c ? c.add(j) : j }); return c ? c : this
} 
})(jQuery);
(function (e) {
    function F(d, a) { a = Math.pow(10, a); return Math.round(d * a) / a } function q(d, a) { if (a = parseInt(d.css(a), 10)) return a; return (d = d[0].currentStyle) && d.width && parseInt(d.width, 10) } function C(d) { return (d = d.data("events")) && d.onSlide } function G(d, a) {
        function h(c, b, f, j) {
            if (f === undefined) f = b / k * z; else if (j) f -= a.min; if (s) f = Math.round(f / s) * s; if (b === undefined || s) b = f * k / z; if (isNaN(f)) return g; b = Math.max(0, Math.min(b, k)); f = b / k * z; if (j || !n) f += a.min; if (n) if (j) b = k - b; else f = a.max - f; f = F(f, t); var r = c.type == "click";
            if (D && l !== undefined && !r) { c.type = "onSlide"; A.trigger(c, [f, b]); if (c.isDefaultPrevented()) return g } j = r ? a.speed : 0; r = r ? function () { c.type = "change"; A.trigger(c, [f]) } : null; if (n) { m.animate({ top: b }, j, r); a.progress && B.animate({ height: k - b + m.width() / 2 }, j) } else { m.animate({ left: b }, j, r); a.progress && B.animate({ width: b + m.width() / 2 }, j) } l = f; H = b; d.val(f); return g
        } function o() { if (n = a.vertical || q(i, "height") > q(i, "width")) { k = q(i, "height") - q(m, "height"); u = i.offset().top + k } else { k = q(i, "width") - q(m, "width"); u = i.offset().left } }
        function v() { o(); g.setValue(a.value !== undefined ? a.value : a.min) } var g = this, p = a.css, i = e("<div><div/><a href='#'/></div>").data("rangeinput", g), n, l, u, k, H; d.before(i); var m = i.addClass(p.slider).find("a").addClass(p.handle), B = i.find("div").addClass(p.progress); e.each("min,max,step,value".split(","), function (c, b) { c = d.attr(b); if (parseFloat(c)) a[b] = parseFloat(c, 10) }); var z = a.max - a.min, s = a.step == "any" ? 0 : a.step, t = a.precision; if (t === undefined) try { t = s.toString().split(".")[1].length } catch (I) { t = 0 } if (d.attr("type") ==
"range") { var w = e("<input/>"); e.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","), function (c, b) { w.attr(b, d.attr(b)) }); w.val(a.value); d.replaceWith(w); d = w } d.addClass(p.input); var A = e(g).add(d), D = true; e.extend(g, { getValue: function () { return l }, setValue: function (c, b) { o(); return h(b || e.Event("api"), undefined, c, true) }, getConf: function () { return a }, getProgress: function () { return B }, getHandle: function () { return m }, getInput: function () { return d }, step: function (c,
b) { b = b || e.Event(); var f = a.step == "any" ? 1 : a.step; g.setValue(l + f * (c || 1), b) }, stepUp: function (c) { return g.step(c || 1) }, stepDown: function (c) { return g.step(-c || -1) } 
}); e.each("onSlide,change".split(","), function (c, b) { e.isFunction(a[b]) && e(g).bind(b, a[b]); g[b] = function (f) { f && e(g).bind(b, f); return g } }); m.drag({ drag: false }).bind("dragStart", function () { o(); D = C(e(g)) || C(d) }).bind("drag", function (c, b, f) { if (d.is(":disabled")) return false; h(c, n ? b : f) }).bind("dragEnd", function (c) {
    if (!c.isDefaultPrevented()) {
        c.type =
"change"; A.trigger(c, [l])
    } 
}).click(function (c) { return c.preventDefault() }); i.click(function (c) { if (d.is(":disabled") || c.target == m[0]) return c.preventDefault(); o(); var b = m.width() / 2; h(c, n ? k - u - b + c.pageY : c.pageX - u - b) }); a.keyboard && d.keydown(function (c) { if (!d.attr("readonly")) { var b = c.keyCode, f = e([75, 76, 38, 33, 39]).index(b) != -1, j = e([74, 72, 40, 34, 37]).index(b) != -1; if ((f || j) && !(c.shiftKey || c.altKey || c.ctrlKey)) { if (f) g.step(b == 33 ? 10 : 1, c); else if (j) g.step(b == 34 ? -10 : -1, c); return c.preventDefault() } } }); d.blur(function (c) {
    var b =
e(this).val(); b !== l && g.setValue(b, c)
}); e.extend(d[0], { stepUp: g.stepUp, stepDown: g.stepDown }); v(); k || e(window).load(v)
    } e.tools = e.tools || { version: "1.2.5" }; var E; E = e.tools.rangeinput = { conf: { min: 0, max: 100, step: "any", steps: 0, value: 0, precision: undefined, vertical: 0, keyboard: true, progress: false, speed: 100, css: { input: "range", slider: "slider", progress: "progress", handle: "handle"}} }; var x, y; e.fn.drag = function (d) {
        document.ondragstart = function () { return false }; d = e.extend({ x: true, y: true, drag: true }, d); x = x || e(document).bind("mousedown mouseup",
function (a) { var h = e(a.target); if (a.type == "mousedown" && h.data("drag")) { var o = h.position(), v = a.pageX - o.left, g = a.pageY - o.top, p = true; x.bind("mousemove.drag", function (i) { var n = i.pageX - v; i = i.pageY - g; var l = {}; if (d.x) l.left = n; if (d.y) l.top = i; if (p) { h.trigger("dragStart"); p = false } d.drag && h.css(l); h.trigger("drag", [i, n]); y = h }); a.preventDefault() } else try { y && y.trigger("dragEnd") } finally { x.unbind("mousemove.drag"); y = null } }); return this.data("drag", true)
    }; e.expr[":"].range = function (d) {
        var a = d.getAttribute("type");
        return a && a == "range" || !!e(d).filter("input").data("rangeinput")
    }; e.fn.rangeinput = function (d) { if (this.data("rangeinput")) return this; d = e.extend(true, {}, E.conf, d); var a; this.each(function () { var h = new G(e(this), e.extend(true, {}, d)); h = h.getInput().data("rangeinput", h); a = a ? a.add(h) : h }); return a ? a : this } 
})(jQuery);
(function (e) {
    function t(a, b, c) { var k = a.offset().top, f = a.offset().left, l = c.position.split(/,?\s+/), p = l[0]; l = l[1]; k -= b.outerHeight() - c.offset[0]; f += a.outerWidth() + c.offset[1]; if (/iPad/i.test(navigator.userAgent)) k -= e(window).scrollTop(); c = b.outerHeight() + a.outerHeight(); if (p == "center") k += c / 2; if (p == "bottom") k += c; a = a.outerWidth(); if (l == "center") f -= (a + b.outerWidth()) / 2; if (l == "left") f -= a; return { top: k, left: f} } function y(a) { function b() { return this.getAttribute("type") == a } b.key = "[type=" + a + "]"; return b } function u(a,
b, c) {
        function k(g, d, i) { if (!(!c.grouped && g.length)) { var j; if (i === false || e.isArray(i)) { j = h.messages[d.key || d] || h.messages["*"]; j = j[c.lang] || h.messages["*"].en; (d = j.match(/\$\d/g)) && e.isArray(i) && e.each(d, function (m) { j = j.replace(this, i[m]) }) } else j = i[c.lang] || i; g.push(j) } } var f = this, l = b.add(f); a = a.not(":button, :image, :reset, :submit"); e.extend(f, { getConf: function () { return c }, getForm: function () { return b }, getInputs: function () { return a }, reflow: function () {
            a.each(function () {
                var g = e(this), d = g.data("msg.el");
                if (d) { g = t(g, d, c); d.css({ top: g.top, left: g.left }) } 
            }); return f
        }, invalidate: function (g, d) { if (!d) { var i = []; e.each(g, function (j, m) { j = a.filter("[name='" + j + "']"); if (j.length) { j.trigger("OI", [m]); i.push({ input: j, messages: [m] }) } }); g = i; d = e.Event() } d.type = "onFail"; l.trigger(d, [g]); d.isDefaultPrevented() || q[c.effect][0].call(f, g, d); return f }, reset: function (g) {
            g = g || a; g.removeClass(c.errorClass).each(function () { var d = e(this).data("msg.el"); if (d) { d.remove(); e(this).data("msg.el", null) } }).unbind(c.errorInputEvent ||
""); return f
        }, destroy: function () { b.unbind(c.formEvent + ".V").unbind("reset.V"); a.unbind(c.inputEvent + ".V").unbind("change.V"); return f.reset() }, checkValidity: function (g, d) {
            g = g || a; g = g.not(":disabled"); if (!g.length) return true; d = d || e.Event(); d.type = "onBeforeValidate"; l.trigger(d, [g]); if (d.isDefaultPrevented()) return d.result; var i = []; g.not(":radio:not(:checked)").each(function () {
                var m = [], n = e(this).data("messages", m), v = r && n.is(":date") ? "onHide.v" : c.errorInputEvent + ".v"; n.unbind(v); e.each(w, function () {
                    var o =
this, s = o[0]; if (n.filter(s).length) { o = o[1].call(f, n, n.val()); if (o !== true) { d.type = "onBeforeFail"; l.trigger(d, [n, s]); if (d.isDefaultPrevented()) return false; var x = n.attr(c.messageAttr); if (x) { m = [x]; return false } else k(m, s, o) } } 
                }); if (m.length) { i.push({ input: n, messages: m }); n.trigger("OI", [m]); c.errorInputEvent && n.bind(v, function (o) { f.checkValidity(n, o) }) } if (c.singleError && i.length) return false
            }); var j = q[c.effect]; if (!j) throw 'Validator: cannot find effect "' + c.effect + '"'; if (i.length) { f.invalidate(i, d); return false } else {
                j[1].call(f,
g, d); d.type = "onSuccess"; l.trigger(d, [g]); g.unbind(c.errorInputEvent + ".v")
            } return true
        } 
        }); e.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","), function (g, d) { e.isFunction(c[d]) && e(f).bind(d, c[d]); f[d] = function (i) { i && e(f).bind(d, i); return f } }); c.formEvent && b.bind(c.formEvent + ".V", function (g) { if (!f.checkValidity(null, g)) return g.preventDefault() }); b.bind("reset.V", function () { f.reset() }); a[0] && a[0].validity && a.each(function () { this.oninvalid = function () { return false } }); if (b[0]) b[0].checkValidity =
f.checkValidity; c.inputEvent && a.bind(c.inputEvent + ".V", function (g) { f.checkValidity(e(this), g) }); a.filter(":checkbox, select").filter("[required]").bind("change.V", function (g) { var d = e(this); if (this.checked || d.is("select") && e(this).val()) q[c.effect][1].call(f, d, g) }); var p = a.filter(":radio").change(function (g) { f.checkValidity(p, g) }); e(window).resize(function () { f.reflow() })
    } e.tools = e.tools || { version: "1.2.5" }; var z = /\[type=([a-z]+)\]/, A = /^-?[0-9]*(\.[0-9]+)?$/, r = e.tools.dateinput, B = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
C = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i, h; h = e.tools.validator = { conf: { grouped: false, effect: "default", errorClass: "invalid", inputEvent: null, errorInputEvent: "keyup", formEvent: "submit", lang: "en", message: "<div/>", messageAttr: "data-message", messageClass: "error", offset: [0, 0], position: "center right", singleError: false, speed: "normal" }, messages: { "*": { en: "Please correct this value"} }, localize: function (a, b) { e.each(b, function (c, k) { h.messages[c] = h.messages[c] || {}; h.messages[c][a] = k }) },
    localizeFn: function (a, b) { h.messages[a] = h.messages[a] || {}; e.extend(h.messages[a], b) }, fn: function (a, b, c) { if (e.isFunction(b)) c = b; else { if (typeof b == "string") b = { en: b }; this.messages[a.key || a] = b } if (b = z.exec(a)) a = y(b[1]); w.push([a, c]) }, addEffect: function (a, b, c) { q[a] = [b, c] } 
}; var w = [], q = { "default": [function (a) {
    var b = this.getConf(); e.each(a, function (c, k) {
        c = k.input; c.addClass(b.errorClass); var f = c.data("msg.el"); if (!f) { f = e(b.message).addClass(b.messageClass).appendTo(document.body); c.data("msg.el", f) } f.css({ visibility: "hidden" }).find("p").remove();
        e.each(k.messages, function (l, p) { e("<p/>").html(p).appendTo(f) }); f.outerWidth() == f.parent().width() && f.add(f.find("p")).css({ display: "inline" }); k = t(c, f, b); f.css({ visibility: "visible", position: "absolute", top: k.top, left: k.left }).fadeIn(b.speed)
    })
}, function (a) { var b = this.getConf(); a.removeClass(b.errorClass).each(function () { var c = e(this).data("msg.el"); c && c.css({ visibility: "hidden" }) }) } ]
}; e.each("email,url,number".split(","), function (a, b) { e.expr[":"][b] = function (c) { return c.getAttribute("type") === b } });
    e.fn.oninvalid = function (a) { return this[a ? "bind" : "trigger"]("OI", a) }; h.fn(":email", "Please enter a valid email address", function (a, b) { return !b || B.test(b) }); h.fn(":url", "Please enter a valid URL", function (a, b) { return !b || C.test(b) }); h.fn(":number", "Please enter a numeric value.", function (a, b) { return A.test(b) }); h.fn("[max]", "Please enter a value smaller than $1", function (a, b) { if (b === "" || r && a.is(":date")) return true; a = a.attr("max"); return parseFloat(b) <= parseFloat(a) ? true : [a] }); h.fn("[min]", "Please enter a value larger than $1",
function (a, b) { if (b === "" || r && a.is(":date")) return true; a = a.attr("min"); return parseFloat(b) >= parseFloat(a) ? true : [a] }); h.fn("[required]", "Please complete this mandatory field.", function (a, b) { if (a.is(":checkbox")) return a.is(":checked"); return !!b }); h.fn("[pattern]", function (a) { var b = new RegExp("^" + a.attr("pattern") + "$"); return b.test(a.val()) }); e.fn.validator = function (a) {
    var b = this.data("validator"); if (b) { b.destroy(); this.removeData("validator") } a = e.extend(true, {}, h.conf, a); if (this.is("form")) return this.each(function () {
        var c =
e(this); b = new u(c.find(":input"), c, a); c.data("validator", b)
    }); else { b = new u(this, this.eq(0).closest("form"), a); return this.data("validator", b) } 
} 
})(jQuery);
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
/*
 * jQuery Cycle Plugin (core engine only)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.99 (12-MAR-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
(function($){var ver="2.99";if($.support==undefined){$.support={opacity:!($.browser.msie)};}function debug(s){$.fn.cycle.debug&&log(s);}function log(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "));}$.expr[":"].paused=function(el){return el.cyclePause;};$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};if(this.length===0&&options!="stop"){if(!$.isReady&&o.s){log("DOM not ready, queuing slideshow");$(function(){$(o.s,o.c).cycle(options,arg2);});return this;}log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));return this;}return this.each(function(){var opts=handleArguments(this,options,arg2);if(opts===false){return;}opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);}this.cycleTimeout=this.cyclePause=0;var $cont=$(this);var $slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children();var els=$slides.get();if(els.length<2){log("terminating; too few slides: "+els.length);return;}var opts2=buildOptions($cont,$slides,els,opts,o);if(opts2===false){return;}var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.backwards);if(startTime){startTime+=(opts2.delay||0);if(startTime<10){startTime=10;}debug("first timeout: "+startTime);this.cycleTimeout=setTimeout(function(){go(els,opts2,0,!opts.backwards);},startTime);}});};function handleArguments(cont,options,arg2){if(cont.cycleStop==undefined){cont.cycleStop=0;}if(options===undefined||options===null){options={};}if(options.constructor==String){switch(options){case"destroy":case"stop":var opts=$(cont).data("cycle.opts");if(!opts){return false;}cont.cycleStop++;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);}cont.cycleTimeout=0;$(cont).removeData("cycle.opts");if(options=="destroy"){destroy(opts);}return false;case"toggle":cont.cyclePause=(cont.cyclePause===1)?0:1;checkInstantResume(cont.cyclePause,arg2,cont);return false;case"pause":cont.cyclePause=1;return false;case"resume":cont.cyclePause=0;checkInstantResume(false,arg2,cont);return false;case"prev":case"next":var opts=$(cont).data("cycle.opts");if(!opts){log('options not found, "prev/next" ignored');return false;}$.fn.cycle[options](opts);return false;default:options={fx:options};}return options;}else{if(options.constructor==Number){var num=options;options=$(cont).data("cycle.opts");if(!options){log("options not found, can not advance slide");return false;}if(num<0||num>=options.elements.length){log("invalid slide index: "+num);return false;}options.nextSlide=num;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}if(typeof arg2=="string"){options.oneTimeFx=arg2;}go(options.elements,options,1,num>=options.currSlide);return false;}}return options;function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===true){var options=$(cont).data("cycle.opts");if(!options){log("options not found, can not resume");return false;}if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}go(options.elements,options,1,!options.backwards);}}}function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter){try{el.style.removeAttribute("filter");}catch(smother){}}}function destroy(opts){if(opts.next){$(opts.next).unbind(opts.prevNextEvent);}if(opts.prev){$(opts.prev).unbind(opts.prevNextEvent);}if(opts.pager||opts.pagerAnchorBuilder){$.each(opts.pagerAnchors||[],function(){this.unbind().remove();});}opts.pagerAnchors=null;if(opts.destroy){opts.destroy(opts);}}function buildOptions($cont,$slides,els,options,o){var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});if(opts.autostop){opts.countdown=opts.autostopCount||els.length;}var cont=$cont[0];$cont.data("cycle.opts",opts);opts.$cont=$cont;opts.stopCount=cont.cycleStop;opts.elements=els;opts.before=opts.before?[opts.before]:[];opts.after=opts.after?[opts.after]:[];if(!$.support.opacity&&opts.cleartype){opts.after.push(function(){removeFilter(this,opts);});}if(opts.continuous){opts.after.push(function(){go(els,opts,0,!opts.backwards);});}saveOriginalOpts(opts);if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($slides);}if($cont.css("position")=="static"){$cont.css("position","relative");}if(opts.width){$cont.width(opts.width);}if(opts.height&&opts.height!="auto"){$cont.height(opts.height);}if(opts.startingSlide){opts.startingSlide=parseInt(opts.startingSlide);}else{if(opts.backwards){opts.startingSlide=els.length-1;}}if(opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++){opts.randomMap.push(i);}opts.randomMap.sort(function(a,b){return Math.random()-0.5;});opts.randomIndex=1;opts.startingSlide=opts.randomMap[1];}else{if(opts.startingSlide>=els.length){opts.startingSlide=0;}}opts.currSlide=opts.startingSlide||0;var first=opts.startingSlide;$slides.css({position:"absolute",top:0,left:0}).hide().each(function(i){var z;if(opts.backwards){z=first?i<=first?els.length+(i-first):first-i:els.length-i;}else{z=first?i>=first?els.length-(i-first):first-i:els.length-i;}$(this).css("z-index",z);});$(els[first]).css("opacity",1).show();removeFilter(els[first],opts);if(opts.fit&&opts.width){$slides.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$slides.height(opts.height);}var reshape=opts.containerResize&&!$cont.innerHeight();if(reshape){var maxw=0,maxh=0;for(var j=0;j<els.length;j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();if(!w){w=e.offsetWidth||e.width||$e.attr("width");}if(!h){h=e.offsetHeight||e.height||$e.attr("height");}maxw=w>maxw?w:maxw;maxh=h>maxh?h:maxh;}if(maxw>0&&maxh>0){$cont.css({width:maxw+"px",height:maxh+"px"});}}if(opts.pause){$cont.hover(function(){this.cyclePause++;},function(){this.cyclePause--;});}if(supportMultiTransitions(opts)===false){return false;}var requeue=false;options.requeueAttempts=options.requeueAttempts||0;$slides.each(function(){var $el=$(this);this.cycleH=(opts.fit&&opts.height)?opts.height:($el.height()||this.offsetHeight||this.height||$el.attr("height")||0);this.cycleW=(opts.fit&&opts.width)?opts.width:($el.width()||this.offsetWidth||this.width||$el.attr("width")||0);if($el.is("img")){var loadingIE=($.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);var loadingFF=($.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);var loadingOp=($.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);var loadingOther=(this.cycleH==0&&this.cycleW==0&&!this.complete);if(loadingIE||loadingFF||loadingOp||loadingOther){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100){log(options.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){$(o.s,o.c).cycle(options);},opts.requeueTimeout);requeue=true;return false;}else{log("could not determine size of image: "+this.src,this.cycleW,this.cycleH);}}}return true;});if(requeue){return false;}opts.cssBefore=opts.cssBefore||{};opts.cssAfter=opts.cssAfter||{};opts.cssFirst=opts.cssFirst||{};opts.animIn=opts.animIn||{};opts.animOut=opts.animOut||{};$slides.not(":eq("+first+")").css(opts.cssBefore);$($slides[first]).css(opts.cssFirst);if(opts.timeout){opts.timeout=parseInt(opts.timeout);if(opts.speed.constructor==String){opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed);}if(!opts.sync){opts.speed=opts.speed/2;}var buffer=opts.fx=="none"?0:opts.fx=="shuffle"?500:250;while((opts.timeout-opts.speed)<buffer){opts.timeout+=opts.speed;}}if(opts.easing){opts.easeIn=opts.easeOut=opts.easing;}if(!opts.speedIn){opts.speedIn=opts.speed;}if(!opts.speedOut){opts.speedOut=opts.speed;}opts.slideCount=els.length;opts.currSlide=opts.lastSlide=first;if(opts.random){if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.backwards){opts.nextSlide=opts.startingSlide==0?(els.length-1):opts.startingSlide-1;}else{opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1;}}if(!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init)){init($cont,$slides,opts);}else{if(opts.fx!="custom"&&!opts.multiFx){log("unknown transition: "+opts.fx,"; slideshow terminating");return false;}}}var e0=$slides[first];if(opts.before.length){opts.before[0].apply(e0,[e0,e0,opts,true]);}if(opts.after.length){opts.after[0].apply(e0,[e0,e0,opts,true]);}if(opts.next){$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});}if(opts.prev){$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});}if(opts.pager||opts.pagerAnchorBuilder){buildPager(els,opts);}exposeAddSlide(opts,els);return opts;}function saveOriginalOpts(opts){opts.original={before:[],after:[]};opts.original.cssBefore=$.extend({},opts.cssBefore);opts.original.cssAfter=$.extend({},opts.cssAfter);opts.original.animIn=$.extend({},opts.animIn);opts.original.animOut=$.extend({},opts.animOut);$.each(opts.before,function(){opts.original.before.push(this);});$.each(opts.after,function(){opts.original.after.push(this);});}function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;if(opts.fx.indexOf(",")>0){opts.multiFx=true;opts.fxs=opts.fx.replace(/\s*/g,"").split(",");for(i=0;i<opts.fxs.length;i++){var fx=opts.fxs[i];tx=txs[fx];if(!tx||!txs.hasOwnProperty(fx)||!$.isFunction(tx)){log("discarding unknown transition: ",fx);opts.fxs.splice(i,1);i--;}}if(!opts.fxs.length){log("No valid transitions named; slideshow terminating.");return false;}}else{if(opts.fx=="all"){opts.multiFx=true;opts.fxs=[];for(p in txs){tx=txs[p];if(txs.hasOwnProperty(p)&&$.isFunction(tx)){opts.fxs.push(p);}}}}if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(Math.random()*20)+30;for(i=0;i<r1;i++){var r2=Math.floor(Math.random()*opts.fxs.length);opts.fxs.push(opts.fxs.splice(r2,1)[0]);}debug("randomized fx sequence: ",opts.fxs);}return true;}function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];if(!opts.autostopCount){opts.countdown++;}els[prepend?"unshift":"push"](s);if(opts.els){opts.els[prepend?"unshift":"push"](s);}opts.slideCount=els.length;$s.css("position","absolute");$s[prepend?"prependTo":"appendTo"](opts.$cont);if(prepend){opts.currSlide++;opts.nextSlide++;}if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($s);}if(opts.fit&&opts.width){$s.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$s.height(opts.height);}s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();$s.css(opts.cssBefore);if(opts.pager||opts.pagerAnchorBuilder){$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts);}if($.isFunction(opts.onAddSlide)){opts.onAddSlide($s);}else{$s.hide();}};}$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx;opts.before=[];opts.after=[];opts.cssBefore=$.extend({},opts.original.cssBefore);opts.cssAfter=$.extend({},opts.original.cssAfter);opts.animIn=$.extend({},opts.original.animIn);opts.animOut=$.extend({},opts.original.animOut);opts.fxFn=null;$.each(opts.original.before,function(){opts.before.push(this);});$.each(opts.original.after,function(){opts.after.push(this);});var init=$.fn.cycle.transitions[fx];if($.isFunction(init)){init(opts.$cont,$(opts.elements),opts);}};function go(els,opts,manual,fwd){if(manual&&opts.busy&&opts.manualTrump){debug("manualTrump in go(), stopping active transition");$(els).stop(true,true);opts.busy=0;}if(opts.busy){debug("transition active, ignoring new tx request");return;}var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];if(p.cycleStop!=opts.stopCount||p.cycleTimeout===0&&!manual){return;}if(!manual&&!p.cyclePause&&!opts.bounce&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end){opts.end(opts);}return;}var changed=false;if((manual||!p.cyclePause)&&(opts.nextSlide!=opts.currSlide)){changed=true;var fx=opts.fx;curr.cycleH=curr.cycleH||$(curr).height();curr.cycleW=curr.cycleW||$(curr).width();next.cycleH=next.cycleH||$(next).height();next.cycleW=next.cycleW||$(next).width();if(opts.multiFx){if(opts.lastFx==undefined||++opts.lastFx>=opts.fxs.length){opts.lastFx=0;}fx=opts.fxs[opts.lastFx];opts.currFx=fx;}if(opts.oneTimeFx){fx=opts.oneTimeFx;opts.oneTimeFx=null;}$.fn.cycle.resetState(opts,fx);if(opts.before.length){$.each(opts.before,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});}var after=function(){opts.busy=0;$.each(opts.after,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});};debug("tx firing("+fx+"); currSlide: "+opts.currSlide+"; nextSlide: "+opts.nextSlide);opts.busy=1;if(opts.fxFn){opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{if($.isFunction($.fn.cycle[opts.fx])){$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}}}if(changed||opts.nextSlide==opts.currSlide){opts.lastSlide=opts.currSlide;if(opts.random){opts.currSlide=opts.nextSlide;if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];if(opts.nextSlide==opts.currSlide){opts.nextSlide=(opts.currSlide==opts.slideCount-1)?0:opts.currSlide+1;}}else{if(opts.backwards){var roll=(opts.nextSlide-1)<0;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=1;opts.currSlide=0;}else{opts.nextSlide=roll?(els.length-1):opts.nextSlide-1;opts.currSlide=roll?0:opts.nextSlide+1;}}else{var roll=(opts.nextSlide+1)==els.length;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=els.length-2;opts.currSlide=els.length-1;}else{opts.nextSlide=roll?0:opts.nextSlide+1;opts.currSlide=roll?els.length-1:opts.nextSlide-1;}}}}if(changed&&opts.pager){opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass);}var ms=0;if(opts.timeout&&!opts.continuous){ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd);}else{if(opts.continuous&&p.cyclePause){ms=10;}}if(ms>0){p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.backwards);},ms);}}$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);});};function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);while(opts.fx!="none"&&(t-opts.speed)<250){t+=opts.speed;}debug("calculated timeout: "+t+"; speed: "+opts.speed);if(t!==false){return t;}}return opts.timeout;}$.fn.cycle.next=function(opts){advance(opts,1);};$.fn.cycle.prev=function(opts){advance(opts,0);};function advance(opts,moveForward){var val=moveForward?1:-1;var els=opts.elements;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}if(opts.random&&val<0){opts.randomIndex--;if(--opts.randomIndex==-2){opts.randomIndex=els.length-2;}else{if(opts.randomIndex==-1){opts.randomIndex=els.length-1;}}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.random){opts.nextSlide=opts.randomMap[opts.randomIndex];}else{opts.nextSlide=opts.currSlide+val;if(opts.nextSlide<0){if(opts.nowrap){return false;}opts.nextSlide=els.length-1;}else{if(opts.nextSlide>=els.length){if(opts.nowrap){return false;}opts.nextSlide=0;}}}}var cb=opts.onPrevNextEvent||opts.prevNextClick;if($.isFunction(cb)){cb(val>0,opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,moveForward);return false;}function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);});opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass);}$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;if($.isFunction(opts.pagerAnchorBuilder)){a=opts.pagerAnchorBuilder(i,el);debug("pagerAnchorBuilder("+i+", el) returned: "+a);}else{a='<a href="#">'+(i+1)+"</a>";}if(!a){return;}var $a=$(a);if($a.parents("body").length===0){var arr=[];if($p.length>1){$p.each(function(){var $clone=$a.clone(true);$(this).append($clone);arr.push($clone[0]);});$a=$(arr);}else{$a.appendTo($p);}}opts.pagerAnchors=opts.pagerAnchors||[];opts.pagerAnchors.push($a);$a.bind(opts.pagerEvent,function(e){e.preventDefault();opts.nextSlide=i;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}var cb=opts.onPagerEvent||opts.pagerClick;if($.isFunction(cb)){cb(opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,opts.currSlide<i);});if(!/^click/.test(opts.pagerEvent)&&!opts.allowPagerClickBubble){$a.bind("click.cycle",function(){return false;});}if(opts.pauseOnPagerHover){$a.hover(function(){opts.$cont[0].cyclePause++;},function(){opts.$cont[0].cyclePause--;});}};$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;if(fwd){hops=c>l?c-l:opts.slideCount-l;}else{hops=c<l?l-c:l+opts.slideCount-c;}return hops;};function clearTypeFix($slides){debug("applying clearType background-color hack");function hex(s){s=parseInt(s).toString(16);return s.length<2?"0"+s:s;}function getBg(e){for(;e&&e.nodeName.toLowerCase()!="html";e=e.parentNode){var v=$.css(e,"background-color");if(v&&v.indexOf("rgb")>=0){var rgb=v.match(/\d+/g);return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}if(v&&v!="transparent"){return v;}}return"#ffffff";}$slides.each(function(){$(this).css("background-color",getBg(this));});}$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide();if(typeof opts.cssBefore.opacity=="undefined"){opts.cssBefore.opacity=1;}opts.cssBefore.display="block";if(opts.slideResize&&w!==false&&next.cycleW>0){opts.cssBefore.width=next.cycleW;}if(opts.slideResize&&h!==false&&next.cycleH>0){opts.cssBefore.height=next.cycleH;}opts.cssAfter=opts.cssAfter||{};opts.cssAfter.display="none";$(curr).css("zIndex",opts.slideCount+(rev===true?1:0));$(next).css("zIndex",opts.slideCount+(rev===true?0:1));};$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next);var speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut;$n.css(opts.cssBefore);if(speedOverride){if(typeof speedOverride=="number"){speedIn=speedOut=speedOverride;}else{speedIn=speedOut=1;}easeIn=easeOut=null;}var fn=function(){$n.animate(opts.animIn,speedIn,easeIn,function(){cb();});};$l.animate(opts.animOut,speedOut,easeOut,function(){$l.css(opts.cssAfter);if(!opts.sync){fn();}});if(opts.sync){fn();}};$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css("opacity",0);opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.opacity=0;});opts.animIn={opacity:1};opts.animOut={opacity:0};opts.cssBefore={top:0,left:0};}};$.fn.cycle.ver=function(){return ver;};$.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:false,animIn:null,animOut:null,autostop:0,autostopCount:0,backwards:false,before:null,cleartype:!$.support.opacity,cleartypeNoBg:false,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:true,next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,slideExpr:null,slideResize:1,speed:1000,speedIn:null,speedOut:null,startingSlide:0,sync:1,timeout:4000,timeoutFn:null,updateActivePagerLink:null};})(jQuery);
/*
* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
*
* Uses the built in easing capabilities added In jQuery 1.1
* to offer multiple easing options
*
* TERMS OF USE - jQuery Easing
* 
* Open source under the BSD License. 
* 
* Copyright © 2008 George McGinley Smith
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, 
* are permitted provided that the following conditions are met:
* 
* Redistributions of source code must retain the above copyright notice, this list of 
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list 
* of conditions and the following disclaimer in the documentation and/or other materials 
* provided with the distribution.
* 
* Neither the name of the author nor the names of contributors may be used to endorse 
* or promote products derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
* OF THE POSSIBILITY OF SUCH DAMAGE. 
*
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
*
* TERMS OF USE - EASING EQUATIONS
* 
* Open source under the BSD License. 
* 
* Copyright © 2001 Robert Penner
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, 
* are permitted provided that the following conditions are met:
* 
* Redistributions of source code must retain the above copyright notice, this list of 
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list 
* of conditions and the following disclaimer in the documentation and/or other materials 
* provided with the distribution.
* 
* Neither the name of the author nor the names of contributors may be used to endorse 
* or promote products derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
* OF THE POSSIBILITY OF SUCH DAMAGE. 
*
*/
$(function() {
	to_radians = function(degrees) {
		return (Math.PI / 180) * degrees;
	}

	rnd = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	start_liquid_animation = function() {
		var liquid_canvas = $("canvas#liquid")[0];
		if(liquid_canvas && liquid_canvas.getContext) {
			var ctx = liquid_canvas.getContext("2d");	

			ctx.fillStyle = "#21A7A6";
			ctx.strokeStyle = "#9FD9D9";
			ctx.lineWidth = 4;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";

			var width = liquid_canvas.width;
			var height = 55;						//Height of the waves
			var top_offset = 543;					//Distance from the top of the canvas to the top of the waves
			var framerate = 30; 					//Framerate in ms (1000/30 = 33.33 fps)
			var wave_speed = 1;						//Number of pixels to change the wave height per frame (higher is faster but more jerky)
			var drop_initial_speed = 0.05;			//Number of pixels to move the drop initially, this is then used as the acceleration coefficient
			var waves = [];
			var drop = {
				img: new Image(),
				x: 387,
				y: 128,
				start: 128,
				speed: drop_initial_speed,
				width: 18,
				height: 29,
				step: 0
			};
			var funnel = {
				img: new Image(),
				x: 292, 
				y: -22
			};

			generate_wave = function() {
				//Create a new wave with random width, min/max/starting height, also alternate the vector (speed and direction of travel) of initial wave state
				var wave = {};
				wave.width = rnd(55, 75);
				wave.min = rnd(7, 13);
				wave.max = rnd(25, 30);
				wave.current_height = rnd(wave.min, wave.max);
				wave.vector = (waves.length % 2 == 0) ? -wave_speed : wave_speed;	
				return wave;
			};

			render = function() {
				//Clear the canvas ready for the next frame
				ctx.clearRect(0, 0, liquid_canvas.width, liquid_canvas.height);

				//Render the drop behind the waves
		   		ctx.drawImage(drop.img, drop.x - drop.width / 2, drop.y, drop.width, drop.height);

				//Render the waves at their current heights
				ctx.beginPath();
				var x = 0;
				var first = true;
				$.each(waves, function() {
					var wave = this;
					var y = wave.current_height;

					if(first) {
						ctx.moveTo(x, y + top_offset);
						first = false;
					} else {
						var c1 = {
							x: x - wave.width + 5,
							y: height - 10
						};
						var c2 = {
							x: x - 5,
							y: height - 10
						};

						ctx.bezierCurveTo(c1.x, c1.y + top_offset, c2.x, c2.y + top_offset, x, y + top_offset);
					}

					x += wave.width;
				});

				//Complete the wave path, fill and outline		
				ctx.lineTo(x, height + top_offset);
				ctx.lineTo(0, height + top_offset);
				ctx.closePath();
		   		ctx.fill();
		   		ctx.stroke();

		   		//Draw the funnel on top of everything else
				ctx.drawImage(funnel.img, funnel.x, funnel.y);
	   		};

	   		update = function() {
	   			//Update the current height of each wave and the direction of travel if the limits are reached
	   			$.each(waves, function() {
	   				var wave = this;
	   				wave.current_height += wave.vector;

	   				if(wave.current_height > wave.max || wave.current_height < wave.min) {
	   					wave.vector *= -wave_speed;
	   				}
	   			});
	   			
	   			//Update the position of the drop
	   			drop.y += drop.speed;
	   			if(drop.y > liquid_canvas.height) {
	   				drop.y = drop.start;
	   				drop.speed = drop_initial_speed;
	   				drop.width = 18;
	   				drop.height = 29;
	   			}

				//Accelerate and enlarge the drop. Only increase the speed at set intervals to simulate gravity 
				var current_step = Math.floor(drop.y / 10);
				if(drop.step != current_step) {
					drop.step = current_step;
					drop.speed += current_step * drop_initial_speed;
					drop.width += 2;
					drop.height += 3;
				}
	   			
	   			//Draw this frame from the current state
	   			render();
	   		};

			//Generate inital waves with random height
			var waves_width = 0;
			while(waves_width < width + 100) {	//Add a bit to the width as the first wave is only at x = 0 so we need an extra wave
				var wave = generate_wave()
				waves_width += wave.width;
				waves.push(wave);
			}

			//Start the animation once the funnel image has been loaded (should really check of all images but the drop will probably be loaded by the time it is visible)
			funnel.img.onload = function(){
				setInterval(update, framerate);
			}
			drop.img.src = 'userstorage/images/drop.png';
			funnel.img.src = 'userstorage/images/funnel.png';

		} 
	}
	
	start_liquid_animation();
});
// Convert numbers to words
// copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code (including this copyright notice) is
// used exactly as shown (you can change the numbering system if you wish)

// American Numbering System
var th = ['', 'thousand', 'million', 'billion', 'trillion'];
// uncomment this line for English Number System
// var th = ['','thousand','million', 'milliard','billion'];

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']; 

function toWords(s) { s = s.toString(); s = s.replace(/[\, ]/g, ''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += tn[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += tw[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += dg[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += th[(x - i - 1) / 3] + ' '; sk = 0; } } if (x != s.length) { var y = s.length; str += 'point '; for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' '; } return str.replace(/\s+/g, ' '); }
$(function () {
    var day = new Date().getDay();
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    var total_minutes = (hour * 60) + minutes;
    var starting_time = 510;    //Minutes since midnight
    var finish_time = 1080;     //Minutes since midnight
    var total_tea = 35;
    var total_coffee = 25;
    var total_drinks = total_tea + total_coffee;
    var total_biscuits = 20;

    if (total_minutes >= starting_time && total_minutes <= finish_time) {
        //inside working hours
        var length_of_day = finish_time - starting_time;
        var minutes_through_day = total_minutes - starting_time;
        var percent_through_day = (minutes_through_day / length_of_day) * 100;
        var current_tea = Math.round((total_tea / 100) * percent_through_day);
        var current_coffee = Math.round((total_coffee / 100) * percent_through_day);
        var currently_drunk = current_tea + current_coffee;
        var current_biscuits = Math.round((total_biscuits / 100) * percent_through_day);
        var multiple_of_percent_through_day = percent_through_day % 20;

        $("#biscuit-number").text(toWords(current_biscuits));
        $("#tea").text(current_tea);
        $("#coffee").text(current_coffee);

        for (var x = 1; x <= total_drinks; x++) {
            var cup_image = "404.html";
            if (x <= currently_drunk) {
                cup_image = "404.html";
            }

            $("#cups").append('<img src="/userstorage/images/' + cup_image + '" />')
        }
        $("#number-of-biscuits").css({ 'background-image': 'url(/userstorage/images/biscuit/stage-' + Math.floor(percent_through_day / 20) + '.jpg)' });
    } else {
        //outside working hours
        $("#drinks").replaceWith('<div id="drinks"><img src="/UserStorage/images/tea_coffee/check-list.jpg" alt="tea" /></div>');
        $("#biscuits-eaten").replaceWith('<div id="biscuits-eaten"><img src="/UserStorage/images/biscuit/over-night.jpg" alt="tea" /></div>');
    }

    var images = ["sunday.jpg", "404.html", "404.html", "404.html", "404.html", "404.html", "saturday.jpg"];

    var url = "/userstorage/images/" + images[day];

    $("#music").attr("src", url);

});
$(function () {
    $(".content-anchor").click(function () {
        var scroll_to = $($(this).attr("href"));
        $.scrollTo(scroll_to, 1000);

        return false;
    });
});
$(function () {
    $("#bee-skills-wrapper #toggle-bee-link a").click(function () {
        if ($("#what-we-do").is(":visible")) {
            $("#bee-skills-wrapper #toggle-bee-link a").text("Show What We Build");
            $("#what-we-do").hide();
            $("#skills-list").show();
            if ($.browser.msie) {
            } else {
                reset_bubbles($("#skills-list .bee-text img"));
            }
        } else {
            $("#bee-skills-wrapper #toggle-bee-link a").text("Show Technical Skills");
            $("#what-we-do").show();
            $("#skills-list").hide();
            if ($.browser.msie) {
            } else {
                reset_bubbles($("#what-we-do .bee-text img"));
            }
        }
        return false;
    });

    $("#develop-process-list ul li").click(function () {
        var current_list_item = $(this).data("process");
        var current_image = current_list_item + "-image";
        var current_explanation = current_list_item + "-explanation";
        var current_benifits = current_list_item + "-benefits";

        if ($(this).hasClass('active')) {
            return false;
        } else {
            $(".process").hide();

            $("#" + current_image).fadeIn(1000);
            $("#" + current_explanation).show();
            $("#" + current_benifits).show();

            $("#develop-process-list ul li").removeClass("active");
            $(this).addClass("active");
        }

        return false;
    });
    if ($.browser.msie) {
        $("#bee-skills-wrapper #toggle-bee-link a").show();
    } else {
        var bubbles = $("#what-we-do .bee-text img");
        var i = 0;

        setTimeout(function () {
            reset_bubbles(bubbles);
        }, 1000);

        function reset_bubbles(items) {
            $(items).css({ opacity: 0 });

            i = 0;
            $.each(items, function () {
                var starting_height = $(this).data("bubble_starting_height");
                $(this).siblings('.bubble-content').hide();
                $("#bee-skills-wrapper .bumble-bees").hide();
                $("#bee-skills-wrapper .bee-lines").hide();
                $("#bee-skills-wrapper #toggle-bee-link a").hide();
                if (starting_height) {
                    $(this).css({
                        width: starting_height, height: starting_height
                    });
                }
                fadeIn_bubbles($(this), i++, items.length == i);
            });
        }

        function fadeIn_bubbles(item, i, showBeeLink) {
            setTimeout(function () {
                var height = item.prop("height");
                item.data("bubble_starting_height", height);

                item.animate(
                    { width: height + 32 + "px", height: height + 32 + "px", opacity: 1 },
                    {
                        duration: 2000,
                        easing: 'easeOutCirc',
                        complete: function () {
                            $(this).siblings('.bubble-content').fadeIn(2000);
                            if (showBeeLink) {
                                $("#bee-skills-wrapper #toggle-bee-link a").fadeIn(function () {
                                    $("#bee-skills-wrapper .bumble-bees").fadeIn('slow');
                                    $("#bee-skills-wrapper .bee-lines").fadeIn('slow');
                                });
                            }

                        }
                    });
            }, 150 * i);
        }

    }

    $("#productivity-screenshots").click(function () {
        $.fancybox([
            '/UserStorage/images/services/screenshots/p4u-1.jpg',
            'UserStorage/images/services/screenshots/p4u-2.jpg',
            'UserStorage/images/services/screenshots/p4u-3.jpg',
            'UserStorage/images/services/screenshots/p4u-4.jpg',
            'UserStorage/images/services/screenshots/p4u-5.jpg',
            'UserStorage/images/services/screenshots/p4u-6.jpg',
            'UserStorage/images/services/screenshots/p4u-7.jpg'
        ], {
            'type': 'image',  //required
            'padding': 0 // optional
        });
        return false;
    });

});
$(function () {
    var partners_wrapper_children = $("#partners-wrapper").children();
    $("#partners-wrapper a").click(function () {
        var scroll_to = $($(this).attr("href"));
        $.scrollTo(scroll_to, 1000, { easing: 'easeOutExpo' });
        $.fx.off;
        //$("#partners-wrapper").hide();

    });

    $(".arrows").click(function () {
        var scroll_to = $($(this).attr("href"));
        $.scrollTo(scroll_to, 1000);

        return false;
    });
	
	
	
	
	

    $("#portfolio-lightbox-1").click(function () {
        $.fancybox([
            '/UserStorage/images/beaulieu/beaulieu-1.jpg',
            'UserStorage/images/beaulieu/beaulieu-2.jpg',
            'UserStorage/images/beaulieu/beaulieu-3.jpg',
            'UserStorage/images/beaulieu/beaulieu-4.jpg',
            'UserStorage/images/beaulieu/beaulieu-5.jpg'
        ], {
            'type': 'image',  //required
            'padding': 0 // optional
        });
        return false;
    });
	
	
	
	$("#portfolio-lightbox-2").click(function () {
        $.fancybox([
            '/UserStorage/images/1-portfolio-images/nojunk-1.jpg',
            'UserStorage/images/1-portfolio-images/nojunk-2.jpg',
            'UserStorage/images/1-portfolio-images/nojunk-3.jpg',
            'UserStorage/images/1-portfolio-images/nojunk-4.jpg',
            'UserStorage/images/1-portfolio-images/nojunk-5.jpg'
        ], {
            'type': 'image',  //required
            'padding': 0 // optional
        });
        return false;
    });
	
	
	$("#portfolio-lightbox-3").click(function () {
        $.fancybox([
            '/UserStorage/images/1-portfolio-images/lsa-1.jpg',
            'UserStorage/images/1-portfolio-images/lsa-2.jpg',
            'UserStorage/images/1-portfolio-images/lsa-3.jpg',
            'UserStorage/images/1-portfolio-images/lsa-4.jpg',
			'UserStorage/images/1-portfolio-images/lsa-5.jpg',
            'UserStorage/images/1-portfolio-images/lsa-6.jpg'
        ], {
            'type': 'image',  //required
            'padding': 0 // optional
        });
        return false;
    });
	
	
	
	$("#portfolio-lightbox-6").click(function () {
        $.fancybox([
            '/UserStorage/images/1-portfolio-images/steljes-1.jpg',
            'UserStorage/images/1-portfolio-images/steljes-2.jpg',
            'UserStorage/images/1-portfolio-images/steljes-3.jpg',
            'UserStorage/images/1-portfolio-images/steljes-4.jpg'
        ], {
            'type': 'image',  //required
            'padding': 0 // optional
        });
        return false;
    });
	
	
	
	
	
	
	
	
});
/*
 * Date prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds dayNames, abbrDayNames, monthNames and abbrMonthNames static properties and isLeapYear,
 * isWeekend, isWeekDay, getDaysInMonth, getDayName, getMonthName, getDayOfYear, getWeekOfYear,
 * setDayOfYear, addYears, addMonths, addDays, addHours, addMinutes, addSeconds methods
 *
 * Copyright (c) 2006 J�rn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 *
 * Additional methods and properties added by Kelvin Luck: firstDayOfWeek, dateFormat, zeroTime, asString, fromString -
 * I've added my name to these methods so you know who to blame if they are broken!
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * An Array of day names starting with Sunday.
 * 
 * @example dayNames[0]
 * @result 'Sunday'
 *
 * @name dayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * An Array of abbreviated day names starting with Sun.
 * 
 * @example abbrDayNames[0]
 * @result 'Sun'
 *
 * @name abbrDayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * An Array of month names starting with Janurary.
 * 
 * @example monthNames[0]
 * @result 'January'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * An Array of abbreviated month names starting with Jan.
 * 
 * @example abbrMonthNames[0]
 * @result 'Jan'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The first day of the week for this locale.
 *
 * @name firstDayOfWeek
 * @type Number
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.firstDayOfWeek = 1;

/**
 * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.format = 'dd/mm/yyyy';
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

/**
 * The first two numbers in the century to be used when decoding a two digit year. Since a two digit year is ambiguous (and date.setYear
 * only works with numbers < 99 and so doesn't allow you to set years after 2000) we need to use this to disambiguate the two digit year codes.
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.fullYearStart = '20';

(function() {

	/**
	 * Adds a given method under the given name 
	 * to the Date prototype if it doesn't
	 * currently exist.
	 *
	 * @private
	 */
	function add(name, method) {
		if( !Date.prototype[name] ) {
			Date.prototype[name] = method;
		}
	};
	
	/**
	 * Checks if the year is a leap year.
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isLeapYear();
	 * @result true
	 *
	 * @name isLeapYear
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isLeapYear", function() {
		var y = this.getFullYear();
		return (y%4==0 && y%100!=0) || y%400==0;
	});
	
	/**
	 * Checks if the day is a weekend day (Sat or Sun).
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekend();
	 * @result false
	 *
	 * @name isWeekend
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekend", function() {
		return this.getDay()==0 || this.getDay()==6;
	});
	
	/**
	 * Check if the day is a day of the week (Mon-Fri)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekDay();
	 * @result false
	 * 
	 * @name isWeekDay
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekDay", function() {
		return !this.isWeekend();
	});
	
	/**
	 * Gets the number of days in the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDaysInMonth();
	 * @result 31
	 * 
	 * @name getDaysInMonth
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDaysInMonth", function() {
		return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
	});
	
	/**
	 * Gets the name of the day.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName();
	 * @result 'Saturday'
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName(true);
	 * @result 'Sat'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getDayName", function(abbreviated) {
		return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
	});

	/**
	 * Gets the name of the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName();
	 * @result 'Janurary'
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName(true);
	 * @result 'Jan'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getMonthName", function(abbreviated) {
		return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
	});

	/**
	 * Get the number of the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayOfYear();
	 * @result 11
	 * 
	 * @name getDayOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDayOfYear", function() {
		var tmpdtm = new Date("1/1/" + this.getFullYear());
		return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
	});
	
	/**
	 * Get the number of the week of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getWeekOfYear();
	 * @result 2
	 * 
	 * @name getWeekOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getWeekOfYear", function() {
		return Math.ceil(this.getDayOfYear() / 7);
	});

	/**
	 * Set the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.setDayOfYear(1);
	 * dtm.toString();
	 * @result 'Tue Jan 01 2008 00:00:00'
	 * 
	 * @name setDayOfYear
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("setDayOfYear", function(day) {
		this.setMonth(0);
		this.setDate(day);
		return this;
	});
	
	/**
	 * Add a number of years to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addYears(1);
	 * dtm.toString();
	 * @result 'Mon Jan 12 2009 00:00:00'
	 * 
	 * @name addYears
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addYears", function(num) {
		this.setFullYear(this.getFullYear() + num);
		return this;
	});
	
	/**
	 * Add a number of months to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMonths(1);
	 * dtm.toString();
	 * @result 'Tue Feb 12 2008 00:00:00'
	 * 
	 * @name addMonths
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMonths", function(num) {
		var tmpdtm = this.getDate();
		
		this.setMonth(this.getMonth() + num);
		
		if (tmpdtm > this.getDate())
			this.addDays(-this.getDate());
		
		return this;
	});
	
	/**
	 * Add a number of days to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addDays(1);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addDays
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addDays", function(num) {
		//this.setDate(this.getDate() + num);
		this.setTime(this.getTime() + (num*86400000) );
		return this;
	});
	
	/**
	 * Add a number of hours to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addHours(24);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addHours
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addHours", function(num) {
		this.setHours(this.getHours() + num);
		return this;
	});

	/**
	 * Add a number of minutes to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMinutes(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 01:00:00'
	 * 
	 * @name addMinutes
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMinutes", function(num) {
		this.setMinutes(this.getMinutes() + num);
		return this;
	});
	
	/**
	 * Add a number of seconds to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addSeconds(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name addSeconds
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addSeconds", function(num) {
		this.setSeconds(this.getSeconds() + num);
		return this;
	});
	
	/**
	 * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
	 * 
	 * @example var dtm = new Date();
	 * dtm.zeroTime();
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name zeroTime
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("zeroTime", function() {
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	});
	
	/**
	 * Returns a string representation of the date object according to Date.format.
	 * (Date.toString may be used in other places so I purposefully didn't overwrite it)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.asString();
	 * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name asString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("asString", function(format) {
		var r = format || Date.format;
		return r
			.split('yyyy').join(this.getFullYear())
			.split('yy').join((this.getFullYear() + '').substring(2))
			.split('mmmm').join(this.getMonthName(false))
			.split('mmm').join(this.getMonthName(true))
			.split('mm').join(_zeroPad(this.getMonth()+1))
			.split('dd').join(_zeroPad(this.getDate()))
			.split('hh').join(_zeroPad(this.getHours()))
			.split('min').join(_zeroPad(this.getMinutes()))
			.split('ss').join(_zeroPad(this.getSeconds()));
	});
	
	/**
	 * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
	 * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
	 *
	 * @example var dtm = Date.fromString("12/01/2008");
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name fromString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	Date.fromString = function(s, format)
	{
		var f = format || Date.format;
		var d = new Date('01/01/1977');
		
		var mLength = 0;

		var iM = f.indexOf('mmmm');
		if (iM > -1) {
			for (var i=0; i<Date.monthNames.length; i++) {
				var mStr = s.substr(iM, Date.monthNames[i].length);
				if (Date.monthNames[i] == mStr) {
					mLength = Date.monthNames[i].length - 4;
					break;
				}
			}
			d.setMonth(i);
		} else {
			iM = f.indexOf('mmm');
			if (iM > -1) {
				var mStr = s.substr(iM, 3);
				for (var i=0; i<Date.abbrMonthNames.length; i++) {
					if (Date.abbrMonthNames[i] == mStr) break;
				}
				d.setMonth(i);
			} else {
				d.setMonth(Number(s.substr(f.indexOf('mm'), 2)) - 1);
			}
		}
		
		var iY = f.indexOf('yyyy');

		if (iY > -1) {
			if (iM < iY)
			{
				iY += mLength;
			}
			d.setFullYear(Number(s.substr(iY, 4)));
		} else {
			if (iM < iY)
			{
				iY += mLength;
			}
			// TODO - this doesn't work very well - are there any rules for what is meant by a two digit year?
			d.setFullYear(Number(Date.fullYearStart + s.substr(f.indexOf('yy'), 2)));
		}
		var iD = f.indexOf('dd');
		if (iM < iD)
		{
			iD += mLength;
		}
		d.setDate(Number(s.substr(iD, 2)));
		if (isNaN(d.getTime())) {
			return false;
		}
		return d;
	};
	
	// utility method
	var _zeroPad = function(num) {
		var s = '0'+num;
		return s.substring(s.length-2)
		//return ('0'+num).substring(-2); // doesn't work on IE :(
	};
	
})();
function update_clock() {
    var start_date = new Date(2004, 3, 1, 0, 0, 0, 0);
    var today = new Date();
    var current_year = today.getFullYear();
    var year = current_year - start_date.getFullYear();
    var start_month = start_date.getMonth();
    var different_ticks = today.getTime() - start_date.getTime();
    var difference = new Date(different_ticks);

    display_time("year", year);
    display_time("month", difference.getMonth() + 1);
    display_time("day", difference.getDate());
    display_time("hour", today.getHours());
    display_time("minute", today.getMinutes());

    setTimeout(update_clock, 500)

}

function display_time(name, value) {
    $("#" + name).text(value);
    $("#" + name + "-text").attr(pluralize(name, value));
}

function pluralize(name, number) {
    var pluralizer = "";
    var zero = "";
    if (number != 1) {
        pluralizer = "s";
    }
    if (number < 10) {
        zero = "0";
    }

    var time_image = '<img src="../Userstorage/images/culture/clock/' + name + pluralizer + '.gif">';

    $("#" + name).prepend(zero);
    if ($("#" + name + "-text").html() != time_image) {
        $("#" + name + "-text").html(time_image);
        
    }
    return name;

    
}

$(function () {
    update_clock();
});

function fadeIn(item, i) {
    setTimeout(function () {

        item.fadeIn('slow');
    }, 100 * i);
}

$(function () {
    setTimeout(function () {
        var triangle = $(".grid-item");
        var i = 0;
        $.each(triangle, function () {
            fadeIn($(this), i++);
        }); 
    }, 1500);

    $(".grid-image a").click(function () {
        return false;
    })

    jQuery('#testimonial-content').cycle({
        fx: 'fade',
        speed: 'fast',
        timeout: 0,
        next: '#next2',
        prev: '#prev2'
    });

});
$(function () {
    $("#razorback-screenshots").click(function () {
        $.fancybox([
            '/UserStorage/images/labs/screenshots/razorback-1.jpg',
            'UserStorage/images/labs/screenshots/razorback-2.jpg',
            'UserStorage/images/labs/screenshots/razorback-3.jpg'
        ], {
            'type': 'image',  //required
            'padding': 0 // optional
        });
        return false;
    });	
	
});
$(function () {

    $("p img[title]").tooltip({
        effect: 'slide',
        position: "bottom left",
        relative: true,
        offset: [10, 437]
    }).dynamic({
        top: {
            direction: 'down',
            effect: 'slide'
        },
        right:
        {
            direction: 'left',
            effect: 'slide',
            offset: [0, 0]
        }
    });
});
