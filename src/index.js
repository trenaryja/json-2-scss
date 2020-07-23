import { isPrimitive, allPropertiesArePrimitive } from "./utils";

const json2ScssVariable = (json, name) => {
	if (isPrimitive(json)) {
		return `$${name}: ${json};\n\n`;
	} else {
		return `$${name}: ${JSON.stringify(json, null, "\t")
			.replace(/{/g, "(")
			.replace(/}/g, ")")
			.replace(/"/g, "")}\n\n`;
	}
};

const json2Scss = (json, name) => {
	let output = "";
	Object.keys(json).forEach((key) => {
		if (Array.isArray(json[key]) || typeof json[key] === "function") {
			console.warn(`Warning: Property ${key} can't be translated to scss`);
		} else if (allPropertiesArePrimitive(json[key]) || isPrimitive(json[key])) {
			output += json2ScssVariable(json[key], `${name ? name + "-" : ""}${key}`);
		} else {
			output += json2Scss(json[key], `${name ? name + "-" : ""}${key}`);
		}
	});
	return output;
};

export default json2Scss;
