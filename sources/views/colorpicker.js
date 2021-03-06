import {protoUI} from "../ui/core";

import datepicker from "./datepicker";


const api = {
	name:"colorpicker",
	$init:function(){
		this.$ready.push(this._init_popup);
	},
	defaults:{
		icon:true
	},
	_init_popup:function(){
		const obj = this._settings;
		if (obj.suggest)
			obj.popup = obj.suggest;
		else if (!obj.popup)
			obj.popup = obj.suggest = this.suggest_setter({
				type:"colorboard"
			});
		this._init_once = function(){};
	},
	getValue:function(){
		if (this._rendered_input && this._settings.editable)
			return this.getInputNode().value;
		else
			return this._settings.value;
	},
	$prepareValue:function(value){
		value = value ? value.toString(16) : "";
		if (value && value.charAt(0) != "#" && /^[0-9a-fA-F]+$/.test(value))
			value = "#" + value;
		return value;
	},
	_getColorNode: function(){
		return this.$view.getElementsByTagName("DIV")[this._settings.editable?1:2];
	},
	_get_visible_text:function(value){
		return value;
	},
	$compareValue:function(oldvalue, value){
		return oldvalue == value;
	},
	$setValue:function(value){
		this._getColorNode().style.backgroundColor = value;
		this._settings.text = value;

		var node = this.getInputNode();
		if(node.value == undefined)
			node.innerHTML = value;
		else
			node.value = value;
	},
	$renderIcon:function(){
		var config = this.config;
		return "<div class=\"webix_input_icon\" style=\"background-color:"+config.value+";\"> </div>";
	}
};

const view = protoUI(api, datepicker.view);
export default {api, view};